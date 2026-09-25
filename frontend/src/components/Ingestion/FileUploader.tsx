import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Tag, Clock, ArrowRight } from 'lucide-react';
import { IngestedAsset } from '../../types';

interface FileUploaderProps {
  assets: IngestedAsset[];
  onUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ assets, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Intro Banner Editorial */}
      <div className="bg-white rounded-3xl p-6 shadow-editorial border border-[#073b4c]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd166]/15 rounded-full blur-2xl -mr-10 -mt-10" />
        <span className="inline-block px-3 py-1 bg-[#ffd166]/25 text-[#073b4c] text-xs font-bold rounded-full mb-3">
          Fase 1 • Centralización de Archivos
        </span>
        <h2 className="text-xl font-bold text-[#073b4c] tracking-tight">
          El "Basurero" de Archivos
        </h2>
        <p className="text-xs text-[#073b4c]/70 mt-1 leading-relaxed">
          Arrastrá todo lo que tengas suelto: el PDF del mayorista, la foto del remito, el Excel de ventas o el texto de WhatsApp. AMIGA lo unifica en un solo lugar.
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
            onUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`block cursor-pointer bg-white rounded-3xl p-8 text-center transition-all duration-300 border-2 border-dashed shadow-editorial ${
          isDragging
            ? 'border-[#118ab2] bg-[#118ab2]/5 scale-[0.99]'
            : 'border-[#073b4c]/15 hover:border-[#118ab2]/50 hover:bg-[#FAF9F5]'
        }`}
      >
        <input type="file" className="hidden" onChange={handleFileChange} accept=".csv,.xlsx,.pdf,.txt,.jpg,.png" />
        <div className="w-14 h-14 bg-[#118ab2]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#118ab2]">
          <UploadCloud className="w-7 h-7" />
        </div>
        <h3 className="text-sm font-bold text-[#073b4c]">
          Soltá tus documentos o tocá para explorar
        </h3>
        <p className="text-xs text-[#073b4c]/50 mt-1">
          Soporta PDFs, Excel (XLSX/CSV), notas de WhatsApp y fotos de remitos
        </p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-[#118ab2] bg-[#118ab2]/10 px-4 py-2 rounded-full">
          Cargar nuevo documento <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </label>

      {/* Lista de Fuentes Ingeridas */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-[#073b4c] uppercase tracking-wider text-[11px]">
            Fuentes Ingeridas ({assets.length})
          </h3>
          <span className="text-xs text-[#06d6a0] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Clasificadas por Laya
          </span>
        </div>

        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5 hover:shadow-editorial-hover transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#073b4c]/5 flex items-center justify-center text-[#073b4c]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#073b4c] line-clamp-1">{asset.filename}</h4>
                    <p className="text-[11px] text-[#073b4c]/50 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {asset.upload_timestamp}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-[#06d6a0]/15 text-[#073b4c] rounded-full border border-[#06d6a0]/30">
                  {asset.formato_origen.split(' ')[0]}
                </span>
              </div>

              {/* Taxonomía Asignada */}
              <div className="mt-3 pt-3 border-t border-[#073b4c]/5 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium bg-[#073b4c]/5 text-[#073b4c] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#118ab2]" /> {asset.fuente_informacion}
                </span>
                <span className="text-[10px] font-medium bg-[#ffd166]/20 text-[#073b4c] px-2.5 py-1 rounded-full">
                  {asset.tipo_economico}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
