import { IngestedAsset, AuditDiagnostic, PrescriptiveDecision, ChatQuery, ChatResponse } from '../types';
import { INITIAL_ASSETS, INITIAL_AUDITS, INITIAL_DECISIONS, INITIAL_CHAT } from '../mock/mockData';

const API_BASE = '/api';

export const ApiService = {
  async uploadFile(file: File): Promise<IngestedAsset> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error("API Offline");
      return await res.json();
    } catch {
      // Mock Fallback
      return {
        id: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
        filename: file.name,
        formato_origen: file.name.endsWith('.pdf') ? "PDF Documental" : "Planilla de Cálculo (XLSX/CSV)",
        fuente_informacion: "Proveedor / Mayorista",
        tipo_economico: "Precio de Compra/Venta",
        upload_timestamp: "Recién cargado",
        file_size_bytes: file.size,
        raw_preview: `Vista previa simulada de ${file.name}`
      };
    }
  },

  async fetchDecisions(): Promise<PrescriptiveDecision[]> {
    try {
      const res = await fetch(`${API_BASE}/decisions`);
      if (!res.ok) throw new Error("API Offline");
      return await res.json();
    } catch {
      return INITIAL_DECISIONS;
    }
  },

  async sendChat(query: string): Promise<ChatResponse> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: query })
      });
      if (!res.ok) throw new Error("API Offline");
      return await res.json();
    } catch {
      const q = query.lowerCase ? query.toLowerCase() : query;
      let respText = "Analicé tus archivos con **Laya**. No detecté discrepancias graves en esta consulta, pero la harina y el aceite requieren actualización de precio de venta en mostrador.";
      let citas = ["Lista_Precios_Distribuidora_El_Sol.csv", "Cuaderno_Ventas_Septiembre.csv"];
      let alerta: any = "ADVERTENCIA";

      if (q.includes("aumentó") || q.includes("mayorista")) {
        respText = "El mayorista **Distribuidora El Sol** aplicó el mayor incremento esta semana (+18.5% en Harina 000).";
      } else if (q.includes("ganancia") || q.includes("gané")) {
        respText = "Tu margen disminuyó 6.3% por mantener congelado el cuaderno de fiados mientras los insumos aumentaron.";
        alerta = "RIESGO_CRITICO";
      }

      return {
        respuesta: respText,
        archivos_citados: citas,
        nivel_alerta_asociado: alerta,
        fecha_respuesta: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  }
};
