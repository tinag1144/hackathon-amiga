import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Tag, Clock, ArrowRight, Eye, X, Check } from 'lucide-react';
import { IngestedAsset } from '../../types';

interface FileUploaderProps {
  assets: IngestedAsset[];
  onUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ assets, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<IngestedAsset | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      onUpload(f);
      showToast(`Documento '${f.name}' cargado e ingestado exitosamente`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#06d6a0] text-[#073b4c] font-bold text-xs px-4 py-2.5 rounded-full shadow-lg border border-white/40 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#073b4c]" />
          {toastMessage}
        </div>
      )}

      {/* Intro Banner Editorial */}
      <div className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd166]/15 rounded-full blur-2xl -mr-10 -mt-10" />
        <span className="inline-block px-3 py-1 bg-[#ffd166]/25 text-[#073b4c] text-[11px] font-bold rounded-full mb-2.5">
          Fase 1 • Centralización de Archivos
        </span>
        <h2 className="text-lg font-bold text-[#073b4c] tracking-tight">
          El "Basurero" de Archivos
        </h2>
        <p className="text-xs text-[#073b4c]/70 mt-0.5 leading-relaxed">
          Arrastrá todo lo que tengas suelto: PDFs de mayoristas, fotos de remitos, Excel o textos de WhatsApp. AMIGA lo unifica sin exigir formato.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const f = e.dataTransfer.files[0];
            onUpload(f);
            showToast(`Documento '${f.name}' ingestado por Laya`);
          }
        }}
        className={`block cursor-pointer bg-white rounded-3xl p-7 text-center transition-all duration-300 border-2 border-dashed shadow-editorial ${
          isDragging
            ? 'border-[#118ab2] bg-[#118ab2]/5 scale-[0.99]'
            : 'border-[#073b4c]/15 hover:border-[#118ab2]/50 hover:bg-[#FAF9F5]'
        }`}
      >
        <input type="file" className="hidden" onChange={handleFileChange} accept=".csv,.xlsx,.pdf,.txt,.jpg,.png" />
        <div className="w-12 h-12 bg-[#118ab2]/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#118ab2]">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="text-xs font-bold text-[#073b4c]">
          Soltá tus documentos o tocá para explorar
        </h3>
        <p className="text-[11px] text-[#073b4c]/50 mt-0.5">
          PDFs, Excel (XLSX/CSV), notas de WhatsApp o imágenes
        </p>
        <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold text-[#118ab2] bg-[#118ab2]/10 px-3.5 py-1.5 rounded-full">
          Cargar nuevo documento <ArrowRight className="w-3 h-3" />
        </span>
      </label>

      {/* Lista de Fuentes Ingeridas */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-[11px] font-bold text-[#073b4c] uppercase tracking-wider">
            Fuentes Ingeridas ({assets.length})
          </h3>
          <span className="text-[11px] text-[#06d6a0] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Autoclasificadas
          </span>
        </div>

        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-white rounded-3xl p-4 shadow-editorial border border-[#073b4c]/5 hover:shadow-editorial-hover transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#073b4c]/5 flex items-center justify-center text-[#073b4c]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#073b4c] line-clamp-1">{asset.filename}</h4>
                    <p className="text-[10px] text-[#073b4c]/50 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {asset.upload_timestamp}
                    </p>
                  </div>
                </div>
                <button className="text-[10px] font-bold px-2 py-1 bg-[#118ab2]/10 text-[#118ab2] rounded-full flex items-center gap-1 hover:bg-[#118ab2]/20">
                  <Eye className="w-3 h-3" /> Inspeccionar
                </button>
              </div>

              {/* Taxonomía Asignada */}
              <div className="mt-2.5 pt-2.5 border-t border-[#073b4c]/5 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium bg-[#073b4c]/5 text-[#073b4c] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#118ab2]" /> {asset.fuente_informacion}
                </span>
                <span className="text-[10px] font-medium bg-[#ffd166]/20 text-[#073b4c] px-2.5 py-0.5 rounded-full">
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
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-editorial border border-[#073b4c]/10 animate-in fade-in zoom-in duration-200">
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

            <h3 className="text-xs font-bold text-[#073b4c] mb-1">
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
                <span className="font-bold text-[#118ab2]">{selectedAsset.fuente_informacion}</span>
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
