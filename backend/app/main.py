from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from app.config import settings
from app.models.schemas import (
    IngestedAsset, AuditDiagnostic, SynthesizedData,
    PrescriptiveDecision, ChatQuery, ChatResponse
)
from app.services.ingestion import IngestionService
from app.services.auditor import AuditService
from app.services.synthesizer import SynthesizerService
from app.services.laya_engine import LayaEngineService

app = FastAPI(
    title="AMIGA API - Motor de Análisis y Decisión (Laya AI Engine)",
    description="Backend para la gestión autónoma de información del emprendedor formoseño",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro Modular de n8n (Feature Flag)
if settings.ENABLE_N8N_WEBHOOK:
    from app.routers.n8n_router import n8n_router
    app.include_router(n8n_router, prefix="/api/webhook", tags=["n8n"])

# Estado en memoria para demostración del hackatón
stored_assets: List[IngestedAsset] = []
stored_diagnostics: List[AuditDiagnostic] = []
stored_syntheses: List[SynthesizedData] = []

@app.get("/")
def read_root():
    return {
        "app": "AMIGA - Análisis y Manejo de Información para la Gestión Autónoma",
        "engine": "Modelo Laya AI Engine",
        "n8n_webhook_enabled": settings.ENABLE_N8N_WEBHOOK,
        "status": "Online",
        "version": "1.0.0"
    }

@app.post("/api/upload", response_model=IngestedAsset)
async def upload_document(file: UploadFile = File(...)):
    content = await file.read()
    asset = IngestionService.classify_and_ingest(file.filename, content)
    stored_assets.append(asset)
    
    # Procesar auditoría inmediatamente
    content_str = content.decode('utf-8', errors='ignore')
    diagnostic = AuditService.audit_asset(asset, content_str)
    stored_diagnostics.append(diagnostic)
    
    # Procesar síntesis JSON
    synthesis = SynthesizerService.synthesize(asset, content_str)
    stored_syntheses.append(synthesis)
    
    return asset

@app.get("/api/assets", response_model=List[IngestedAsset])
def get_assets():
    return stored_assets

@app.get("/api/audit", response_model=List[AuditDiagnostic])
def get_audit_reports():
    return stored_diagnostics

@app.get("/api/decisions", response_model=List[PrescriptiveDecision])
def get_prescriptive_decisions():
    # Laya AI analiza el panorama completo acumulado
    return LayaEngineService.analyze_situation(stored_syntheses)

@app.post("/api/chat", response_model=ChatResponse)
def query_laya(query: ChatQuery):
    return LayaEngineService.answer_chat_query(query)
