import { useState } from "react";
import type { Cat, CatStatus } from "@/types/cat";
import { STATUS_LABEL } from "@/types/cat";
import { useCatStore } from "@/store/catStore";
import CatCard from "./CatCard";
import { Cat as CatIcon, Target, Scissors } from "lucide-react";

interface KanbanColumnProps {
  status: CatStatus;
}

export default function KanbanColumn({ status }: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const getCatsByStatus = useCatStore((s) => s.getCatsByStatus);
  const updateCatStatus = useCatStore((s) => s.updateCatStatus);
  const cats = getCatsByStatus(status);

  const isToTrap = status === "to_trap";
  const Icon = isToTrap ? Target : Scissors;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const catId = e.dataTransfer.getData("text/plain");
    if (catId) {
      updateCatStatus(catId, status);
    }
  };

  const headerBg = isToTrap
    ? "bg-gradient-to-r from-slate-500/10 to-slate-400/5 border-slate-400/20"
    : "bg-gradient-to-r from-sage-500/15 to-sage-400/5 border-sage-400/20";
  const headerText = isToTrap ? "text-slate-700" : "text-sage-700";
  const iconBg = isToTrap
    ? "bg-slate-500/15 text-slate-600"
    : "bg-sage-500/15 text-sage-600";

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col min-h-[500px] rounded-2xl overflow-hidden transition-all duration-300
        ${isOver ? "drop-highlight" : "bg-cream-50/60 border border-cream-200/80"}`}
    >
      <div
        className={`px-5 py-4 border-b ${headerBg} flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}
          >
            <Icon size={18} strokeWidth={2} />
          </div>
          <div>
            <h2 className={`font-serif font-bold text-lg ${headerText}`}>
              {STATUS_LABEL[status]}
            </h2>
            <p className="text-[11px] text-earth-700/40 font-medium">
              共 {cats.length} 只猫咪
            </p>
          </div>
        </div>
        <div
          className={`text-2xl font-serif font-bold ${headerText} opacity-40`}
        >
          {cats.length}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        {cats.length === 0 ? (
          <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-earth-700/30">
            <CatIcon size={40} strokeWidth={1.2} className="mb-3 opacity-50" />
            <p className="text-sm font-medium">
              暂无{STATUS_LABEL[status]}的猫咪
            </p>
            <p className="text-xs mt-1 opacity-60">将猫咪卡片拖拽到此区域</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
            {cats.map((cat, i) => (
              <CatCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
