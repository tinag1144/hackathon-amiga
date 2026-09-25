# 🌸 AMIGA - Análisis y Manejo de Información para la Gestión Autónoma

> **Asistente Analítico Local y Copiloto Documental para el Emprendedor Formoseño**

**AMIGA** es una plataforma web mobile-first diseñada para erradicar la ceguera financiera del pequeño comerciante, ferretero o despensero de Formosa. Permite centralizar el "basurero" de archivos (PDFs de mayoristas, notas de WhatsApp, cuadernos de fiados, planillas Excel), auditarlos, unificarlos y tomar decisiones informadas impulsadas por **Laya**, nuestro motor inteligente de decisión.

---

## 🎨 Identidad Visual y Estética Editorial

La interfaz de **AMIGA** sigue una estética editorial, cálida, refinada y humana, construida sobre una base marfil suave (`#FAF9F5`) y tarjetas flotantes de radio 24px (`rounded-3xl`).

### Paleta de Color Obligatoria:
- **`#073b4c` (Azul Profundo Estructural):** Títulos, navegación, jerarquía principal, texto de alto contraste.
- **`#118ab2` (Cian Primario / Acción):** Botones interactivos, enlaces, estado activo.
- **`#06d6a0` (Verde Esmeralda Positivo):** Confirmaciones, promedios favorables, métricas saludables.
- **`#ffd166` (Amarillo Cálido Atractivo):** Chips de categoría, atención moderada, indicadores de frescura.
- **`#ef476f` (Rosa Vibrante Alerta):** Destacados de riesgo crítico, alertas de margen o vencimientos.

---

## ⚙️ Arquitectura del Motor de Análisis (Impulsado por el Modelo "Laya")

El backend ejecuta un pipeline riguroso de 5 fases:

1. **Fase 1: Ingesta y Autoclasificación:**
   - Detecta automáticamente el *Formato de Origen* (PDF, CSV, TXT, Imagen), *Fuente de Información* (Proveedor, Negocio Propio, Organismo Público) y *Tipo de Información Económica* (Precio, Venta, Stock, Deuda).
2. **Fase 2: Auditoría y Limpieza Rigurosa:**
   - Imputa faltantes con criterio operativo justo (promedios/modas), aísla números negativos/anómalos y emite alertas de vigencia (listas > 30 días).
3. **Fase 3: Traducción a Formato JSON Estándar:**
   - Síntesis unificada con métricas agregadas (promedios, tendencias, valores min/max, puntos clave).
4. **Fase 4: Interpretación Contextual por el Modelo Laya:**
   - El modelo **Laya AI** cruza fuentes (ej. aumento del proveedor vs. precio congelado en el cuaderno) basándose 100% en evidencia estricta.
5. **Fase 5: Clasificación y Salida Prescriptiva JSON:**
   - Clasificación por Nivel de Alerta (`NORMAL`, `ADVERTENCIA`, `RIESGO_CRITICO`), prescripción de acciones, responsable sugerido y citas trazables a los archivos originales.

---

## 📂 Estructura del Proyecto

```
HACKATHON/
├── backend/
│   ├── app/
│   │   ├── main.py                  # API FastAPI principal
│   │   ├── config.py                # Configuración de entorno
│   │   ├── models/schemas.py        # Modelos Pydantic del contrato JSON
│   │   └── services/
│   │       ├── laya_engine.py       # Modelo Laya AI (Simulación de IA & Razonamiento)
│   │       ├── ingestion.py         # Fase 1: Ingesta multitipo
│   │       ├── auditor.py           # Fase 2: Auditoría y Limpieza
│   │       └── synthesizer.py       # Fase 3: Síntesis JSON
│   ├── sample_data/                 # Archivos de prueba reales para Formosa
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/              # MobileContainer, TopHeader, BottomNav
│   │   │   ├── Ingestion/           # Drag&Drop FileUploader
│   │   │   ├── Audit/               # DataAuditView
│   │   │   ├── Decisions/           # DecisionFeed (Tarjetas editoriales de alerta)
│   │   │   └── Chat/                # CopilotChat ("Preguntas en Criollo")
│   │   ├── services/api.ts          # Conexión con Backend
│   │   ├── types/index.ts           # Definiciones TypeScript estrictas
│   │   ├── App.tsx
│   │   └── index.css                # Tailwind & tipografía Plus Jakarta Sans
│   ├── tailwind.config.js           # Design tokens con la paleta oficial
│   └── package.json
└── README.md
```

---

## 🚀 Inicio Rápido

### Backend (Python FastAPI)
```bash
cd backend
python -m venv venv
# En Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend (React + TypeScript + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 💬 "Preguntas en Criollo" impulsadas por Laya AI
El comerciante puede consultar directamente en el chat integrado:
- *"¿Qué proveedor me aumentó más la mercadería esta semana?"*
- *"¿Qué productos estoy vendiendo a pérdida respecto al remito nuevo?"*
- *"¿Tengo listas de precios desactualizadas que deba revisar?"*

Cada respuesta emitida por **Laya** incluye citas trazables a los documentos originales cargados en el sistema.
