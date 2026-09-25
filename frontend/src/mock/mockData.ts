import { IngestedAsset, AuditDiagnostic, PrescriptiveDecision, ChatMessage } from '../types';

export const INITIAL_ASSETS: IngestedAsset[] = [
  {
    id: "AST-8912",
    filename: "Lista_Precios_Distribuidora_El_Sol.csv",
    formato_origen: "Planilla de Cálculo (XLSX/CSV)",
    fuente_informacion: "Proveedor / Mayorista",
    tipo_economico: "Precio de Compra/Venta",
    upload_timestamp: "Hoy, 08:30 hs",
    file_size_bytes: 4820,
    raw_preview: "Producto,Categoria,PrecioUnidad,Presentacion,Vigencia\nHarina 000,Secos,14200,Bolsa 25kg,2026-09-20\nAceite Girasol 1.5L,Aceites,1850,Botella,2026-09-20\nAzucar Comun 1kg,Secos,920,Paquete,2026-09-20"
  },
  {
    id: "AST-8913",
    filename: "Cuaderno_Ventas_Septiembre.csv",
    formato_origen: "Planilla de Cálculo (XLSX/CSV)",
    fuente_informacion: "Cliente / Fiados",
    tipo_economico: "Venta",
    upload_timestamp: "Ayer, 19:15 hs",
    file_size_bytes: 3120,
    raw_preview: "Fecha,Cliente,Producto,Cantidad,PrecioCobrado,Estado\n2026-09-21,Doña Rosa (Fiado),Harina 000 25kg,1,12500,Pendiente\n2026-09-21,Juan Carlos,Aceite Girasol 1.5L,2,1900,Pagado\n2026-09-22,Don Pedro (Fiado),Yerba Mate 1kg,1,3200,Pendiente"
  },
  {
    id: "AST-8914",
    filename: "Nota_WhatsApp_Proveedor.txt",
    formato_origen: "Mensajería (WhatsApp)",
    fuente_informacion: "Fuente Informal (WhatsApp/Nota)",
    tipo_economico: "Precio de Compra/Venta",
    upload_timestamp: "Hace 2 días",
    file_size_bytes: 840,
    raw_preview: "Hola Don Marcelo! Le aviso por acá que a partir del lunes aumenta 18% la harina y derivados por el costo de flete desde Resistencia. Los lácteos se mantienen hasta el 30."
  },
  {
    id: "AST-8915",
    filename: "Circular_Normativa_Direccion_Comercio.txt",
    formato_origen: "Texto (TXT/DOC/MD)",
    fuente_informacion: "Organismo Público (AFIP/Comercio)",
    tipo_economico: "Impuesto / Tasa",
    upload_timestamp: "Hace 4 días",
    file_size_bytes: 1250,
    raw_preview: "DIRECCIÓN DE COMERCIO DE FORMOSA - RESOLUCIÓN 402/2026: Se extiende la prórroga para la actualización del registro provincial de comercios minoristas de barrio..."
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
    observaciones: "34 ítems auditados. Se completaron 2 celdas de precio nulas con el valor típico mayorista de la zona."
  },
  {
    asset_id: "AST-8913",
    filename: "Cuaderno_Ventas_Septiembre.csv",
    registros_totales: 18,
    faltantes_detectados: 0,
    faltantes_imputados: 0,
    valores_anomalos_aislados: ["Línea 1: Precio cobrado de $12,500 por Harina 25kg resulta inferior al costo mayorista ($14,200). Genera margen negativo."],
    vigencia_dias: 2,
    alerta_obsolescencia: false,
    observaciones: "Se aisló 1 registro crítico de venta por debajo del costo."
  },
  {
    asset_id: "AST-8914",
    filename: "Lista_Precios_Bebidas_Agosto.pdf",
    registros_totales: 42,
    faltantes_detectados: 0,
    faltantes_imputados: 0,
    valores_anomalos_aislados: [],
    vigencia_dias: 38,
    alerta_obsolescencia: true,
    observaciones: "El documento tiene 38 días de antigüedad. En el contexto inflacionario local se considera obsoleto."
  }
];

export const INITIAL_DECISIONS: PrescriptiveDecision[] = [
  {
    id: "DEC-1049",
    titulo: "Venta de Harina 000 a Pérdida en Cuaderno de Fiados",
    nivel_alerta: "RIESGO_CRITICO",
    descripcion_panorama: "Laya detectó que en el cuaderno de ventas estás cobrando la bolsa de Harina 000 (25kg) a $12,500, pero la Distribuidora El Sol la facturó a $14,200 en la lista nueva. Pierdes $1,700 por bolsa vendida.",
    recomendacion_practica: "Actualizar el precio en mostrador a $14,800/unidad o consultar con Distribuidora Formosa Co. que ofrece la misma marca con 8% de descuento por pago contado.",
    responsable_accion: "Propietario / Encargado de Caja",
    evidencia_fundamentacion: [
      "Lista_Precios_Distribuidora_El_Sol.csv: Harina 000 25kg = $14,200",
      "Cuaderno_Ventas_Septiembre.csv: Harina fraccionada = $12,500",
      "Nota_WhatsApp_Proveedor.txt: 'Aumento del 18% en harina por flete'"
    ],
    archivos_citados: ["Lista_Precios_Distribuidora_El_Sol.csv", "Cuaderno_Ventas_Septiembre.csv"],
    impacto_estimado: "Recuperación de $34,000 en el margen semanal del negocio."
  },
  {
    id: "DEC-1050",
    titulo: "Lista de Precios de Bebidas sin Actualizar (>35 días)",
    nivel_alerta: "ADVERTENCIA",
    descripcion_panorama: "El catálogo del distribuidor de gaseosas y bebidas 'La Formoseña' supera los 35 días de vigencia. Presupuestar con estos precios generará descalce de caja al reposicionar stock.",
    recomendacion_practica: "Solicitar la lista de precios semanal actualizada al preventista por WhatsApp antes de emitir el próximo pedido.",
    responsable_accion: "Encargado de Compras",
    evidencia_fundamentacion: [
      "Lista_Precios_Bebidas_Agosto.pdf: Fecha de emisión 18 de agosto (>35 días)"
    ],
    archivos_citados: ["Lista_Precios_Bebidas_Agosto.pdf"],
    impacto_estimado: "Evita descalce presupuestario del 12% en la entrega."
  },
  {
    id: "DEC-1051",
    titulo: "Prórroga del Registro Provincial de Comercio Minorista",
    nivel_alerta: "NORMAL",
    descripcion_panorama: "La Dirección de Comercio de Formosa extendió el plazo para la actualización de datos de comercios de barrio del régimen simplificado.",
    recomendacion_practica: "Enviar copia digital de la circular al contador para tenerla presente en la liquidación mensual.",
    responsable_accion: "Contador / Asesor Externo",
    evidencia_fundamentacion: [
      "Circular_Normativa_Direccion_Comercio.txt: Resolución 402/2026"
    ],
    archivos_citados: ["Circular_Normativa_Direccion_Comercio.txt"],
    impacto_estimado: "Mantiene el comercio 100% al día sin multas administrativas."
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "MSG-1",
    sender: "laya",
    text: "¡Hola Marcelo! Soy Laya, tu copiloto en AMIGA. Analicé tus listas de mayoristas, notas de WhatsApp y cuaderno de fiados. En general tu negocio está marchando bien, pero detecté 1 producto vendido por debajo del costo. ¿Querés que lo revisemos?",
    timestamp: "08:35"
  }
];
