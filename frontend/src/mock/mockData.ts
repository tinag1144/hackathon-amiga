import { IngestedAsset, AuditDiagnostic, PrescriptiveDecision, ChatMessage } from '../types';

export const INITIAL_ASSETS: IngestedAsset[] = [
  {
    id: "AST-8912",
    filename: "Lista_Precios_Distribuidora_El_Sol.csv",
    formato_origen: "Planilla de Cálculo (XLSX/CSV)",
    fuente_informacion: "Proveedor / Mayorista",
    tipo_economico: "Precio de Compra/Venta",
    upload_timestamp: "Hoy, 08:30",
    file_size_bytes: 4820,
    raw_preview: "Producto,Categoria,PrecioUnidad,Presentacion\nHarina 000,Secos,14200,Bolsa 25kg..."
  },
  {
    id: "AST-8913",
    filename: "Cuaderno_Ventas_Septiembre.csv",
    formato_origen: "Planilla de Cálculo (XLSX/CSV)",
    fuente_informacion: "Cliente / Fiados",
    tipo_economico: "Venta",
    upload_timestamp: "Ayer, 19:15",
    file_size_bytes: 3120,
    raw_preview: "Fecha,Cliente,Producto,Cantidad,PrecioCobrado\n2026-09-21,Doña Rosa,Harina 000,12500..."
  },
  {
    id: "AST-8914",
    filename: "Nota_WhatsApp_Proveedor.txt",
    formato_origen: "Mensajería (WhatsApp)",
    fuente_informacion: "Fuente Informal (WhatsApp/Nota)",
    tipo_economico: "Precio de Compra/Venta",
    upload_timestamp: "Hace 2 días",
    file_size_bytes: 840,
    raw_preview: "Hola Don Marcelo! Le aviso por acá que a partir del lunes aumenta 18% la harina..."
  }
];

export const INITIAL_AUDITS: AuditDiagnostic[] = [
  {
    asset_id: "AST-8912",
    filename: "Lista_Precios_Distribuidora_El_Sol.csv",
    registros_totales: 34,
    faltantes_detectados: 2,
    faltantes_imputados: 2,
    valores_anomalos_aislados: [],
    vigencia_dias: 5,
    alerta_obsolescencia: false,
    observaciones: "Se auditaron 34 registros de precios. Se imputaron 2 celdas vacías con el precio típico."
  },
  {
    asset_id: "AST-8913",
    filename: "Cuaderno_Ventas_Septiembre.csv",
    registros_totales: 18,
    faltantes_detectados: 0,
    faltantes_imputados: 0,
    valores_anomalos_aislados: ["Línea 4: Precio cobrado de $12,500 en Harina 25kg resulta inferior al costo mayorista ($14,200)"],
    vigencia_dias: 2,
    alerta_obsolescencia: false,
    observaciones: "Se detectó 1 registro con venta a pérdida (margen negativo)."
  }
];

export const INITIAL_DECISIONS: PrescriptiveDecision[] = [
  {
    id: "DEC-1049",
    titulo: "Venta de Harina a Pérdida en Mostrador",
    nivel_alerta: "RIESGO_CRITICO",
    descripcion_panorama: "Laya detectó que estás vendiendo la Harina 000 (25kg) a $12,500 en el cuaderno de fiados, pero la Distribuidora El Sol la facturó a $14,200 en la lista nueva. Pierdes $1,700 por bolsa.",
    recomendacion_practica: "Actualizar el precio en el cuaderno a $14,800/unidad o consultar con Distribuidora Formosa Co. por volumen.",
    responsable_accion: "Propietario / Encargado de Caja",
    evidencia_fundamentacion: [
      "Lista_Precios_Distribuidora_El_Sol.csv: Harina 25kg = $14,200",
      "Cuaderno_Ventas_Septiembre.csv: Harina 25kg = $12,500"
    ],
    archivos_citados: ["Lista_Precios_Distribuidora_El_Sol.csv", "Cuaderno_Ventas_Septiembre.csv"],
    impacto_estimado: "Evita perder $34,000 en el stock restante del mes."
  },
  {
    id: "DEC-1050",
    titulo: "Lista de Precios de Bebidas sin Actualizar (>35 días)",
    nivel_alerta: "ADVERTENCIA",
    descripcion_panorama: "El catálogo de 'La Formoseña' tiene más de 35 días de vigencia. Podrías estar presupuestando con precios obsoletos.",
    recomendacion_practica: "Solicitar por WhatsApp la lista semanal actualizada al preventista antes de armar la orden.",
    responsable_accion: "Encargado de Compras",
    evidencia_fundamentacion: [
      "Lista_Precios_Bebidas_Agosto.pdf: Fecha de emisión 18/08"
    ],
    archivos_citados: ["Lista_Precios_Bebidas_Agosto.pdf"],
    impacto_estimado: "Evita descalce presupuestario del 12% en la entrega."
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "MSG-1",
    sender: "laya",
    text: "¡Hola Marcelo! Soy Laya, tu copiloto en AMIGA. Revisé tus archivos subidos y detecté que el costo de la harina subió un 18.5%. ¿Querés que revisemos qué productos te quedaron desactualizados?",
    timestamp: "09:00"
  }
];
