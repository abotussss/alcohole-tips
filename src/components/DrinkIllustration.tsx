import type { CategorySlug } from "@/data/catalog";

type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";

type Props = {
  kind: CategorySlug;
  title: string;
  accent: Accent;
  idBase: string;
};

const accentMap: Record<Accent, { start: string; end: string; glow: string }> = {
  amber: { start: "#f5c57a", end: "#b15b2d", glow: "#fff0c7" },
  ruby: { start: "#d78b8b", end: "#7c2630", glow: "#f7d2d4" },
  forest: { start: "#91b99e", end: "#305646", glow: "#d9efe1" },
  sunset: { start: "#f0a56a", end: "#6f251c", glow: "#ffd5b3" },
  plum: { start: "#bca5bf", end: "#5c3e61", glow: "#f0def3" },
};

const guideLabels: Record<CategorySlug, string> = {
  sake: "銘柄ガイド",
  wine: "品種ガイド",
  beer: "スタイルガイド",
  shochu: "原料ガイド",
  umeshu: "味わいガイド",
};

function hashValue(value: string) {
  return [...value].reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);
}

export function DrinkIllustration({ kind, title, accent, idBase }: Props) {
  const palette = accentMap[accent];
  const gradientId = `${idBase}-gradient`;
  const glowId = `${idBase}-glow`;
  const hash = hashValue(title);
  const labelWidth = 26 + (hash % 10);
  const labelY = 142 + (hash % 14);
  const liquidWave = 186 + (hash % 10);
  const sakeCupTone = hash % 2 === 0 ? "#f4eee6" : "#efe8de";
  const wineGlassTone = hash % 2 === 0 ? "#f3ebe2" : "#eee4d8";
  const liquidColor =
    kind === "wine"
      ? "#5f1f26"
      : kind === "beer"
        ? "#db9732"
        : kind === "umeshu"
          ? "#b08d46"
          : "#e8ddd1";

  return (
    <svg
      viewBox="0 0 520 380"
      role="img"
      aria-label={title}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.start} />
          <stop offset="100%" stopColor={palette.end} />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="520" height="380" rx="32" fill="#f6efe5" />
      <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
      <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
      <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />

      <path
        d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
        fill={`${palette.end}16`}
      />

      {kind === "wine" ? (
        <>
          <rect x="168" y="78" width="60" height="194" rx="18" fill="#201c1b" />
          <rect x="180" y="100" width="36" height="126" rx="12" fill={`url(#${gradientId})`} />
          <rect x={(198 - labelWidth / 2)} y={labelY} width={labelWidth} height="42" rx="8" fill="#f5efe7" opacity="0.96" />
          <rect x={(198 - labelWidth / 2)} y={labelY + 18} width={labelWidth} height="3" rx="2" fill={`${palette.end}32`} />
          <path d="M300 120C300 97 318 80 340 80C362 80 380 97 380 120C380 154 350 174 346 196H334C330 174 300 154 300 120Z" fill={wineGlassTone} opacity="0.96" />
          <path d={`M314 126C314 112 325 100 340 100C355 100 366 112 366 126C366 150 346 165 340 171C334 165 314 150 314 126Z`} fill={liquidColor} opacity="0.94" />
          <path d={`M318 ${liquidWave}C327 ${liquidWave - 6} 334 ${liquidWave - 2} 340 ${liquidWave - 4}C347 ${liquidWave - 2} 354 ${liquidWave - 6} 362 ${liquidWave}V176H318Z`} fill="#8d4851" opacity="0.2" />
          <rect x="337" y="196" width="6" height="60" rx="3" fill={wineGlassTone} opacity="0.96" />
          <rect x="306" y="252" width="68" height="10" rx="5" fill={wineGlassTone} opacity="0.96" />
        </>
      ) : kind === "beer" ? (
        <>
          <rect x="150" y="100" width="82" height="156" rx="18" fill={`url(#${gradientId})`} />
          <rect x="160" y="84" width="62" height="32" rx="16" fill="#fff7eb" />
          <rect x="246" y="128" width="46" height="88" rx="20" fill="none" stroke="#f1e6d6" strokeWidth="14" />
          <rect x="316" y="126" width="76" height="132" rx="20" fill={`url(#${gradientId})`} />
          <rect x="324" y="110" width="60" height="28" rx="14" fill="#fff7eb" />
        </>
      ) : kind === "shochu" ? (
        <>
          <rect x="162" y="76" width="70" height="188" rx="18" fill="#1c1a19" />
          <rect x="174" y="98" width="46" height="130" rx="14" fill={`url(#${gradientId})`} />
          <ellipse cx="330" cy="210" rx="54" ry="42" fill="#f1e8dc" opacity="0.95" />
          <ellipse cx="330" cy="208" rx="40" ry="18" fill="#ddd0bf" opacity="0.7" />
          <ellipse cx="330" cy="198" rx="40" ry="14" fill={liquidColor} opacity="0.55" />
        </>
      ) : kind === "umeshu" ? (
        <>
          <rect x="164" y="84" width="70" height="180" rx="18" fill="#2a2320" />
          <rect x="176" y="100" width="46" height="128" rx="14" fill={`url(#${gradientId})`} />
          <rect x="294" y="134" width="68" height="122" rx="24" fill="#efe3d4" opacity="0.95" />
          <rect x="304" y="174" width="48" height="54" rx="16" fill={liquidColor} opacity="0.82" />
          <circle cx="390" cy="130" r="18" fill="#b98650" />
        </>
      ) : (
        <>
          <rect x="170" y="74" width="56" height="198" rx="18" fill="#221f1d" />
          <rect x="182" y="98" width="32" height="128" rx="12" fill={`url(#${gradientId})`} />
          <rect x={(198 - labelWidth / 2)} y={labelY} width={labelWidth} height="46" rx="8" fill="#f5efe7" opacity="0.96" />
          <rect x={(198 - labelWidth / 2)} y={labelY + 18} width={labelWidth} height="3" rx="2" fill={`${palette.end}32`} />
          <path d="M276 194C276 170 294 156 318 156C342 156 360 170 360 194V226C360 240 349 252 335 252H301C287 252 276 240 276 226Z" fill={sakeCupTone} opacity="0.98" />
          <path d="M288 194C288 180 300 170 318 170C336 170 348 180 348 194V204H288Z" fill={liquidColor} opacity="0.94" />
          <path d={`M288 198C297 192 307 190 318 190C329 190 339 192 348 198V204H288Z`} fill="#f6eee3" opacity="0.28" />
          <rect x="270" y="250" width="96" height="10" rx="5" fill="#d8c9b6" opacity="0.45" />
        </>
      )}

      <text
        x="42"
        y="318"
        fill="#2a211d"
        fontSize="16"
        letterSpacing="4"
        fontWeight="700"
        opacity="0.55"
      >
        {guideLabels[kind]}
      </text>
      <text
        x="42"
        y="345"
        fill="#2a211d"
        fontSize="28"
        fontWeight="700"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </text>
    </svg>
  );
}
