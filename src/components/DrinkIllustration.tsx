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
    { frame: "#6f5834", surface: "#e4c66c", glow: "#f5e8af" },
    { frame: "#7b6847", surface: "#e6d39b", glow: "#f3e9c8" },
    { frame: "#7e5a40", surface: "#d8a97c", glow: "#edcfb5" },
    { frame: "#6c4330", surface: "#cc7c58", glow: "#ebb59b" },
    { frame: "#6d5d40", surface: "#c6b27a", glow: "#e7dbb7" },
    { frame: "#556044", surface: "#a7b287", glow: "#d8dfc8" },
    { frame: "#4f5a3e", surface: "#95a76d", glow: "#ced9b5" },
    { frame: "#695f56", surface: "#c2b6aa", glow: "#e2dad4" },
    { frame: "#5c4537", surface: "#ba9174", glow: "#ddc1af" },
    { frame: "#6a4a3b", surface: "#ce8d70", glow: "#e8baa5" },
    { frame: "#6d614f", surface: "#b5aa8f", glow: "#dbd4c3" },
    { frame: "#5d4b3d", surface: "#c8aa87", glow: "#e6d2bc" },
    { frame: "#3f596a", surface: "#8db6cb", glow: "#d4e6ef" },
    { frame: "#42546f", surface: "#93a9d0", glow: "#d9e2f2" },
    { frame: "#355b59", surface: "#82c0b8", glow: "#cfe9e5" },
    { frame: "#4f4d75", surface: "#a39fd1", glow: "#dfddf3" },
    { frame: "#3f5f50", surface: "#9ac2a5", glow: "#d6ead9" },
    { frame: "#5b5871", surface: "#b7b1d1", glow: "#e5e1f0" },
  ];

  return palette[hash % palette.length];
}

function getSakeFrame(title: string, themeKey = "") {
  if (themeKey === "sake-home") {
    return { frame: "#6c5435", surface: "#efd46f", glow: "#f7e9b7" };
  }

  if (themeKey.startsWith("sake-prefecture-")) {
    return getDynamicSakeFrame(themeKey);
  }

  if (/獺祭|十四代|花陽浴/.test(title)) {
    return { frame: "#2d211b", surface: "#e8d184", glow: "#f7eab8" };
  }

  if (/新政|No\.6|陽乃鳥|亜麻猫|天蛙|ヴィリジアン/.test(title)) {
    return { frame: "#2e241d", surface: "#ddcea1", glow: "#efe7ce" };
  }

  if (/黒龍|九頭龍/.test(title)) {
    return { frame: "#2a2422", surface: "#ddd4c4", glow: "#f1ebe1" };
  }

  if (/久保田|八海山/.test(title)) {
    return { frame: "#302722", surface: "#ddd3be", glow: "#f0e8d8" };
  }

  if (/真澄|伯楽星|出羽桜|南部美人/.test(title)) {
    return { frame: "#2a2422", surface: "#d8d0c5", glow: "#f0e8dd" };
  }

  if (/天狗舞|酔鯨|鍋島|田酒|飛露喜|日置桜/.test(title)) {
    return { frame: "#33241d", surface: "#dec19a", glow: "#f0dcc0" };
  }

  if (/作|醸し人九平次|仙禽|寒菊|鳳凰美田/.test(title)) {
    return { frame: "#302720", surface: "#d8ccb7", glow: "#eee5d8" };
  }

  return { frame: "#2f221d", surface: "#e7d087", glow: "#f5e7ba" };
}

function getWineFrame(title: string, themeKey = "") {
  const styleKey = themeKey.replace("wine-style-", "");

  if (themeKey === "wine-home") {
    return { frame: "#5b1e21", surface: "#c9473a", glow: "#e28b7f" };
  }

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
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/28 via-black/6 to-transparent sm:h-14" />
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.12em] shadow-sm sm:px-3 sm:py-1 sm:text-[11px]"
            style={{
              backgroundColor: kind === "sake" ? `${frame.glow}` : "rgba(255,255,255,0.88)",
              color: kind === "sake" ? frame.frame : "#44403c",
            }}
          >
            {fallbackLabels[kind]}
          </span>
        </div>
        <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3">
          <div
            className="rounded-lg px-2.5 py-1.5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:rounded-xl sm:px-3 sm:py-2"
            style={{
              backgroundColor: kind === "sake" ? `${frame.surface}dd` : "rgba(255,255,255,0.18)",
              backdropFilter: kind === "sake" ? "none" : "blur(12px)",
            }}
          >
            {kind === "sake" ? null : (
              <p className="truncate text-[0.62rem] font-semibold tracking-[0.06em] text-white/80 sm:text-xs">
                STYLE PROFILE
              </p>
            )}
            <p
              className="truncate text-[0.88rem] font-semibold tracking-tight sm:text-base"
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
