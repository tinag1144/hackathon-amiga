import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Tag, Clock, ArrowRight, Eye, X, Play } from 'lucide-react';
import { IngestedAsset } from '../../types';

interface FileUploaderProps {
  assets: IngestedAsset[];
  onUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ assets, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<IngestedAsset | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDemoUpload = () => {
    const demoFile = new File(
      ["Producto,Categoria,PrecioUnidad\nHarina 000,Secos,14200"],
      "Remito_Nuevo_Distribuidora_El_Sol.csv",
      { type: "text/csv" }
    );
    onUpload(demoFile);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Banner Editorial */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-editorial border border-[#073b4c]/5 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[#ffd166]/25 text-[#073b4c] text-[10px] font-bold rounded-full mb-1.5">
            Fase 1 • Centralización de Archivos
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#073b4c] tracking-tight">
            El "Basurero" de Archivos
          </h2>
          <p className="text-[11px] sm:text-xs text-[#073b4c]/70 leading-relaxed max-w-xl">
            Arrastrá todo lo que tengas suelto: PDFs de mayoristas, fotos de remitos, Excel o textos de WhatsApp.
          </p>
        </div>

        {/* Botón de Demostración Rápida para Exposición */}
        <button
          onClick={handleDemoUpload}
          className="shrink-0 px-3.5 py-2 bg-[#118ab2] hover:bg-[#073b4c] text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Probar Ingesta en Vivo</span>
        </button>
      </div>

      {/* Drag and Drop Zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`block cursor-pointer bg-white rounded-3xl p-5 sm:p-6 text-center transition-all duration-300 border-2 border-dashed shadow-editorial ${
          isDragging
            ? 'border-[#118ab2] bg-[#118ab2]/5 scale-[0.99]'
            : 'border-[#073b4c]/15 hover:border-[#118ab2]/50 hover:bg-[#FAF9F5]'
        }`}
      >
        <input type="file" className="hidden" onChange={handleFileChange} accept=".csv,.xlsx,.pdf,.txt,.jpg,.png" />
        <div className="w-10 h-10 bg-[#118ab2]/10 rounded-2xl flex items-center justify-center mx-auto mb-2 text-[#118ab2]">
          <UploadCloud className="w-5 h-5" />
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-[#073b4c]">
          Soltá tus documentos o tocá para explorar
        </h3>
        <p className="text-[10px] sm:text-xs text-[#073b4c]/50 mt-0.5">
          PDFs, Excel (XLSX/CSV), notas de WhatsApp o imágenes
        </p>
        <span className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] sm:text-xs font-bold text-[#118ab2] bg-[#118ab2]/10 px-3.5 py-1.5 rounded-full">
          Cargar nuevo documento <ArrowRight className="w-3 h-3" />
        </span>
      </label>

      {/* Lista de Fuentes Ingeridas */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-[10px] font-bold text-[#073b4c] uppercase tracking-wider">
            Fuentes Ingeridas ({assets.length})
          </h3>
          <span className="text-[10px] text-[#06d6a0] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Clasificadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-white rounded-3xl p-3.5 shadow-editorial border border-[#073b4c]/5 hover:shadow-editorial-hover transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-2xl bg-[#073b4c]/5 flex items-center justify-center text-[#073b4c] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#073b4c] truncate">{asset.filename}</h4>
                    <p className="text-[9px] text-[#073b4c]/50 flex items-center gap-1 mt-0.5 truncate">
                      <Clock className="w-2.5 h-2.5 shrink-0" /> {asset.upload_timestamp}
                    </p>
                  </div>
                </div>
                
                <button className="shrink-0 text-[9px] font-bold px-2 py-1 bg-[#118ab2]/10 text-[#118ab2] rounded-full flex items-center gap-1 hover:bg-[#118ab2]/20">
                  <Eye className="w-3 h-3" /> Ver
                </button>
              </div>

              {/* Taxonomía Asignada */}
              <div className="pt-2 border-t border-[#073b4c]/5 flex flex-wrap gap-1">
                <span className="text-[9px] font-medium bg-[#073b4c]/5 text-[#073b4c] px-2 py-0.5 rounded-full flex items-center gap-1 truncate max-w-[170px]">
                  <Tag className="w-2.5 h-2.5 text-[#118ab2] shrink-0" /> {asset.fuente_informacion}
                </span>
                <span className="text-[9px] font-medium bg-[#ffd166]/20 text-[#073b4c] px-2 py-0.5 rounded-full truncate max-w-[130px]">
                  {asset.tipo_economico}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Inspección de Archivo */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-[#073b4c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-editorial border border-[#073b4c]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#118ab2] bg-[#118ab2]/10 px-2.5 py-1 rounded-full">
                Inspección de Fuente (Fase 1)
              </span>
              <button
                onClick={() => setSelectedAsset(null)}
                className="w-7 h-7 rounded-full bg-[#073b4c]/5 text-[#073b4c] flex items-center justify-center hover:bg-[#073b4c]/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xs font-bold text-[#073b4c] mb-1 break-words">
              {selectedAsset.filename}
            </h3>
            <p className="text-[10px] text-[#073b4c]/60 mb-3">
              Subido: {selectedAsset.upload_timestamp} • Tamaña: {Math.round(selectedAsset.file_size_bytes / 1024)} KB
            </p>

            <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-[#073b4c]/5 mb-3 font-mono text-[10px] text-[#073b4c]/80 whitespace-pre-wrap max-h-36 overflow-y-auto">
              {selectedAsset.raw_preview}
            </div>

            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#073b4c]/60">Formato Detectado:</span>
                <span className="font-bold text-[#073b4c]">{selectedAsset.formato_origen}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-[#073b4c]/60">Fuente Identificada:</span>
                <span className="font-bold text-[#118ab2] truncate max-w-[150px] text-right">{selectedAsset.fuente_informacion}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-[#073b4c]/60">Tipo Económico:</span>
                <span className="font-bold text-[#06d6a0]">{selectedAsset.tipo_economico}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAsset(null)}
              className="w-full py-2 bg-[#073b4c] text-white rounded-xl text-xs font-bold hover:bg-[#118ab2] transition-colors"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
