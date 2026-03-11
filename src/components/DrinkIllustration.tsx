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

function getSakeVisualTheme(hash: number, accent: Accent) {
  const themes = [
    {
      backgroundStart: "#f0d88c",
      backgroundEnd: "#f6e8b4",
      aura: "#f8efcc",
      bottleDark: "#183224",
      bottleMid: "#2d5d35",
      cap: "#c49a63",
      label: "#f5efdf",
      ink: "#211915",
      stamp: "#a94b32",
    },
    {
      backgroundStart: "#e8c9a0",
      backgroundEnd: "#f3e0c2",
      aura: "#f7ebdb",
      bottleDark: "#142a21",
      bottleMid: "#45643d",
      cap: "#8c715d",
      label: "#f8f2e7",
      ink: "#2a1d18",
      stamp: "#8c3d30",
    },
    {
      backgroundStart: "#dfd8c2",
      backgroundEnd: "#efe9d6",
      aura: "#f6f2e8",
      bottleDark: "#15241f",
      bottleMid: "#395a45",
      cap: "#ba9354",
      label: "#f6f1e8",
      ink: "#201816",
      stamp: "#954535",
    },
    {
      backgroundStart: accentMap[accent].start,
      backgroundEnd: "#f4eadb",
      aura: accentMap[accent].glow,
      bottleDark: "#13221d",
      bottleMid: "#35513f",
      cap: "#a58259",
      label: "#f7efe1",
      ink: "#241b17",
      stamp: "#9f4634",
    },
  ];

  return themes[hash % themes.length];
}

function getSakeLabelText(title: string) {
  const normalized = title.replace(/\s+/g, "");

  if (normalized.length <= 4) {
    return normalized;
  }

  return normalized.slice(0, 4);
}

