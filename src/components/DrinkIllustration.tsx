import Image from "next/image";
import type { CategorySlug } from "@/data/catalog";

type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";

type Props = {
  kind: CategorySlug;
  title: string;
  accent: Accent;
  idBase: string;
};

const accentFrameMap: Record<Accent, { frame: string; surface: string; glow: string }> = {
  amber: { frame: "#2f211d", surface: "#ead5a0", glow: "#f5e8bc" },
  ruby: { frame: "#3c1616", surface: "#c94e3d", glow: "#e28a79" },
  forest: { frame: "#1f2b25", surface: "#9eb79f", glow: "#dce8da" },
  sunset: { frame: "#3a2018", surface: "#d58b56", glow: "#f0c095" },
  plum: { frame: "#34253a", surface: "#b59abb", glow: "#e5d8ea" },
};

const fallbackLabels: Record<CategorySlug, string> = {
  sake: "日本酒",
  wine: "ワイン",
  beer: "ビール",
  shochu: "焼酎",
  umeshu: "梅酒",
};

function hashValue(value: string) {
  return [...value].reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);
}

function getSakeFrame(title: string) {
  if (/獺祭|十四代|花陽浴/.test(title)) {
    return { frame: "#2a1d18", surface: "#e7c968", glow: "#f5e7ad" };
  }

  if (/新政|No\.6|仙禽/.test(title)) {
    return { frame: "#1f2620", surface: "#cad2a9", glow: "#e9edd6" };
  }

  if (/黒龍|久保田|八海山|真澄/.test(title)) {
    return { frame: "#252220", surface: "#d7d2c7", glow: "#efebe2" };
  }

  if (/天狗舞|酔鯨|鍋島|田酒/.test(title)) {
    return { frame: "#2d1f1a", surface: "#d8bb95", glow: "#f0ddc7" };
  }

  return { frame: "#2e201d", surface: "#e5ca79", glow: "#f4e6b0" };
}

function getWineFrame(title: string) {
  if (/Chardonnay|Sauvignon|Riesling|甲州|Pinot Gris|Albarino/i.test(title)) {
    return { frame: "#401817", surface: "#c94939", glow: "#dd7768" };
  }

  if (/Rose|ロゼ/i.test(title)) {
    return { frame: "#4a2028", surface: "#d06473", glow: "#e6a0a9" };
  }

  if (/Orange|オレンジ/i.test(title)) {
    return { frame: "#542818", surface: "#cc6b34", glow: "#efae7f" };
  }

  if (/Natural|自然派/i.test(title)) {
    return { frame: "#32211d", surface: "#a14d3f", glow: "#d08d7e" };
  }

  return { frame: "#3b1716", surface: "#c94939", glow: "#dc7a6d" };
}

function getHeroSource(kind: CategorySlug) {
  if (kind === "sake") {
    return "/images/Gemini_Generated_Image_4d44lw4d44lw4d44.png";
  }

  if (kind === "wine") {
    return "/images/Gemini_Generated_Image_hn15v6hn15v6hn15.png";
  }

  return "";
}

function getHeroFrame(kind: CategorySlug, title: string, accent: Accent) {
  if (kind === "sake") {
    return getSakeFrame(title);
  }

  if (kind === "wine") {
    return getWineFrame(title);
  }

  return accentFrameMap[accent];
}

function FallbackIllustration({
  title,
  accent,
  kind,
  idBase,
}: {
  title: string;
  accent: Accent;
  kind: CategorySlug;
  idBase: string;
}) {
  const palette = accentFrameMap[accent];
  const hash = hashValue(title);
  const gradientId = `${idBase}-fallback-gradient`;
  const circleX = 110 + (hash % 280);
  const circleY = 70 + (hash % 110);

  return (
    <svg viewBox="0 0 520 380" role="img" aria-label={title} className="h-full w-full">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.surface} />
          <stop offset="100%" stopColor={palette.glow} />
        </linearGradient>
      </defs>
      <rect width="520" height="380" rx="30" fill="#f7f0e7" />
      <circle cx={circleX} cy={circleY} r="110" fill={`url(#${gradientId})`} opacity="0.5" />
      <circle cx="392" cy="272" r="84" fill={palette.glow} opacity="0.32" />
      <rect x="84" y="110" width="352" height="160" rx="28" fill={palette.frame} opacity="0.92" />
      <text
        x="260"
        y="188"
        textAnchor="middle"
        fill="#f8f0e4"
        fontSize="28"
        fontWeight="700"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {fallbackLabels[kind]}
      </text>
      <text
        x="260"
        y="226"
        textAnchor="middle"
        fill="#f8f0e4"
        fontSize="18"
        fontWeight="600"
      >
        {title}
      </text>
    </svg>
  );
}

export function DrinkIllustration({ kind, title, accent, idBase }: Props) {
  const heroSource = getHeroSource(kind);

  if (!heroSource) {
    return <FallbackIllustration title={title} accent={accent} kind={kind} idBase={idBase} />;
  }

  const frame = getHeroFrame(kind, title, accent);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[inherit]"
      aria-label={title}
      role="img"
      style={{
        background: `radial-gradient(circle at 50% 28%, ${frame.glow} 0%, ${frame.surface} 58%, ${frame.frame} 100%)`,
      }}
    >
      <div
        className="absolute inset-[4%] rounded-[1.35rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]"
        style={{ backgroundColor: frame.frame }}
      />
      <div
        className="absolute inset-x-[6.5%] inset-y-[6.5%] overflow-hidden rounded-[1.15rem]"
        style={{ backgroundColor: frame.surface }}
      >
        <Image
          src={heroSource}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              kind === "sake"
                ? `linear-gradient(180deg, ${frame.surface}22 0%, transparent 28%, transparent 72%, ${frame.frame}18 100%)`
                : `linear-gradient(180deg, ${frame.surface}10 0%, transparent 34%, transparent 68%, ${frame.frame}20 100%)`,
            mixBlendMode: "multiply",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/34 via-black/8 to-transparent" />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-stone-700 shadow-sm backdrop-blur-sm sm:text-[11px]">
            {fallbackLabels[kind]}
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <div className="rounded-xl bg-white/20 px-3 py-2 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md">
            <p className="truncate text-[0.72rem] font-semibold tracking-[0.08em] text-white/80 sm:text-xs">
              {kind === "sake" ? "BRAND PROFILE" : "VARIETY PROFILE"}
            </p>
            <p className="truncate text-sm font-semibold tracking-tight sm:text-base">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
