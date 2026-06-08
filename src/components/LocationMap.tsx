import { useState } from "react";
import { useCatStore } from "@/store/catStore";
import type { Cat } from "@/types/cat";
import { MapPin, X } from "lucide-react";

export default function LocationMap() {
  const cats = useCatStore((s) => s.cats);
  const [activeCat, setActiveCat] = useState<Cat | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedCats = [...cats].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (isExpanded) {
    return (
      <div className="glass-panel rounded-2xl shadow-card overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-cream-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warm-500/15 text-warm-600 flex items-center justify-center">
              <MapPin size={16} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-earth-800 text-sm">
                社区猫咪发现位置
              </h3>
              <p className="text-[11px] text-earth-700/50">
                共 {cats.length} 个标记点
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="w-8 h-8 rounded-lg hover:bg-cream-200/60 flex items-center justify-center text-earth-700/60 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative bg-gradient-to-br from-cream-50 to-cream-100 p-3">
          <svg viewBox="0 0 100 100" className="w-full h-[380px]">
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="#FDEBD6"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            <g opacity="0.35">
              <rect
                x="12"
                y="15"
                width="14"
                height="18"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="32"
                y="10"
                width="12"
                height="14"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="50"
                y="18"
                width="16"
                height="20"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="72"
                y="12"
                width="14"
                height="16"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="10"
                y="45"
                width="18"
                height="14"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="35"
                y="50"
                width="20"
                height="16"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="62"
                y="48"
                width="14"
                height="18"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="15"
                y="72"
                width="22"
                height="14"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="45"
                y="75"
                width="16"
                height="12"
                rx="2"
                fill="#D6D3D1"
              />
              <rect
                x="68"
                y="72"
                width="20"
                height="16"
                rx="2"
                fill="#D6D3D1"
              />
              <text
                x="19"
                y="26"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                1号楼
              </text>
              <text
                x="38"
                y="19"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                2号楼
              </text>
              <text
                x="58"
                y="30"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                3号楼
              </text>
              <text
                x="79"
                y="22"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                5号楼
              </text>
              <text
                x="19"
                y="54"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                4号楼
              </text>
              <text
                x="45"
                y="60"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                6号楼
              </text>
              <text
                x="69"
                y="59"
                textAnchor="middle"
                fontSize="3"
                fill="#78716C"
                fontWeight="500"
              >
                7号楼
              </text>
            </g>

            <ellipse
              cx="50"
              cy="40"
              rx="12"
              ry="8"
              fill="#86EFAC"
              opacity="0.35"
            />
            <text
              x="50"
              y="42"
              textAnchor="middle"
              fontSize="2.8"
              fill="#16A34A"
              fontWeight="600"
              opacity="0.7"
            >
              中心花园
            </text>

            <line
              x1="5"
              y1="38"
              x2="95"
              y2="38"
              stroke="#FED7AA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="#FED7AA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {sortedCats.map((cat) => {
              const isNeutered = cat.status === "neutered";
              const isActive = activeCat?.id === cat.id;
              const color = isNeutered ? "#22C55E" : "#F97316";

              return (
                <g
                  key={cat.id}
                  transform={`translate(${cat.location.x}, ${cat.location.y})`}
                  onClick={() => setActiveCat(isActive ? null : cat)}
                  className="cursor-pointer"
                >
                  <circle
                    r={isActive ? 5.5 : 4}
                    fill={color}
                    opacity="0.2"
                    className="animate-pulse-slow"
                  />
                  <g transform="scale(0.22) translate(-12, -12)">
                    <path
                      d="M12 2 C12 2 8 0 5 3 C2 6 2 10 5 13 L12 20 L19 13 C22 10 22 6 19 3 C16 0 12 2 12 2 Z"
                      fill={color}
                      stroke="white"
                      strokeWidth="1.2"
                    />
                    <circle cx="8" cy="8" r="1.8" fill="white" opacity="0.85" />
                    <circle
                      cx="16"
                      cy="8"
                      r="1.8"
                      fill="white"
                      opacity="0.85"
                    />
                    <path
                      d="M9 13 Q12 16 15 13"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>
                  {isActive && (
                    <g transform="translate(0, -10)">
                      <rect
                        x="-18"
                        y="-12"
                        width="36"
                        height="9"
                        rx="2"
                        fill="white"
                        stroke={color}
                        strokeWidth="0.5"
                      />
                      <text
                        textAnchor="middle"
                        y="-6"
                        fontSize="3"
                        fill="#3F2A1D"
                        fontWeight="600"
                      >
                        {cat.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 flex gap-3 text-[11px] bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 shadow-soft">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-warm-500" />
              <span className="text-earth-700/70">待诱捕</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sage-500" />
              <span className="text-earth-700/70">已绝育</span>
            </div>
          </div>
        </div>

        {activeCat && (
          <div className="px-4 py-3 border-t border-cream-200/60 bg-white/60 animate-fade-in">
            <div className="flex items-start gap-3">
              <img
                src={activeCat.photoUrl}
                alt={activeCat.name}
                className="w-12 h-12 rounded-xl object-cover shadow-soft"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-earth-800">
                    {activeCat.name}
                  </h4>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      activeCat.status === "neutered"
                        ? "bg-sage-100 text-sage-600"
                        : "bg-warm-100 text-warm-600"
                    }`}
                  >
                    {activeCat.status === "neutered" ? "已绝育" : "待诱捕"}
                  </span>
                </div>
                <p className="text-[11px] text-earth-700/60 mt-0.5 flex items-center gap-1">
                  <MapPin size={10} strokeWidth={2} />
                  {activeCat.location.name}
                </p>
                {activeCat.note && (
                  <p className="text-[11px] text-earth-700/50 mt-1 line-clamp-2">
                    {activeCat.note}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-2 border-t border-cream-200/60">
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full py-1.5 text-xs text-earth-700/60 hover:text-earth-700 font-medium transition-colors"
          >
            收起地图
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsExpanded(true)}
      className="glass-panel rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-hover transition-all duration-300 group animate-fade-in"
    >
      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#FEFAF3" />
          <rect
            x="12"
            y="15"
            width="14"
            height="18"
            rx="2"
            fill="#D6D3D1"
            opacity="0.5"
          />
          <rect
            x="50"
            y="18"
            width="16"
            height="20"
            rx="2"
            fill="#D6D3D1"
            opacity="0.5"
          />
          <rect
            x="15"
            y="60"
            width="22"
            height="14"
            rx="2"
            fill="#D6D3D1"
            opacity="0.5"
          />
          <rect
            x="68"
            y="60"
            width="20"
            height="16"
            rx="2"
            fill="#D6D3D1"
            opacity="0.5"
          />
          <ellipse
            cx="50"
            cy="45"
            rx="10"
            ry="7"
            fill="#86EFAC"
            opacity="0.4"
          />
          {sortedCats.slice(0, 5).map((cat, i) => {
            const isNeutered = cat.status === "neutered";
            const color = isNeutered ? "#22C55E" : "#F97316";
            return (
              <g
                key={cat.id}
                transform={`translate(${cat.location.x}, ${cat.location.y})`}
              >
                <circle r={4} fill={color} opacity="0.25">
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r={2} fill={color} />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="text-left">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-warm-500" strokeWidth={2.2} />
          <span className="font-serif font-bold text-earth-800 text-sm">
            发现位置地图
          </span>
        </div>
        <p className="text-[11px] text-earth-700/50 mt-0.5">
          {cats.length} 个标记点 · 点击展开
        </p>
      </div>
    </button>
  );
}
