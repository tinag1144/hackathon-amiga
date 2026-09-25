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
    <div className="space-y-6 sm:space-y-7 pb-24 sm:pb-16 select-none">
      
      {/* Header Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#073b4c]/8 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#073b4c] tracking-tight">Dashboard General</h1>
          <p className="text-xs text-[#64748b] mt-0.5">Panorama comercial en tiempo real y auditoría inteligente del negocio</p>
        </div>

        <button
          onClick={() => onNavigateTab('ingesta')}
          className="self-start sm:self-auto px-4 py-2 bg-[#0d3836] hover:bg-[#184e4c] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4 text-[#10b981]" />
          <span>+ Cargar Archivo</span>
        </button>
      </div>

      {/* TOP ROW: 3 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748b] block">Margen Promedio</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#073b4c]">28.4%</div>
            <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2.3% vs. mes anterior
            </span>
          </div>

          <div className="flex items-end gap-1.5 h-10 shrink-0">
            <div className="w-2 h-4 bg-[#10b981]/30 rounded-t-sm" />
            <div className="w-2 h-6 bg-[#10b981]/50 rounded-t-sm" />
            <div className="w-2 h-5 bg-[#10b981]/40 rounded-t-sm" />
            <div className="w-2 h-8 bg-[#10b981] rounded-t-sm" />
            <div className="w-2 h-10 bg-[#10b981] rounded-t-sm" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748b] block">Confiabilidad de Datos</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#073b4c]">94.5%</div>
            <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {assets.length} fuentes validadas
            </span>
          </div>

          <div className="flex items-end gap-1.5 h-10 shrink-0">
            <div className="w-2 h-7 bg-[#ef476f] rounded-t-sm" />
            <div className="w-2 h-4 bg-[#ef476f]/40 rounded-t-sm" />
            <div className="w-2 h-8 bg-[#10b981]" />
            <div className="w-2 h-10 bg-[#10b981]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl border border-[#073b4c]/8 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748b] block">Impacto Recobrado</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#073b4c]">$34,000</div>
            <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> {decisions.length} alertas prescriptivas
            </span>
          </div>

          <div className="flex items-end gap-1.5 h-10 shrink-0">
            <div className="w-2 h-4 bg-[#10b981]/30 rounded-t-sm" />
            <div className="w-2 h-6 bg-[#10b981]/50 rounded-t-sm" />
            <div className="w-2 h-8 bg-[#10b981]/80 rounded-t-sm" />
            <div className="w-2 h-10 bg-[#10b981] rounded-t-sm" />
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: Gauge Chart & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Gauge Widget */}
        <div className="bg-white p-6 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-sm font-extrabold text-[#073b4c] block">Eficiencia Operativa</span>
            <span className="text-xs text-[#64748b] block mt-0.5">Control de descalce de precios</span>
          </div>
          
          <div className="text-center my-4">
            <div className="text-4xl font-extrabold text-[#073b4c]">72%</div>
            <span className="text-xs font-semibold text-[#10b981] block mt-1">Saludable (+2% margen)</span>
            
            {/* Gauge Semi Circle */}
            <div className="w-36 h-18 border-t-[10px] border-l-[10px] border-r-[10px] border-[#10b981] border-b-0 rounded-t-full mx-auto mt-4 border-r-[#0d3836]" />
          </div>

          <button
            onClick={() => onNavigateTab('auditoria')}
            className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#073b4c]/5 text-[#073b4c] font-bold text-xs rounded-xl border border-[#073b4c]/10 transition-colors"
          >
            Ver Reporte de Auditoría
          </button>
        </div>

        {/* Proveedores Widget */}
        <div className="bg-white p-6 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#073b4c]">Aumentos por Proveedor</span>
              <span className="text-xs text-[#64748b]">Mes Actual</span>
            </div>
            <div className="text-3xl font-extrabold text-[#073b4c] mt-2 mb-4">86%</div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-[#073b4c] mb-1">
                <span>Distribuidora El Sol</span>
                <span>52%</span>
              </div>
              <div className="w-full h-2 bg-[#f2f5f4] rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981] rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#073b4c] mb-1">
                <span>Distribuidora Formosa Co.</span>
                <span>22%</span>
              </div>
              <div className="w-full h-2 bg-[#f2f5f4] rounded-full overflow-hidden">
                <div className="h-full bg-[#118ab2] rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#073b4c] mb-1">
                <span>Bebidas La Formoseña</span>
                <span>12%</span>
              </div>
              <div className="w-full h-2 bg-[#f2f5f4] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffd166] rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Fuentes Auditadas Widget */}
        <div className="bg-white p-6 rounded-3xl border border-[#073b4c]/8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-extrabold text-[#073b4c]">Fuentes Auditadas</span>
              <span className="text-[10px] bg-[#10b981]/15 text-[#10b981] font-bold px-2.5 py-0.5 rounded-full">En Vivo</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#FAF9F5] rounded-2xl border border-[#073b4c]/5 flex items-center justify-between">
                <span className="font-bold text-[#073b4c] truncate">Lista_El_Sol.csv</span>
                <span className="text-[10px] font-extrabold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-lg">Vigente</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-2xl border border-[#073b4c]/5 flex items-center justify-between">
                <span className="font-bold text-[#073b4c] truncate">Cuaderno_Ventas.csv</span>
                <span className="text-[10px] font-extrabold text-[#ef476f] bg-[#ef476f]/10 px-2 py-0.5 rounded-lg">Anomalía</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-2xl border border-[#073b4c]/5 flex items-center justify-between">
                <span className="font-bold text-[#073b4c] truncate">WhatsApp_Nota.txt</span>
                <span className="text-[10px] font-extrabold text-[#118ab2] bg-[#118ab2]/10 px-2 py-0.5 rounded-lg">Procesado</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('decisiones')}
            className="w-full mt-4 py-2.5 bg-[#0d3836] text-white font-bold text-xs rounded-xl hover:bg-[#184e4c] transition-colors shadow-sm"
          >
            Ver Alertas Prescriptivas
          </button>
        </div>

      </div>

      {/* BOTTOM ROW: Dark Contrast Card & Green Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Dark Contrast Card */}
        <div className="bg-[#0a2e2e] text-white p-6 rounded-3xl shadow-md flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-white/10 flex items-center justify-center text-[#10b981] font-extrabold text-xl shrink-0 border border-white/10">
            76.2
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Impacto Laya AI Engine</h4>
            <p className="text-xs text-white/75 mt-1 leading-relaxed">Ajuste inmediato de margen bruto aplicado a la Harina 000 en mostrador.</p>
          </div>
        </div>

        {/* Green Hero Community Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#0d3836] via-[#124542] to-[#184e4c] text-white p-6 rounded-3xl shadow-md flex items-center justify-between gap-4">
          <div className="space-y-1 max-w-md">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10b981] block">
              AMIGA • Red Formoseña
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
              230,000+ Productos y Precios Auditados en Comercios Locales
            </h3>
            <p className="text-xs text-white/80">
              Transformando información dispersa en soberanía económica autónoma.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('chat')}
            className="shrink-0 w-12 h-12 bg-[#10b981] hover:bg-white hover:text-[#0d3836] text-[#0d3836] rounded-2xl flex items-center justify-center font-bold transition-all shadow-lg"
          >
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>

      </div>

    </div>
  );
};
