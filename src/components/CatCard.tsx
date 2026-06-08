import { useState } from "react";
import { Cat, GENDER_LABEL } from "@/types/cat";
import { useCatStore } from "@/store/catStore";
import {
  Cat as CatIcon,
  Mars,
  Venus,
  HelpCircle,
  Calendar,
  MapPin,
  Pencil,
  GripVertical,
} from "lucide-react";

interface CatCardProps {
  cat: Cat;
  index: number;
}

export default function CatCard({ cat, index }: CatCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const setEditingCat = useCatStore((s) => s.setEditingCat);

  const GenderIcon =
    cat.gender === "male" ? Mars : cat.gender === "female" ? Venus : HelpCircle;
  const genderColor =
    cat.gender === "male"
      ? "text-sky-600 bg-sky-50"
      : cat.gender === "female"
        ? "text-pink-600 bg-pink-50"
        : "text-slate-muted bg-slate-100";

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", cat.id);
    const target = e.currentTarget;
    target.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const target = e.currentTarget;
    target.style.opacity = "1";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ animationDelay: `${index * 60}ms` }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-grab active:cursor-grabbing
        ${isDragging ? "rotate-2 scale-95 opacity-50" : "hover:-translate-y-1"}
        animate-fade-in-up`}
    >
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/90 backdrop-blur rounded-full p-1 shadow-soft">
          <GripVertical size={14} className="text-earth-700/60" />
        </div>
      </div>

      <button
        onClick={() => setEditingCat(cat)}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all bg-warm-500 hover:bg-warm-600 text-white rounded-full p-1.5 shadow-soft hover:scale-110"
        title="编辑信息"
      >
        <Pencil size={13} />
      </button>

      <div className="relative aspect-[4/3] bg-cream-100 overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-warm-500">
            <CatIcon size={36} strokeWidth={1.5} />
            <span className="text-xs mt-1 text-earth-700/50">{cat.name}</span>
          </div>
        ) : (
          <img
            src={cat.photoUrl}
            alt={cat.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {cat.status === "neutered" && (
          <div className="absolute bottom-2 left-2 bg-sage-500 text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-soft">
            <CatIcon size={11} strokeWidth={2.5} />
            已绝育
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-semibold text-earth-800 text-base leading-none">
            {cat.name}
          </h3>
          <div
            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-medium ${genderColor}`}
          >
            <GenderIcon size={11} strokeWidth={2.5} />
            {GENDER_LABEL[cat.gender]}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center text-[11px] bg-cream-100 text-earth-700 px-2 py-0.5 rounded-full font-medium">
            {cat.furColor}
          </span>
          {cat.neuterDate && (
            <span className="inline-flex items-center gap-0.5 text-[11px] bg-sage-50 text-sage-600 px-2 py-0.5 rounded-full font-medium">
              <Calendar size={10} strokeWidth={2.5} />
              {cat.neuterDate}
            </span>
          )}
        </div>

        <div className="flex items-start gap-1 pt-0.5 text-[11px] text-earth-700/60">
          <MapPin size={11} strokeWidth={2} className="mt-0.5 shrink-0" />
          <span className="line-clamp-1">{cat.location.name}</span>
        </div>

        {cat.note && (
          <p className="text-[11px] text-earth-700/50 line-clamp-2 leading-relaxed pt-0.5 border-t border-cream-200/60">
            {cat.note}
          </p>
        )}
      </div>
    </div>
  );
}
