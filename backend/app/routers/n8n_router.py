import base64
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional, List
from app.services.ingestion import IngestionService
from app.services.auditor import AuditService
from app.services.synthesizer import SynthesizerService
from app.services.laya_engine import LayaEngineService
from app.models.schemas import ChatQuery

n8n_router = APIRouter()

class N8nWebhookPayload(BaseModel):
    sender_phone: Optional[str] = "+5493704000000"
    message_text: Optional[str] = None
    file_name: Optional[str] = None
    file_base64: Optional[str] = None

class N8nWebhookResponse(BaseModel):
    status: str
    reply_whatsapp_text: str
    archivos_citados: List[str]
    nivel_alerta: Optional[str] = "NORMAL"

@n8n_router.post("/n8n", response_model=N8nWebhookResponse)
async def handle_n8n_webhook(payload: N8nWebhookPayload):
    """
    Endpoint de Webhook modular para n8n / WhatsApp Business.
    Recibe mensajes de texto o archivos Base64 retransmitidos por n8n y genera la respuesta prescriptiva de Laya AI.
    """
    try:
        # Caso 1: Se recibió un archivo en Base64 desde n8n
        if payload.file_base64 and payload.file_name:
            file_bytes = base64.b64decode(payload.file_base64)
            asset = IngestionService.classify_and_ingest(payload.file_name, file_bytes)
            content_str = file_bytes.decode('utf-8', errors='ignore')
            diagnostic = AuditService.audit_asset(asset, content_str)
            synthesis = SynthesizerService.synthesize(asset, content_str)
            decisions = LayaEngineService.analyze_situation([synthesis])
            
            top_dec = decisions[0] if decisions else None
            reply_text = (
                f"🌸 *AMIGA - Alerta de Ingesta (n8n)*\n\n"
                f"Recibí tu archivo *{payload.file_name}*.\n"
                f"• Fuente: {asset.fuente_informacion}\n"
                f"• Tipo: {asset.tipo_economico}\n\n"
                f"*{top_dec.titulo if top_dec else 'Documento Procesado'}*\n"
                f"{top_dec.descripcion_panorama if top_dec else 'Sin inconsistencias'}\n\n"
                f"💡 *Recomendación:* {top_dec.recomendacion_practica if top_dec else 'Todo en regla.'}"
            )
            return N8nWebhookResponse(
                status="success",
                reply_whatsapp_text=reply_text,
                archivos_citados=top_dec.archivos_citados if top_dec else [payload.file_name],
                nivel_alerta=top_dec.nivel_alerta.value if top_dec else "NORMAL"
            )

        # Caso 2: Se recibió una consulta de texto por WhatsApp
        query_text = payload.message_text or "¿Qué mayorista me aumentó más esta semana?"
        chat_resp = LayaEngineService.answer_chat_query(ChatQuery(pregunta=query_text))
        
        reply_text = (
            f"💬 *Laya AI Copiloto (WhatsApp)*\n\n"
            f"{chat_resp.respuesta}\n\n"
            f"📄 *Fuentes Citas:* {', '.join(chat_resp.archivos_citados)}"
        )
        
        return N8nWebhookResponse(
            status="success",
            reply_whatsapp_text=reply_text,
            archivos_citados=chat_resp.archivos_citados,
            nivel_alerta=chat_resp.nivel_alerta_asociado.value if chat_resp.nivel_alerta_asociado else "NORMAL"
        )

    except Exception as e:
        return N8nWebhookResponse(
            status="error",
            reply_whatsapp_text=f"Error al procesar mensaje con Laya AI: {str(e)}",
            archivos_citados=[],
            nivel_alerta="ADVERTENCIA"
        )
