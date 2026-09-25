import uuid
from typing import List
from datetime import datetime
from app.models.schemas import (
    SynthesizedData, PrescriptiveDecision, NivelAlerta,
    ChatQuery, ChatResponse, FuenteInformacion
)

class LayaEngineService:
    """
    Modelo de IA Laya: Motor Inteligente de Análisis y Decisión (Fase 4 & 5).
    Cruza la información sintetizada de múltiples fuentes, interpreta el panorama,
    emite diagnósticos prescriptivos y responde consultas en lenguaje criollo.
    """
    
    @staticmethod
    def analyze_situation(synthesized_assets: List[SynthesizedData]) -> List[PrescriptiveDecision]:
        decisions = []
        
        # Simulación de razonamiento cross-source por Laya AI
        # Caso 1: Cruce entre aumento de proveedor vs ventas congeladas
        decisions.append(PrescriptiveDecision(
            id=f"DEC-{uuid.uuid4().hex[:6].upper()}",
            titulo="Aumento de Harina 000 no trasladado a Mostrador (Margen Negativo)",
            nivel_alerta=NivelAlerta.RIESGO_CRITICO,
            descripcion_panorama=(
                "Laya detectó que la Distribuidora El Sol aplicó un aumento del 18.5% en la Harina 000 25kg "
                "según la lista recibida por WhatsApp, mientras que en el Cuaderno de Ventas del mes el precio "
                "de la bolsa fraccionada sigue fijado en $12,500. Estás perdiendo $1,850 por bolsa vendida."
            ),
            recomendacion_practica=(
                "Ajustar de inmediato el precio de mostrador a $14,800/unidad o consultar con Distribuidora "
                "Formosa Co. que ofrece la misma marca con 8% de descuento por pago contado."
            ),
            responsable_accion="Encargado de Caja / Propietario",
            evidencia_fundamentacion=[
                "Lista_Precios_Distribuidora_El_Sol.csv: Harina 25kg = $14,200",
                "Cuaderno_Ventas_Septiembre.csv: Harina fraccionada = $12,500"
            ],
            archivos_citados=["Lista_Precios_Distribuidora_El_Sol.csv", "Cuaderno_Ventas_Septiembre.csv"],
            impacto_estimado="Recuperación de $45,000 semanales en margen bruto de panadería."
        ))

        # Caso 2: Alerta de Lista de Precios Desactualizada
        decisions.append(PrescriptiveDecision(
            id=f"DEC-{uuid.uuid4().hex[:6].upper()}",
            titulo="Lista de Precios de Bebidas sin Actualizar (>35 días de antigüedad)",
            nivel_alerta=NivelAlerta.ADVERTENCIA,
            descripcion_panorama=(
                "El catálogo del distribuidor de gaseosas y bebidas 'La Formoseña' tiene más de un mes de vigencia. "
                "En el contexto inflacionario local, seguir usando esta referencia provocará descalce de stock."
            ),
            recomendacion_practica=(
                "Solicitar al preventista por WhatsApp la lista actualizada de la semana antes de emitir la orden de compra."
            ),
            responsable_accion="Administrador / Encargado de Compras",
            evidencia_fundamentacion=[
                "Lista_Precios_Bebidas_Agosto.pdf: Fecha de archivo de más de 30 días"
            ],
            archivos_citados=["Lista_Precios_Bebidas_Agosto.pdf"],
            impacto_estimado="Evita sorpresas de facturación de hasta un 12% al momento de la entrega."
        ))

        # Caso 3: Cumplimiento Normativo / AFIP
        decisions.append(PrescriptiveDecision(
            id=f"DEC-{uuid.uuid4().hex[:6].upper()}",
            titulo="Nueva Resolución sobre Facturación Electrónica para Pequeños Comercios",
            nivel_alerta=NivelAlerta.NORMAL,
            descripcion_panorama=(
                "La circular oficial informa prórroga en el tope de ventas no identificadas para el régimen simplificado provincial."
            ),
            recomendacion_practica=(
                "Enviar copia del resumen en PDF al contador para que lo tenga en cuenta en la liquidación mensual."
            ),
            responsable_accion="Contador / Asesor Externo",
            evidencia_fundamentacion=[
                "Circular_Normativa_Direccion_Comercio.txt: Artículo 4 (Régimen Simplificado)"
            ],
            archivos_citados=["Circular_Normativa_Direccion_Comercio.txt"],
            impacto_estimado="Mantener el comercio 100% en regla sin penalizaciones ni multas."
        ))

        return decisions

    @staticmethod
    def answer_chat_query(query: ChatQuery) -> ChatResponse:
        q = query.pregunta.lower()
        now_str = datetime.now().strftime("%H:%M")
        
        if "aumentó" in q or "mayorista" in q or "precio" in q:
            return ChatResponse(
                respuesta=(
                    "Revisando los documentos con **Laya**, el proveedor que más aumentó esta semana fue "
                    "**Distribuidora El Sol** (+18.5% en lácteos y secos). Le sigue **Distribuidora Formosa Co.** "
                    "con un +6.2% en fiambres. Te sugiero revisar las compras de harina y aceite de inmediato."
                ),
                archivos_citados=["Lista_Precios_Distribuidora_El_Sol.csv", "Nota_WhatsApp_Proveedor.txt"],
                nivel_alerta_asociado=NivelAlerta.ADVERTENCIA,
                fecha_respuesta=now_str
            )
        elif "gané" in q or "ganancia" in q or "margen" in q:
            return ChatResponse(
                respuesta=(
                    "Comparado con el mes pasado, tu margen promedio general bajó del **28.4% al 22.1%**. "
                    "El motivo principal es que mantuviste precios fijos en el cuaderno de ventas mientras las listas "
                    "de los proveedores subieron dos veces este mes."
                ),
                archivos_citados=["Cuaderno_Ventas_Septiembre.csv", "Lista_Precios_Distribuidora_El_Sol.csv"],
                nivel_alerta_asociado=NivelAlerta.RIESGO_CRITICO,
                fecha_respuesta=now_str
            )
        else:
            return ChatResponse(
                respuesta=(
                    "¡Hola! Soy **Laya**, tu asistente de inteligencia en AMIGA. Analicé tus archivos cargados "
                    "(remitos, cuadernos de ventas y listas de precios). En general tu negocio está estable, pero "
                    "tienes 2 ítems con margen negativo que debes ajustar para no perder dinero hoy."
                ),
                archivos_citados=["Cuaderno_Ventas_Septiembre.csv", "Circular_Normativa_Direccion_Comercio.txt"],
                nivel_alerta_asociado=NivelAlerta.NORMAL,
                fecha_respuesta=now_str
            )
