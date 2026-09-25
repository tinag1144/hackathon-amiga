from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

# --- TAXONOMÍAS DE DOMINIO ---

class FormatoOrigen(str, Enum):
    TEXTO = "Texto (TXT/DOC/MD)"
    PDF = "PDF Documental"
    PLANILLA = "Planilla de Cálculo (XLSX/CSV)"
    DATOS_ESTRUCTURADOS = "Datos Estructurados (JSON)"
    IMAGEN = "Imagen / Escaneo"
    AUDIO = "Audio / Transcripción"
    MENSAJERIA = "Mensajería (WhatsApp)"
    DOCUMENTO_FISICO = "Foto Remito / Comprobante"

class FuenteInformacion(str, Enum):
    PROVEEDOR = "Proveedor / Mayorista"
    CLIENTE = "Cliente / Fiados"
    ENTIDAD_FINANCIERA = "Entidad Financiera / Billetera"
    ORGANISMO_PUBLICO = "Organismo Público (AFIP/Comercio)"
    NEGOCIO_PROPIO = "Negocio Propio / Inventario"
    EMPLEADO = "Empleado / Colaborador"
    FUENTE_INFORMAL = "Fuente Informal (WhatsApp/Nota)"
    FUENTE_DOCUMENTAL = "Fuente Documental (Factura/Remito)"

class TipoInformacionEconomica(str, Enum):
    INGRESO = "Ingreso"
    EGRESO = "Egreso"
    COMPRA = "Compra"
    VENTA = "Venta"
    GASTO = "Gasto Operativo"
    DEUDA_A_COBRAR = "Deuda a Cobrar (Fiados)"
    DEUDA_A_PAGAR = "Deuda a Pagar"
    STOCK = "Stock / Inventario"
    PRECIO = "Precio de Compra/Venta"
    MARGEN = "Margen de Ganancia"
    IMPUESTO = "Impuesto / Tasa"

class NivelAlerta(str, Enum):
    NORMAL = "NORMAL"
    ADVERTENCIA = "ADVERTENCIA"
    RIESGO_CRITICO = "RIESGO_CRITICO"

# --- MODELOS DE PROCESAMIENTO POR FASES ---

class IngestedAsset(BaseModel):
    id: str
    filename: str
    formato_origen: FormatoOrigen
    fuente_informacion: FuenteInformacion
    tipo_economico: TipoInformacionEconomica
    upload_timestamp: str
    file_size_bytes: int
    raw_preview: str

class AuditDiagnostic(BaseModel):
    asset_id: str
    filename: str
    registros_totales: int
    faltantes_detectados: int
    faltantes_imputados: int
    valores_anomalos_aislados: List[str]
    vigencia_dias: int
    alerta_obsolescencia: bool
    observaciones: str

class SynthesizedData(BaseModel):
    asset_id: str
    filename: str
    fuente: FuenteInformacion
    tipo_economico: TipoInformacionEconomica
    metricas: Dict[str, Any]
    resumen_ejecutivo: str
    timestamp_sintesis: str

class PrescriptiveDecision(BaseModel):
    id: str
    titulo: str
    nivel_alerta: NivelAlerta
    descripcion_panorama: str
    recomendacion_practica: str
    responsable_accion: str
    evidencia_fundamentacion: List[str]
    archivos_citados: List[str]
    impacto_estimado: str

class ChatQuery(BaseModel):
    pregunta: str

class ChatResponse(BaseModel):
    respuesta: str
    archivos_citados: List[str]
    nivel_alerta_asociado: Optional[NivelAlerta] = None
    fecha_respuesta: str
