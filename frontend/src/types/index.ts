export type FormatoOrigen = 
  | "Texto (TXT/DOC/MD)" 
  | "PDF Documental" 
  | "Planilla de Cálculo (XLSX/CSV)" 
  | "Datos Estructurados (JSON)" 
  | "Imagen / Escaneo" 
  | "Audio / Transcripción" 
  | "Mensajería (WhatsApp)" 
  | "Foto Remito / Comprobante";

export type FuenteInformacion = 
  | "Proveedor / Mayorista" 
  | "Cliente / Fiados" 
  | "Entidad Financiera / Billetera" 
  | "Organismo Público (AFIP/Comercio)" 
  | "Negocio Propio / Inventario" 
  | "Empleado / Colaborador" 
  | "Fuente Informal (WhatsApp/Nota)" 
  | "Fuente Documental (Factura/Remito)";

export type TipoInformacionEconomica = 
  | "Ingreso" 
  | "Egreso" 
  | "Compra" 
  | "Venta" 
  | "Gasto Operativo" 
  | "Deuda a Cobrar (Fiados)" 
  | "Deuda a Pagar" 
  | "Stock / Inventario" 
  | "Precio de Compra/Venta" 
  | "Margen de Ganancia" 
  | "Impuesto / Tasa";

export type NivelAlerta = "NORMAL" | "ADVERTENCIA" | "RIESGO_CRITICO";

export interface IngestedAsset {
  id: string;
  filename: string;
  formato_origen: FormatoOrigen;
  fuente_informacion: FuenteInformacion;
  tipo_economico: TipoInformacionEconomica;
  upload_timestamp: string;
  file_size_bytes: number;
  raw_preview: string;
}

export interface AuditDiagnostic {
  asset_id: string;
  filename: string;
  registros_totales: number;
  faltantes_detectados: number;
  faltantes_imputados: number;
  valores_anomalos_aislados: string[];
  vigencia_dias: number;
  alerta_obsolescencia: boolean;
  observaciones: string;
}

export interface SynthesizedData {
  asset_id: string;
  filename: string;
  fuente: FuenteInformacion;
  tipo_economico: TipoInformacionEconomica;
  metricas: Record<string, any>;
  resumen_ejecutivo: string;
  timestamp_sintesis: string;
}

export interface PrescriptiveDecision {
  id: string;
  titulo: string;
  nivel_alerta: NivelAlerta;
  descripcion_panorama: string;
  recomendacion_practica: string;
  responsable_accion: string;
  evidencia_fundamentacion: string[];
  archivos_citados: string[];
  impacto_estimado: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "laya";
  text: string;
  archivos_citados?: string[];
  nivel_alerta?: NivelAlerta;
  timestamp: string;
}