export function DrinkIllustration({ kind, title, accent, idBase }: Props) {
  const palette = accentMap[accent];
  const gradientId = `${idBase}-gradient`;
  const glowId = `${idBase}-glow`;
  const sakeBgId = `${idBase}-sake-bg`;
  const sakeBottleId = `${idBase}-sake-bottle`;
  const sakeGlassId = `${idBase}-sake-glass`;
  const hash = hashValue(title);
  const labelWidth = 26 + (hash % 10);
  const labelY = 142 + (hash % 14);
  const liquidWave = 186 + (hash % 10);
  const wineGlassTone = hash % 2 === 0 ? "#f3ebe2" : "#eee4d8";
  const sakeTheme = getSakeVisualTheme(hash, accent);
  const sakeLabelText = getSakeLabelText(title);
  const bottleOffset = (hash % 3) * 2 - 2;
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
        <linearGradient id={sakeBgId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={sakeTheme.backgroundStart} />
          <stop offset="100%" stopColor={sakeTheme.backgroundEnd} />
        </linearGradient>
        <linearGradient id={sakeBottleId} x1="0%" y1="0%" x2="0%" y2="1">
          <stop offset="0%" stopColor={sakeTheme.bottleMid} />
          <stop offset="50%" stopColor={sakeTheme.bottleDark} />
          <stop offset="100%" stopColor="#0f1714" />
        </linearGradient>
        <linearGradient id={sakeGlassId} x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {kind === "sake" ? (
        <>
          <rect width="520" height="380" rx="32" fill={`url(#${sakeBgId})`} />
          <circle cx="260" cy="146" r="168" fill={sakeTheme.aura} opacity="0.42" />
          <circle cx="130" cy="88" r="72" fill="#ffffff" opacity="0.12" />
          <path
            d="M0 320C106 298 182 294 252 304C332 316 412 316 520 292V380H0Z"
            fill="#000000"
            opacity="0.1"
          />
          <ellipse cx="290" cy="346" rx="122" ry="18" fill="#000000" opacity="0.16" />
          <g transform={`translate(${bottleOffset}, 0)`}>
            <rect x="247" y="42" width="46" height="34" rx="9" fill={sakeTheme.cap} />
            <rect x="242" y="74" width="56" height="18" rx="8" fill={sakeTheme.cap} opacity="0.94" />
            <path
              d="M227 82C227 64 241 52 260 52H280C299 52 313 64 313 82V98C313 120 307 140 299 160L282 214C277 230 275 246 275 262V326H245V262C245 246 243 230 238 214L221 160C213 140 207 120 207 98V82Z"
              fill={`url(#${sakeBottleId})`}
            />
            <path
              d="M246 90C249 74 255 62 264 56H272C261 76 257 104 257 144C257 196 262 248 268 326H252C246 260 242 204 242 158C242 129 243 106 246 90Z"
              fill="url(#${sakeGlassId})"
              opacity="0.66"
            />
            <path
              d="M264 90C270 86 278 88 283 93C274 121 273 180 287 326H275C270 258 267 193 267 132C267 115 266 101 264 90Z"
              fill="#d2f29a"
              opacity="0.18"
            />
            <rect x="220" y="156" width="100" height="34" rx="16" fill={sakeTheme.label} />
            <text
              x="270"
              y="178"
              textAnchor="middle"
              fill={sakeTheme.ink}
              fontSize="17"
              fontWeight="700"
              style={{ fontFamily: "var(--font-display)" }}
            >
              日本酒
            </text>
            <rect x="214" y="210" width="112" height="106" rx="10" fill={sakeTheme.label} />
            <text
              x="270"
              y="236"
              textAnchor="middle"
              fill={sakeTheme.ink}
              fontSize="15"
              fontWeight="600"
              opacity="0.66"
            >
              {guideLabels[kind]}
            </text>
            <text
              x="270"
              y="260"
              textAnchor="middle"
              fill={sakeTheme.ink}
              fontSize="34"
              fontWeight="800"
              letterSpacing="1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {sakeLabelText}
            </text>
            <rect x="230" y="275" width="80" height="2" rx="1" fill={sakeTheme.ink} opacity="0.16" />
            <text
              x="270"
              y="294"
              textAnchor="middle"
              fill={sakeTheme.ink}
              fontSize="11"
              fontWeight="600"
              opacity="0.58"
            >
              CURATED SAKE
            </text>
            <rect x="228" y="298" width="16" height="16" rx="4" fill={sakeTheme.stamp} opacity="0.92" />
            <rect x="250" y="300" width="56" height="6" rx="3" fill={sakeTheme.ink} opacity="0.12" />
          </g>
          <text
            x="42"
            y="324"
            fill={sakeTheme.ink}
            fontSize="14"
            letterSpacing="4"
            fontWeight="700"
            opacity="0.48"
          >
            {guideLabels[kind]}
          </text>
          <text
            x="42"
            y="348"
            fill={sakeTheme.ink}
            fontSize="28"
            fontWeight="700"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </text>
        </>
      ) : kind === "wine" ? (
        <>
          <rect width="520" height="380" rx="32" fill="#f6efe5" />
          <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
          <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
          <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />
          <path
            d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
            fill={`${palette.end}16`}
          />
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
          <rect width="520" height="380" rx="32" fill="#f6efe5" />
          <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
          <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
          <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />
          <path
            d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
            fill={`${palette.end}16`}
          />
          <rect x="150" y="100" width="82" height="156" rx="18" fill={`url(#${gradientId})`} />
          <rect x="160" y="84" width="62" height="32" rx="16" fill="#fff7eb" />
          <rect x="246" y="128" width="46" height="88" rx="20" fill="none" stroke="#f1e6d6" strokeWidth="14" />
          <rect x="316" y="126" width="76" height="132" rx="20" fill={`url(#${gradientId})`} />
          <rect x="324" y="110" width="60" height="28" rx="14" fill="#fff7eb" />
        </>
      ) : kind === "shochu" ? (
        <>
          <rect width="520" height="380" rx="32" fill="#f6efe5" />
          <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
          <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
          <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />
          <path
            d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
            fill={`${palette.end}16`}
          />
          <rect x="162" y="76" width="70" height="188" rx="18" fill="#1c1a19" />
          <rect x="174" y="98" width="46" height="130" rx="14" fill={`url(#${gradientId})`} />
          <ellipse cx="330" cy="210" rx="54" ry="42" fill="#f1e8dc" opacity="0.95" />
          <ellipse cx="330" cy="208" rx="40" ry="18" fill="#ddd0bf" opacity="0.7" />
          <ellipse cx="330" cy="198" rx="40" ry="14" fill={liquidColor} opacity="0.55" />
        </>
      ) : kind === "umeshu" ? (
        <>
          <rect width="520" height="380" rx="32" fill="#f6efe5" />
          <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
          <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
          <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />
          <path
            d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
            fill={`${palette.end}16`}
          />
          <rect x="164" y="84" width="70" height="180" rx="18" fill="#2a2320" />
          <rect x="176" y="100" width="46" height="128" rx="14" fill={`url(#${gradientId})`} />
          <rect x="294" y="134" width="68" height="122" rx="24" fill="#efe3d4" opacity="0.95" />
          <rect x="304" y="174" width="48" height="54" rx="16" fill={liquidColor} opacity="0.82" />
          <circle cx="390" cy="130" r="18" fill="#b98650" />
        </>
      ) : (
        <>
          <rect width="520" height="380" rx="32" fill="#f6efe5" />
          <circle cx="132" cy="108" r="118" fill={`url(#${glowId})`} />
          <circle cx="420" cy="90" r="68" fill={`${palette.start}14`} />
          <circle cx="430" cy="300" r="96" fill={`${palette.end}12`} />
          <path
            d="M0 300C100 258 182 256 262 288C342 320 408 326 520 294V380H0Z"
            fill={`${palette.end}16`}
          />
        </>
      )}

      {kind === "sake" ? null : (
        <>
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
        </>
      )}
    </svg>
  );
}
