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
  const patternId = `${idBase}-pattern`;
  const hash = hashValue(title);
  const stripeTilt = 18 + (hash % 12);
  const stripeGap = 20 + (hash % 8);
  const sealX = 186 + (hash % 20);
  const sealY = 154 + (hash % 26);
  const sealRadius = 12 + (hash % 8);
  const secondaryLiquid =
    kind === "wine" ? "#8b4450" : kind === "sake" ? "#efe6db" : palette.start;
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
        <pattern id={patternId} width={stripeGap} height={stripeGap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${stripeTilt})`}>
          <rect width={stripeGap} height={stripeGap} fill="transparent" />
          <rect width="6" height={stripeGap} fill={`${palette.end}18`} />
        </pattern>
      </defs>

      <rect width="520" height="380" rx="32" fill="#f6efe5" />
      <circle cx="120" cy="96" r="120" fill={`url(#${glowId})`} />
      <circle cx="426" cy="74" r="74" fill={`${palette.start}20`} />
      <circle cx="434" cy="310" r="104" fill={`${palette.end}18`} />

      <path
        d="M0 290C93 234 168 236 255 280C340 322 412 331 520 286V380H0Z"
        fill={`${palette.end}16`}
      />
      <rect x="36" y="42" width="156" height="112" rx="28" fill={`url(#${patternId})`} />

      {kind === "wine" ? (
        <>
          <rect x="162" y="88" width="72" height="182" rx="18" fill="#242120" />
          <rect x="173" y="103" width="50" height="122" rx="14" fill={`url(#${gradientId})`} />
          <rect x="182" y="137" width="32" height="54" rx="8" fill="#f4ede4" opacity="0.9" />
          <rect x="187" y="146" width="22" height="10" rx="5" fill={`${palette.end}65`} />
          <rect x="187" y="162" width="22" height="4" rx="2" fill={`${palette.end}35`} />
          <circle cx={sealX} cy={sealY} r={sealRadius} fill={`${palette.glow}dd`} stroke={`${palette.end}55`} strokeWidth="2" />
          <path d="M326 110C352 110 366 130 366 149C366 190 334 207 334 220H318C318 207 286 190 286 149C286 130 301 110 326 110Z" fill="#f4ede4" opacity="0.94" />
          <path d="M300 150C300 135 311 126 326 126C341 126 352 135 352 150C352 176 332 186 326 192C320 186 300 176 300 150Z" fill={liquidColor} opacity="0.96" />
          <rect x="323" y="220" width="6" height="62" rx="3" fill="#f4ede4" opacity="0.94" />
          <rect x="294" y="278" width="64" height="10" rx="5" fill="#f4ede4" opacity="0.94" />
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
          <rect x="165" y="78" width="66" height="182" rx="18" fill="#252222" />
          <rect x="176" y="99" width="44" height="124" rx="14" fill={`url(#${gradientId})`} />
          <rect x="181" y="137" width="34" height="54" rx="8" fill="#f5efe6" opacity="0.92" />
          <rect x="187" y="146" width="22" height="10" rx="5" fill={`${palette.end}65`} />
          <rect x="187" y="162" width="22" height="4" rx="2" fill={`${palette.end}35`} />
          <circle cx={sealX} cy={sealY} r={sealRadius} fill={`${palette.glow}dd`} stroke={`${palette.end}55`} strokeWidth="2" />
          <path d="M310 145C346 145 372 171 372 203C372 235 346 262 310 262C274 262 248 235 248 203C248 171 274 145 310 145Z" fill="#f6f0e8" opacity="0.95" />
          <path d="M272 202C272 182 289 168 310 168C331 168 348 182 348 202V214H272Z" fill={liquidColor} opacity="0.9" />
          <path d={`M272 200C283 190 295 188 310 188C324 188 336 192 348 200V214H272Z`} fill={secondaryLiquid} opacity="0.34" />
          <rect x="268" y="214" width="84" height="44" rx="18" fill="#f6f0e8" opacity="0.95" />
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
