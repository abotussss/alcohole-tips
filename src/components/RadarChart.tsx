import type { RadarMetric } from "@/data/catalog";

type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";

type Props = {
  metrics: RadarMetric[];
  accent: Accent;
  compact?: boolean;
};

const accentMap: Record<Accent, { fill: string; stroke: string }> = {
  amber: { fill: "rgba(211, 122, 48, 0.22)", stroke: "#9f5420" },
  ruby: { fill: "rgba(128, 41, 56, 0.22)", stroke: "#7c2630" },
  forest: { fill: "rgba(58, 109, 86, 0.22)", stroke: "#305646" },
  sunset: { fill: "rgba(168, 73, 46, 0.22)", stroke: "#7b2f1f" },
  plum: { fill: "rgba(97, 69, 102, 0.22)", stroke: "#5c3e61" },
};

export function RadarChart({ metrics, accent, compact = false }: Props) {
  const size = compact ? 190 : 240;
  const center = size / 2;
  const radius = compact ? 58 : 78;
  const levels = 5;
  const palette = accentMap[accent];

  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / metrics.length;
    const scaled = (value / levels) * radius;
    const x = center + Math.cos(angle) * scaled;
    const y = center + Math.sin(angle) * scaled;
    return `${x},${y}`;
  };

  const labelPoint = (index: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / metrics.length;
    const scaled = radius + (compact ? 22 : 30);
    const x = center + Math.cos(angle) * scaled;
    const y = center + Math.sin(angle) * scaled;
    return { x, y };
  };

  const polygonPoints = metrics.map((metric, index) => point(index, metric.value)).join(" ");

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="味の特徴を示すレーダーチャート"
        className="mx-auto h-auto w-full max-w-[240px]"
      >
        {Array.from({ length: levels }).map((_, levelIndex) => {
          const scale = (levelIndex + 1) / levels;
          const ringPoints = metrics
            .map((_, index) => point(index, scale * levels))
            .join(" ");

          return (
            <polygon
              key={scale}
              points={ringPoints}
              fill="none"
              stroke="rgba(58, 43, 35, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {metrics.map((_, index) => (
          <line
            key={`axis-${index}`}
            x1={center}
            y1={center}
            x2={Number(point(index, levels).split(",")[0])}
            y2={Number(point(index, levels).split(",")[1])}
            stroke="rgba(58, 43, 35, 0.14)"
            strokeWidth="1"
          />
        ))}

        <polygon points={polygonPoints} fill={palette.fill} stroke={palette.stroke} strokeWidth="2.5" />

        {metrics.map((metric, index) => {
          const [x, y] = point(index, metric.value).split(",").map(Number);
          return <circle key={metric.label} cx={x} cy={y} r="4" fill={palette.stroke} />;
        })}

        {metrics.map((metric, index) => {
          const { x, y } = labelPoint(index);
          return (
            <text
              key={`label-${metric.label}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={compact ? 10 : 12}
              fontWeight="700"
              fill="#51433a"
            >
              {metric.label}
            </text>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-stone-50 px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone-400">
              {metric.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-900">{metric.value.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
