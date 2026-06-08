import { useCatStore } from "@/store/catStore";
import KanbanColumn from "@/components/KanbanColumn";
import LocationMap from "@/components/LocationMap";
import EditCatModal from "@/components/EditCatModal";
import {
  Cat as CatIcon,
  PawPrint,
  Heart,
  Target,
  Scissors,
  RefreshCw,
  Plus,
  TreeDeciduous,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import AddCatModal from "@/components/AddCatModal";

export default function Home() {
  const cats = useCatStore((s) => s.cats);
  const editingCat = useCatStore((s) => s.editingCat);
  const setEditingCat = useCatStore((s) => s.setEditingCat);
  const resetToMock = useCatStore((s) => s.resetToMock);
  const addCat = useCatStore((s) => s.addCat);

  const [showAddModal, setShowAddModal] = useState(false);

  const toTrapCount = cats.filter((c) => c.status === "to_trap").length;
  const neuteredCount = cats.filter((c) => c.status === "neutered").length;
  const returnedCount = cats.filter((c) => c.status === "returned").length;
  const totalCount = cats.length;
  const processedCount = neuteredCount + returnedCount;
  const tnrRate =
    totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen cat-paw-pattern">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-500/15 via-sage-500/5 to-sky-500/10" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-warm-400/10 blur-3xl" />
        <div className="absolute -bottom-10 left-1/4 w-60 h-60 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute top-20 -left-10 w-60 h-60 rounded-full bg-sage-400/10 blur-3xl" />

        <div className="relative max-w-[1800px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warm-500 to-warm-600 flex items-center justify-center shadow-card">
                  <PawPrint size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center">
                  <TreeDeciduous
                    size={9}
                    className="text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div>
                <h1 className="font-serif font-bold text-3xl text-earth-800 tracking-tight leading-tight">
                  社区TNR管理看板
                </h1>
                <p className="text-sm text-earth-700/60 mt-1">
                  流浪猫诱捕 · 绝育 · 放归 全流程跟踪
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-earth-700/40">
                  <CatIcon size={12} strokeWidth={2} />
                  <span>Trap · Neuter · Return</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  icon={<Target size={15} strokeWidth={2.2} />}
                  label="待诱捕"
                  value={toTrapCount}
                  bg="bg-slate-500/10"
                  text="text-slate-700"
                  iconBg="bg-slate-500/15"
                  iconText="text-slate-600"
                />
                <StatCard
                  icon={<Scissors size={15} strokeWidth={2.2} />}
                  label="已绝育"
                  value={neuteredCount}
                  bg="bg-sage-500/10"
                  text="text-sage-700"
                  iconBg="bg-sage-500/15"
                  iconText="text-sage-600"
                />
                <StatCard
                  icon={<TreeDeciduous size={15} strokeWidth={2.2} />}
                  label="已放归"
                  value={returnedCount}
                  bg="bg-sky-500/10"
                  text="text-sky-700"
                  iconBg="bg-sky-500/15"
                  iconText="text-sky-600"
                />
                <StatCard
                  icon={<CheckCircle2 size={15} strokeWidth={2.2} />}
                  label="完成率"
                  value={`${tnrRate}%`}
                  bg="bg-warm-500/10"
                  text="text-warm-700"
                  iconBg="bg-warm-500/15"
                  iconText="text-warm-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-warm-500 hover:bg-warm-600 text-white text-sm font-semibold shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
                >
                  <Plus size={15} strokeWidth={2.5} />
                  添加猫咪
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "确定要恢复到初始示例数据吗？当前所有修改将丢失。",
                      )
                    ) {
                      resetToMock();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 hover:bg-white border border-cream-200 text-earth-700/70 hover:text-earth-800 text-sm font-medium transition-colors"
                  title="重置为示例数据"
                >
                  <RefreshCw size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1800px] mx-auto px-6 pb-10">
        <div className="relative lg:pr-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            <KanbanColumn status="to_trap" />
            <KanbanColumn status="neutered" />
            <KanbanColumn status="returned" />
          </div>

          <div className="hidden lg:block absolute top-0 right-0 w-[272px]">
            <div className="sticky top-6">
              <LocationMap />

              <div className="mt-4 glass-panel rounded-2xl p-4 shadow-card">
                <h3 className="font-serif font-bold text-earth-800 text-sm mb-3 flex items-center gap-1.5">
                  <PawPrint
                    size={14}
                    className="text-warm-500"
                    strokeWidth={2}
                  />
                  TNR流程说明
                </h3>
                <ol className="space-y-2 text-[12px] text-earth-700/70 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-500/20 text-slate-700 text-[10px] font-bold shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-slate-700">待诱捕</strong>
                      ：发现流浪猫，记录信息，准备诱捕
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sage-500/20 text-sage-700 text-[10px] font-bold shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-sage-700">已绝育</strong>
                      ：完成绝育手术，剪耳标，观察恢复
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/20 text-sky-700 text-[10px] font-bold shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-sky-700">已放归</strong>
                      ：放归原发现地，后续跟踪观察
                    </span>
                  </li>
                </ol>
                <div className="mt-3 pt-3 border-t border-cream-200/60 text-[11px] text-earth-700/50 leading-relaxed">
                  拖拽卡片可以在三步之间流转状态，相关日期会自动记录。
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-6">
          <LocationMap />
        </div>
      </main>

      {editingCat && (
        <EditCatModal cat={editingCat} onClose={() => setEditingCat(null)} />
      )}
      {showAddModal && (
        <AddCatModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            addCat(data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bg: string;
  text: string;
  iconBg: string;
  iconText: string;
}

function StatCard({
  icon,
  label,
  value,
  bg,
  text,
  iconBg,
  iconText,
}: StatCardProps) {
  return (
    <div className={`${bg} rounded-xl px-4 py-3 flex items-center gap-3`}>
      <div
        className={`w-8 h-8 rounded-lg ${iconBg} ${iconText} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div>
        <div className={`font-serif font-bold text-xl leading-none ${text}`}>
          {value}
        </div>
        <div className="text-[10px] text-earth-700/50 font-medium mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}
