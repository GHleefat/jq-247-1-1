import { useEffect, useState } from "react";
import type { Cat, CatFormData, CatGender } from "@/types/cat";
import { FUR_COLOR_OPTIONS, GENDER_LABEL } from "@/types/cat";
import { useCatStore } from "@/store/catStore";
import {
  X,
  Cat as CatIcon,
  Save,
  MapPin,
  TreeDeciduous,
  Scissors,
} from "lucide-react";

interface EditCatModalProps {
  cat: Cat;
  onClose: () => void;
}

export default function EditCatModal({ cat, onClose }: EditCatModalProps) {
  const updateCat = useCatStore((s) => s.updateCat);
  const deleteCat = useCatStore((s) => s.deleteCat);

  const [formData, setFormData] = useState<CatFormData>({
    name: cat.name,
    photoUrl: cat.photoUrl,
    furColor: cat.furColor,
    gender: cat.gender,
    neuterDate: cat.neuterDate || "",
    returnDate: cat.returnDate || "",
    note: cat.note || "",
    locationName: cat.location.name,
  });
  const [imgPreviewError, setImgPreviewError] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCat(cat.id, formData);
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`确定要删除「${cat.name}」的记录吗？此操作不可恢复。`)) {
      deleteCat(cat.id);
      onClose();
    }
  };

  const updateField = <K extends keyof CatFormData>(
    key: K,
    value: CatFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "photoUrl") setImgPreviewError(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in-up"
      >
        <div className="px-5 py-4 border-b border-cream-200/80 flex items-center justify-between bg-gradient-to-r from-cream-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-warm-500/15 text-warm-600 flex items-center justify-center">
              <CatIcon size={18} strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-earth-800 text-lg">
                编辑猫咪信息
              </h2>
              <p className="text-[11px] text-earth-700/50">
                修改后数据将自动保存
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-cream-200/60 flex items-center justify-center text-earth-700/60 hover:text-earth-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin"
        >
          <div>
            <label className="block text-xs font-semibold text-earth-700 mb-1.5">
              猫咪名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 placeholder-earth-700/30 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              placeholder="例如：大橘"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-earth-700 mb-1.5">
              照片URL
            </label>
            <input
              type="url"
              value={formData.photoUrl}
              onChange={(e) => updateField("photoUrl", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 placeholder-earth-700/30 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              placeholder="https://..."
            />
            {formData.photoUrl && !imgPreviewError && (
              <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-cream-200">
                <img
                  src={formData.photoUrl}
                  alt="预览"
                  onError={() => setImgPreviewError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-earth-700 mb-1.5">
                毛色
              </label>
              <select
                value={formData.furColor}
                onChange={(e) => updateField("furColor", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              >
                {FUR_COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-earth-700 mb-1.5">
                性别
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["male", "female", "unknown"] as CatGender[]).map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => updateField("gender", g)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                      formData.gender === g
                        ? g === "male"
                          ? "bg-sky-500 text-white shadow-soft"
                          : g === "female"
                            ? "bg-pink-500 text-white shadow-soft"
                            : "bg-slate-500 text-white shadow-soft"
                        : "bg-cream-100 text-earth-700/70 hover:bg-cream-200"
                    }`}
                  >
                    {GENDER_LABEL[g]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-earth-700 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <Scissors size={11} strokeWidth={2} />
                  绝育日期
                </span>
              </label>
              <input
                type="date"
                value={formData.neuterDate || ""}
                onChange={(e) => updateField("neuterDate", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              />
              {formData.neuterDate && (
                <button
                  type="button"
                  onClick={() => updateField("neuterDate", "")}
                  className="mt-1.5 text-[11px] text-earth-700/50 hover:text-warm-600 underline underline-offset-2"
                >
                  清除
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-earth-700 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <TreeDeciduous size={11} strokeWidth={2} />
                  放归日期
                </span>
              </label>
              <input
                type="date"
                value={formData.returnDate || ""}
                onChange={(e) => updateField("returnDate", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              />
              {formData.returnDate && (
                <button
                  type="button"
                  onClick={() => updateField("returnDate", "")}
                  className="mt-1.5 text-[11px] text-earth-700/50 hover:text-warm-600 underline underline-offset-2"
                >
                  清除
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-earth-700 mb-1.5">
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} strokeWidth={2} />
                发现位置
              </span>
            </label>
            <input
              type="text"
              value={formData.locationName}
              onChange={(e) => updateField("locationName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 placeholder-earth-700/30 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm"
              placeholder="例如：社区东门花坛"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-earth-700 mb-1.5">
              备注
            </label>
            <textarea
              value={formData.note || ""}
              onChange={(e) => updateField("note", e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-earth-800 placeholder-earth-700/30 focus:outline-none focus:ring-2 focus:ring-warm-500/30 focus:border-warm-500/50 transition-all text-sm resize-none"
              placeholder="性格特征、健康状况、出现时间等..."
            />
          </div>
        </form>

        <div className="px-5 py-4 border-t border-cream-200/80 bg-cream-50/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            删除记录
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-earth-700/70 hover:bg-cream-200/60 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-warm-500 hover:bg-warm-600 text-white shadow-soft hover:shadow-card transition-all"
            >
              <Save size={14} strokeWidth={2.2} />
              保存修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
