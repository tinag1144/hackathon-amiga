import os
import uuid
from datetime import datetime
from app.models.schemas import IngestedAsset, FormatoOrigen, FuenteInformacion, TipoInformacionEconomica

class IngestionService:
    """Fase 1: Recepción y Reconocimiento de Fuentes."""
    
    @staticmethod
    def classify_and_ingest(filename: str, content: bytes) -> IngestedAsset:
        ext = os.path.splitext(filename)[1].lower()
        content_str = content.decode('utf-8', errors='ignore')
        
        # Detección de Formato
        if ext in ['.csv', '.xlsx', '.xls']:
            formato = FormatoOrigen.PLANILLA
        elif ext == '.pdf':
            formato = FormatoOrigen.PDF
        elif ext in ['.txt', '.md']:
            if 'whatsapp' in filename.lower() or 'mensajes' in content_str.lower():
                formato = FormatoOrigen.MENSAJERIA
            else:
                formato = FormatoOrigen.TEXTO
        elif ext in ['.jpg', '.png', '.jpeg']:
            formato = FormatoOrigen.IMAGEN
        else:
            formato = FormatoOrigen.TEXTO

        # Detección de Fuente de Información
        fn_lower = filename.lower()
        if 'proveedor' in fn_lower or 'mayorista' in fn_lower or 'distribuidora' in fn_lower:
            fuente = FuenteInformacion.PROVEEDOR
        elif 'ventas' in fn_lower or 'cuaderno' in fn_lower or 'fiados' in fn_lower:
            fuente = FuenteInformacion.CLIENTE
        elif 'circular' in fn_lower or 'afip' in fn_lower or 'comercio' in fn_lower:
            fuente = FuenteInformacion.ORGANISMO_PUBLICO
        elif 'whatsapp' in fn_lower or 'remito' in fn_lower:
            fuente = FuenteInformacion.FUENTE_INFORMAL
        else:
            fuente = FuenteInformacion.NEGOCIO_PROPIO

        # Detección de Tipo de Información Económica
        if 'precio' in fn_lower or 'lista' in fn_lower:
            tipo_econ = TipoInformacionEconomica.PRECIO
        elif 'ventas' in fn_lower or 'fiado' in fn_lower:
            tipo_econ = TipoInformacionEconomica.VENTA
        elif 'remito' in fn_lower or 'compra' in fn_lower:
            tipo_econ = TipoInformacionEconomica.COMPRA
        elif 'afip' in fn_lower or 'norma' in fn_lower:
            tipo_econ = TipoInformacionEconomica.IMPUESTO
        else:
            tipo_econ = TipoInformacionEconomica.MARGEN

        preview = content_str[:250] if content_str else f"[Archivo binario {filename}]"

        return IngestedAsset(
            id=str(uuid.uuid4())[:8],
            filename=filename,
            formato_origen=formato,
            fuente_informacion=fuente,
            tipo_economico=tipo_econ,
            upload_timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            file_size_bytes=len(content),
            raw_preview=preview
        )
