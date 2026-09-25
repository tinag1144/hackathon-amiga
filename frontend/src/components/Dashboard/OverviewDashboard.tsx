import React from 'react';
import { TrendingUp, ShieldCheck, ArrowUpRight, UploadCloud } from 'lucide-react';
import { PrescriptiveDecision, IngestedAsset } from '../../types';

interface OverviewDashboardProps {
  decisions: PrescriptiveDecision[];
  assets: IngestedAsset[];
  onNavigateTab: (tab: any) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ decisions, assets, onNavigateTab }) => {
  return (
    <div className="space-y-5 pb-20">
      
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#073b4c] tracking-tight">Dashboard</h1>
          <p className="text-xs text-[#64748b]">Panorama económico general y auditoría inteligente en tiempo real</p>
        </div>

        <button
          onClick={() => onNavigateTab('ingesta')}
          className="px-4 py-2 bg-[#0d3836] hover:bg-[#184e4c] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4 text-[#10b981]" />
          <span>+ Cargar Archivo</span>
        </button>
      </div>

      {/* TOP ROW: 3 Metric Cards con minigráficos estilo AeuxGlobal */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#64748b] block mb-1">Índice Margen Promedio</span>
            <div className="text-2xl font-extrabold text-[#073b4c]">28.4%</div>
            <span className="text-[10px] font-bold text-[#10b981] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +2.3% respecto al mes pasado
            </span>
          </div>

          {/* Mini Bar Chart */}
          <div className="flex items-end gap-1 h-9 shrink-0">
            <div className="w-1.5 h-4 bg-[#10b981]/30 rounded-t-sm" />
            <div className="w-1.5 h-6 bg-[#10b981]/50 rounded-t-sm" />
            <div className="w-1.5 h-5 bg-[#10b981]/40 rounded-t-sm" />
            <div className="w-1.5 h-8 bg-[#10b981] rounded-t-sm" />
            <div className="w-1.5 h-9 bg-[#10b981] rounded-t-sm" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#64748b] block mb-1">Confiabilidad de Datos</span>
            <div className="text-2xl font-extrabold text-[#073b4c]">94.5 / 100%</div>
            <span className="text-[10px] font-bold text-[#10b981] flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> {assets.length} fuentes verificadas por Laya
            </span>
          </div>

          {/* Mini Bar Chart Red/Green */}
          <div className="flex items-end gap-1 h-9 shrink-0">
            <div className="w-1.5 h-7 bg-[#ef476f] rounded-t-sm" />
            <div className="w-1.5 h-5 bg-[#ef476f]/40 rounded-t-sm" />
            <div className="w-1.5 h-8 bg-[#10b981]" />
            <div className="w-1.5 h-9 bg-[#10b981]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#64748b] block mb-1">Impacto de Alertas Recobrado</span>
            <div className="text-2xl font-extrabold text-[#073b4c]">$34,000</div>
            <span className="text-[10px] font-bold text-[#10b981] flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> {decisions.length} recomendaciones prescriptivas
            </span>
          </div>

          <div className="flex items-end gap-1 h-9 shrink-0">
            <div className="w-1.5 h-3 bg-[#10b981]/30 rounded-t-sm" />
            <div className="w-1.5 h-5 bg-[#10b981]/50 rounded-t-sm" />
            <div className="w-1.5 h-7 bg-[#10b981]/80 rounded-t-sm" />
            <div className="w-1.5 h-9 bg-[#10b981] rounded-t-sm" />
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: Gauge Chart, Proveedores Breakdown & Mapa de Fuentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Widget 1: Circular Gauge Chart (Estilo AeuxGlobal) */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-[#073b4c] block mb-2">Confiabilidad de Stock</span>
          
          <div className="text-center my-3 relative">
            <div className="text-4xl font-extrabold text-[#073b4c]">72%</div>
            <span className="text-[10px] font-semibold text-[#64748b]">Desviación de precio 2%</span>
            
            {/* Circular Semi Gauge Visual */}
            <div className="w-32 h-16 border-t-8 border-l-8 border-r-8 border-[#10b981] border-b-0 rounded-t-full mx-auto mt-3 border-r-[#0d3836]" />
          </div>

          <button
            onClick={() => onNavigateTab('auditoria')}
            className="w-full py-2 bg-[#FAF9F5] hover:bg-[#073b4c]/5 text-[#073b4c] font-bold text-xs rounded-xl border border-[#073b4c]/10 transition-colors"
          >
            Ver Detalles de Auditoría
          </button>
        </div>

        {/* Widget 2: Aumentos por Proveedor */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#073b4c]">Distribución de Aumentos</span>
            <span className="text-[10px] text-[#64748b]">Septiembre</span>
          </div>

          <div className="text-3xl font-extrabold text-[#073b4c] mb-3">86%</div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#64748b]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Distribuidora El Sol
              </span>
              <span className="font-bold text-[#073b4c]">52%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#64748b]">
                <span className="w-2 h-2 rounded-full bg-[#118ab2]" /> Distribuidora Formosa Co.
              </span>
              <span className="font-bold text-[#073b4c]">22%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#64748b]">
                <span className="w-2 h-2 rounded-full bg-[#ffd166]" /> Bebidas La Formoseña
              </span>
              <span className="font-bold text-[#073b4c]">12%</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Fuentes Auditadas Formosa */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#073b4c]">Fuentes Auditadas</span>
            <span className="text-[10px] bg-[#10b981]/15 text-[#10b981] font-bold px-2 py-0.5 rounded-full">Formosa</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 bg-[#FAF9F5] rounded-xl border border-[#073b4c]/5 flex items-center justify-between">
              <span className="font-bold text-[#073b4c] truncate">Lista_El_Sol.csv</span>
              <span className="text-[10px] font-bold text-[#10b981]">Vigente</span>
            </div>
            <div className="p-2 bg-[#FAF9F5] rounded-xl border border-[#073b4c]/5 flex items-center justify-between">
              <span className="font-bold text-[#073b4c] truncate">Cuaderno_Ventas.csv</span>
              <span className="text-[10px] font-bold text-[#ef476f]">Anomalía</span>
            </div>
            <div className="p-2 bg-[#FAF9F5] rounded-xl border border-[#073b4c]/5 flex items-center justify-between">
              <span className="font-bold text-[#073b4c] truncate">WhatsApp_Nota.txt</span>
              <span className="text-[10px] font-bold text-[#118ab2]">Procesado</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('decisiones')}
            className="w-full mt-3 py-2 bg-[#0d3836] text-white font-bold text-xs rounded-xl hover:bg-[#184e4c] transition-colors"
          >
            Ver Alertas Prescriptivas
          </button>
        </div>

      </div>

      {/* BOTTOM ROW: Dark Banner & Green Hero Card (Idéntico a AeuxGlobal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Dark Contrast Card */}
        <div className="bg-[#0a2e2e] text-white p-5 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#10b981] font-bold text-lg shrink-0">
            76.2
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Impacto de Laya AI Engine</h4>
            <p className="text-[10px] text-white/70 mt-0.5">Desfasaje de precios en Harina 000 ajustado a tiempo en mostrador.</p>
          </div>
        </div>

        {/* Green Hero Community Banner (Estilo AeuxGlobal) */}
        <div className="md:col-span-2 bg-gradient-to-r from-[#0d3836] to-[#184e4c] text-white p-5 rounded-3xl shadow-sm relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 max-w-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10b981] block mb-1">
              AMIGA • Red Formoseña
            </span>
            <h3 className="text-base font-extrabold text-white leading-tight">
              230k+ Productos y Precios Auditados en Comercio Local
            </h3>
            <p className="text-[11px] text-white/80 mt-1">
              Transformando información dispersa en soberanía económica autónoma.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('chat')}
            className="shrink-0 relative z-10 w-11 h-11 bg-[#10b981] hover:bg-white hover:text-[#0d3836] text-[#0d3836] rounded-2xl flex items-center justify-center font-bold transition-all shadow-md"
          >
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>

      </div>

    </div>
  );
};
