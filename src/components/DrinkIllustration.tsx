import Image from "next/image";
import type { CategorySlug } from "@/data/catalog";

type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";

type Props = {
  kind: CategorySlug;
  title: string;
  accent: Accent;
  idBase: string;
  themeKey?: string;
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

function getDynamicSakeFrame(seed: string) {
  const hash = hashValue(seed);
  const palette = [
    { frame: "#2e201d", surface: "#e4c870", glow: "#f5e8b7" },
    { frame: "#2d231f", surface: "#d8c7a6", glow: "#efe7d5" },
    { frame: "#2c221d", surface: "#d9b48f", glow: "#f0d8c1" },
    { frame: "#2a2421", surface: "#cfc6bb", glow: "#ece6df" },
    { frame: "#2c241f", surface: "#cbbd8f", glow: "#ebe1be" },
    { frame: "#2f211d", surface: "#d8b97a", glow: "#f1deb0" },
    { frame: "#2c211d", surface: "#d2a98b", glow: "#edd0bf" },
  ];

  return palette[hash % palette.length];
}

function getSakeFrame(title: string, themeKey = "") {
  if (/獺祭|十四代|花陽浴/.test(title)) {
    return { frame: "#2a1d18", surface: "#e7c968", glow: "#f5e7ad" };
  }

  if (/新政|No\.6|陽乃鳥|亜麻猫|天蛙|ヴィリジアン/.test(title)) {
    return { frame: "#1e2821", surface: "#bccb9a", glow: "#e3ebcf" };
  }

  if (/黒龍|九頭龍/.test(title)) {
    return { frame: "#171516", surface: "#cfcfd1", glow: "#ececef" };
  }

  if (/久保田|八海山/.test(title)) {
    return { frame: "#222325", surface: "#d9d9df", glow: "#f0f1f5" };
  }

  if (/真澄|伯楽星|出羽桜|南部美人/.test(title)) {
    return { frame: "#2a2422", surface: "#d8d0c5", glow: "#f0e8dd" };
  }

  if (/天狗舞|酔鯨|鍋島|田酒|飛露喜|日置桜/.test(title)) {
    return { frame: "#2d1f1a", surface: "#d4ad87", glow: "#efd3b6" };
  }

  if (/作|醸し人九平次|仙禽|寒菊|鳳凰美田/.test(title)) {
    return { frame: "#212322", surface: "#cfc6b6", glow: "#ece4d8" };
  }

  if (themeKey.startsWith("sake-prefecture-")) {
    return getDynamicSakeFrame(themeKey);
  }

  return { frame: "#2e201d", surface: "#e5ca79", glow: "#f4e6b0" };
}

function getWineFrame(title: string, themeKey = "") {
  const styleKey = themeKey.replace("wine-style-", "");

  if (styleKey === "white") {
    return { frame: "#72653f", surface: "#ead89f", glow: "#fbf1d1" };
  }

  if (styleKey === "red") {
    return { frame: "#401216", surface: "#9a3138", glow: "#df8790" };
  }

  if (styleKey === "rose") {
    return { frame: "#6a2437", surface: "#df8da3", glow: "#f4c7d3" };
  }

  if (styleKey === "orange") {
    return { frame: "#663116", surface: "#df8a34", glow: "#f5c78f" };
  }

  if (styleKey === "natural") {
    return { frame: "#31402f", surface: "#889a63", glow: "#ced9b4" };
  }

  if (/Chardonnay|Sauvignon Blanc|Riesling|甲州|Pinot Gris|Albarino|Chenin Blanc|Semillon|Viognier|Gruner|白/i.test(title)) {
    return { frame: "#7a6840", surface: "#e5d39a", glow: "#f8efd0" };
  }

  if (/Pinot Noir|Cabernet|Merlot|Syrah|Shiraz|Malbec|Sangiovese|Nebbiolo|Tempranillo|Zinfandel|Mourvedre|赤/i.test(title)) {
    return { frame: "#401216", surface: "#9a3138", glow: "#df8790" };
  }

  return { frame: "#4a1a1d", surface: "#b2454b", glow: "#e79da4" };
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

function getHeroFrame(kind: CategorySlug, title: string, accent: Accent, themeKey = "") {
  if (kind === "sake") {
    return getSakeFrame(title, themeKey);
  }

  if (kind === "wine") {
    return getWineFrame(title, themeKey);
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

export function DrinkIllustration({ kind, title, accent, idBase, themeKey = "" }: Props) {
  const heroSource = getHeroSource(kind);

  if (!heroSource) {
    return <FallbackIllustration title={title} accent={accent} kind={kind} idBase={idBase} />;
  }

  const frame = getHeroFrame(kind, title, accent, themeKey);

  return (
    <div
      className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-[inherit]"
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
          quality={100}
          className="object-contain object-center p-2 sm:p-3"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              kind === "sake"
                ? `linear-gradient(180deg, ${frame.surface}28 0%, transparent 24%, transparent 70%, ${frame.frame}20 100%)`
                : `linear-gradient(180deg, ${frame.surface}1f 0%, transparent 26%, transparent 66%, ${frame.frame}28 100%)`,
            mixBlendMode: "multiply",
          }}
        />
        <div className="absolute inset-0 opacity-80 mix-blend-soft-light" style={{ background: `radial-gradient(circle at 50% 18%, ${frame.glow} 0%, transparent 42%)` }} />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/34 via-black/8 to-transparent" />
        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em] shadow-sm sm:text-[11px]"
            style={{
              backgroundColor: kind === "sake" ? `${frame.glow}` : "rgba(255,255,255,0.88)",
              color: kind === "sake" ? frame.frame : "#44403c",
            }}
          >
            {fallbackLabels[kind]}
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <div
            className="rounded-xl px-3 py-2 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            style={{
              backgroundColor: kind === "sake" ? `${frame.surface}dd` : "rgba(255,255,255,0.18)",
              backdropFilter: kind === "sake" ? "none" : "blur(12px)",
            }}
          >
            <p className="truncate text-[0.72rem] font-semibold tracking-[0.08em] text-white/80 sm:text-xs">
              {kind === "sake" ? "BRAND PROFILE" : "STYLE PROFILE"}
            </p>
            <p
              className="truncate text-sm font-semibold tracking-tight sm:text-base"
              style={{ color: kind === "sake" ? frame.frame : "#ffffff" }}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
