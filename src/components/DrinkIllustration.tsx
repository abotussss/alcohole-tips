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

function getSakeVisualTheme(title: string, hash: number, accent: Accent) {
  const normalized = title.replace(/\s+/g, "");
  const preset = [
    {
      match: /獺祭|日本酒/,
      theme: {
        backgroundStart: "#e6cf83",
        backgroundEnd: "#f2e2aa",
        aura: "#f5e9c5",
        frame: "#2e201d",
        bottleDark: "#142922",
        bottleMid: "#2a5540",
        cap: "#b88f55",
        label: "#f4efe4",
        ink: "#231916",
        stamp: "#a3523c",
      },
    },
    {
      match: /新政|No\.6|Colors/,
      theme: {
        backgroundStart: "#cfd3a6",
        backgroundEnd: "#ebe5c1",
        aura: "#eff0d6",
        frame: "#2d2721",
        bottleDark: "#173126",
        bottleMid: "#305646",
        cap: "#9f835d",
        label: "#f6f2ea",
        ink: "#1f1a16",
        stamp: "#8d4d3b",
      },
    },
    {
      match: /黒龍|九頭龍/,
      theme: {
        backgroundStart: "#bdb8b0",
        backgroundEnd: "#ded8cf",
        aura: "#ece8e1",
        frame: "#1f1b1b",
        bottleDark: "#101717",
        bottleMid: "#1f3230",
        cap: "#8d7658",
        label: "#f4f1eb",
        ink: "#191617",
        stamp: "#8c443b",
      },
    },
    {
      match: /十四代|花陽浴|鳳凰美田/,
      theme: {
        backgroundStart: "#ddc27b",
        backgroundEnd: "#efddb1",
        aura: "#f3e7c8",
        frame: "#2a1d18",
        bottleDark: "#1b2921",
        bottleMid: "#35513a",
        cap: "#ba9258",
        label: "#f7f0e4",
        ink: "#241915",
        stamp: "#a14b35",
      },
    },
    {
      match: /久保田|八海山|伯楽星|真澄/,
      theme: {
        backgroundStart: "#d9d4c8",
        backgroundEnd: "#ebe6dc",
        aura: "#f2eee5",
        frame: "#29221f",
        bottleDark: "#16251f",
        bottleMid: "#345243",
        cap: "#9f835d",
        label: "#f7f3eb",
        ink: "#1f1a17",
        stamp: "#9d4a38",
      },
    },
    {
      match: /天狗舞|酔鯨|鍋島|田酒/,
      theme: {
        backgroundStart: "#d7c0a0",
        backgroundEnd: "#ead7bd",
        aura: "#f1e6d5",
        frame: "#2c211c",
        bottleDark: "#18261f",
        bottleMid: "#355340",
        cap: "#aa8154",
        label: "#f5efe5",
        ink: "#221916",
        stamp: "#aa4f3c",
      },
    },
  ].find((item) => item.match.test(normalized));

  if (preset) {
    return preset.theme;
  }

  const themes = [
    {
      backgroundStart: "#f0d88c",
      backgroundEnd: "#f6e8b4",
      aura: "#f8efcc",
      frame: "#2e211d",
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
      frame: "#30221d",
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
      frame: "#2a2321",
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
      frame: "#2b201d",
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

function getSakeLabelLines(title: string) {
  return [...getSakeLabelText(title)];
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
  const sakeTheme = getSakeVisualTheme(title, hash, accent);
  const sakeLabelLines = getSakeLabelLines(title);
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
          <rect width="520" height="380" rx="32" fill={sakeTheme.frame} />
          <rect x="14" y="16" width="492" height="348" rx="28" fill="#e5c86f" />
          <rect x="14" y="16" width="492" height="348" rx="28" fill={`url(#${sakeBgId})`} opacity="0.5" />
          <circle cx="260" cy="142" r="168" fill={sakeTheme.aura} opacity="0.3" />
          <path
            d="M14 316C136 298 232 298 312 304C390 310 448 308 506 300V364H14Z"
            fill="#000000"
            opacity="0.07"
          />
          <ellipse cx="260" cy="330" rx="104" ry="16" fill="#000000" opacity="0.14" />
          <g transform={`translate(${bottleOffset}, 0)`}>
            <rect x="246" y="36" width="48" height="18" rx="6" fill={sakeTheme.cap} />
            <rect x="244" y="52" width="52" height="10" rx="4" fill={sakeTheme.cap} opacity="0.88" />
            <path
              d="M221 70C221 55 233 46 248 46H292C307 46 319 55 319 70V88C319 111 313 135 303 157L292 183C286 198 284 214 284 232V330H256V232C256 214 254 198 248 183L237 157C227 135 221 111 221 88V70Z"
              fill={`url(#${sakeBottleId})`}
            />
            <path
              d="M250 80C254 68 259 58 266 52H274C264 72 260 102 260 144C260 194 264 250 269 330H253C248 264 244 208 244 160C244 125 246 98 250 80Z"
              fill="url(#${sakeGlassId})"
              opacity="0.62"
            />
            <path
              d="M266 80C272 77 279 79 284 84C279 116 280 178 290 330H279C273 268 270 206 270 140C270 113 269 96 266 80Z"
              fill="#d2f29a"
              opacity="0.16"
            />
            <rect x="220" y="146" width="100" height="28" rx="14" fill={sakeTheme.label} />
            <text
              x="270"
              y="164"
              textAnchor="middle"
              fill={sakeTheme.ink}
              fontSize="14"
              fontWeight="700"
              style={{ fontFamily: "var(--font-display)" }}
            >
              日本酒
            </text>
            <rect x="217" y="186" width="106" height="120" rx="8" fill={sakeTheme.label} />
            <g transform="translate(270 215)">
              {sakeLabelLines.map((line, index) => (
                <text
                  key={`${line}-${index}`}
                  x="0"
                  y={index * 22}
                  textAnchor="middle"
                  fill={sakeTheme.ink}
                  fontSize="20"
                  fontWeight="800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {line}
                </text>
              ))}
            </g>
            <text
              x="230"
              y="298"
              fill={sakeTheme.ink}
              fontSize="8"
              fontWeight="600"
              opacity="0.44"
            >
              JUNMAI
            </text>
            <text
              x="306"
              y="202"
              writingMode="tb"
              glyphOrientationVertical="0"
              fill={sakeTheme.ink}
              fontSize="8"
              fontWeight="600"
              opacity="0.5"
            >
              SAKE ATLAS
            </text>
            <rect x="226" y="286" width="14" height="14" rx="4" fill={sakeTheme.stamp} opacity="0.9" />
          </g>
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
