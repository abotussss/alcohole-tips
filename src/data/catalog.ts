export type CategorySlug = "sake" | "wine" | "beer" | "shochu" | "umeshu";
export type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";

export type RadarMetric = {
  label: string;
  value: number;
};

export type Fact = {
  label: string;
  value: string;
};

export type AlcoholEntry = {
  category: Extract<CategorySlug, "sake" | "wine">;
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  story: string;
  note: string;
  highlights: string[];
  pairings: string[];
  facts: Fact[];
  radar: RadarMetric[];
  accent: Accent;
};

export type AlcoholCategory = {
  slug: CategorySlug;
  title: string;
  latinTitle: string;
  description: string;
  focus: string;
  status: "ready" | "preview";
  accent: Accent;
};

export const categories: AlcoholCategory[] = [
  {
    slug: "sake",
    title: "日本酒",
    latinTitle: "Sake",
    description:
      "ブランドごとに製法や香りの方向性が見えやすいよう、代表銘柄を軸に整理しています。",
    focus: "ブランド × 製法 × 味わい",
    status: "ready",
    accent: "amber",
  },
  {
    slug: "wine",
    title: "ワイン",
    latinTitle: "Wine",
    description:
      "ブランドよりも品種と主要産地の違いが伝わるよう、代表的なブドウ品種を中心に構成しています。",
    focus: "品種 × 産地 × スタイル",
    status: "ready",
    accent: "ruby",
  },
  {
    slug: "beer",
    title: "ビール",
    latinTitle: "Beer",
    description: "ラガー、IPA、スタウトなど、スタイル軸で拡張しやすいように準備中です。",
    focus: "スタイル × 苦味 × 香り",
    status: "preview",
    accent: "sunset",
  },
  {
    slug: "shochu",
    title: "焼酎",
    latinTitle: "Shochu",
    description: "芋・麦・米など原料差と蒸留方法の違いを整理する構成で追加予定です。",
    focus: "原料 × 蒸留 × 香味",
    status: "preview",
    accent: "forest",
  },
  {
    slug: "umeshu",
    title: "梅酒",
    latinTitle: "Umeshu",
    description: "ベース酒や甘さ、酸味の違いが見える形で実装予定です。",
    focus: "ベース酒 × 甘み × 酸味",
    status: "preview",
    accent: "plum",
  },
];

const radarTemplate = (values: [number, number, number, number, number]): RadarMetric[] => [
  { label: "香り", value: values[0] },
  { label: "甘み", value: values[1] },
  { label: "コク", value: values[2] },
  { label: "キレ", value: values[3] },
  { label: "余韻", value: values[4] },
];

const sakeEntries: AlcoholEntry[] = [
  {
    category: "sake",
    slug: "dassai-45",
    name: "獺祭 純米大吟醸45",
    subtitle: "Junmai Daiginjo",
    summary:
      "華やかな吟醸香と透明感のある口当たりで、日本酒に慣れていない人にも入りやすい定番です。",
    story:
      "精米歩合45%の純米大吟醸らしく、香りは高く、甘みはやわらかめ。後半は重くなりすぎず、クリーンに抜けるので、食前にも食中にも合わせやすいタイプです。",
    note:
      "白桃や洋梨のようなニュアンスがあり、全体は軽やか。冷やして輪郭をきれいに出すと魅力が出やすい一本です。",
    highlights: ["華やか", "クリア", "フルーティー"],
    pairings: ["白身魚のカルパッチョ", "生ハムとフルーツ", "塩で食べる天ぷら"],
    facts: [
      { label: "ブランド", value: "獺祭" },
      { label: "製造会社", value: "旭酒造" },
      { label: "都道府県", value: "山口県" },
      { label: "製法", value: "純米大吟醸" },
      { label: "精米歩合", value: "45%" },
      { label: "おすすめ温度", value: "8-12°C" },
    ],
    radar: radarTemplate([4.8, 3.4, 2.8, 4.1, 3.7]),
    accent: "amber",
  },
  {
    category: "sake",
    slug: "kubota-senju",
    name: "久保田 千寿",
    subtitle: "Ginjo",
    summary:
      "新潟らしい端正な辛口寄りのバランスで、料理の邪魔をせずに寄り添う万能型の日本酒です。",
    story:
      "香りは控えめながら、口に含むとすっとしたキレとやわらかな旨みが出ます。派手さより食中での安定感が強く、和食との相性が高いタイプです。",
    note:
      "軽快な立ち上がりで後味はシャープ。冷酒では細身に、ぬる燗では旨みがふくらみます。",
    highlights: ["辛口寄り", "端正", "食中酒"],
    pairings: ["焼き魚", "だし巻き卵", "鶏の塩焼き"],
    facts: [
      { label: "ブランド", value: "久保田" },
      { label: "製造会社", value: "朝日酒造" },
      { label: "都道府県", value: "新潟県" },
      { label: "製法", value: "吟醸" },
      { label: "スタイル", value: "淡麗辛口" },
      { label: "おすすめ温度", value: "10-15°C / ぬる燗" },
    ],
    radar: radarTemplate([2.8, 2.3, 3.2, 4.7, 3.4]),
    accent: "forest",
  },
  {
    category: "sake",
    slug: "hakkaisan-tokubetsu-honjozo",
    name: "八海山 特別本醸造",
    subtitle: "Tokubetsu Honjozo",
    summary:
      "すっきりした輪郭と穏やかな香りで、日常の食卓に最も馴染みやすいクラシックな一本です。",
    story:
      "本醸造らしい軽快さがありながら、薄いだけではなく米由来の旨みも適度に残ります。冷やすとシャープ、燗にすると丸みが出る伸びしろがあります。",
    note:
      "雑味感は少なく、後味は短め。焼き物や煮物など、少し塩気や旨みのある料理と合わせやすいタイプです。",
    highlights: ["すっきり", "軽快", "温度で表情が変わる"],
    pairings: ["焼き鳥", "肉じゃが", "枝豆"],
    facts: [
      { label: "ブランド", value: "八海山" },
      { label: "製造会社", value: "八海醸造" },
      { label: "都道府県", value: "新潟県" },
      { label: "製法", value: "特別本醸造" },
      { label: "スタイル", value: "淡麗" },
      { label: "おすすめ温度", value: "12-18°C / 燗" },
    ],
    radar: radarTemplate([2.5, 2.1, 2.9, 4.8, 3.0]),
    accent: "sunset",
  },
  {
    category: "sake",
    slug: "kokuryu-icchorai",
    name: "黒龍 いっちょらい",
    subtitle: "Ginjo",
    summary:
      "上品でなめらかな口当たりが特徴で、香りとキレのバランスが非常に整った吟醸酒です。",
    story:
      "吟醸らしい上質な香りはありつつ、甘みが前に出すぎず、スムーズに流れていきます。きれいな酒質で、料理との距離感が取りやすいのが強みです。",
    note:
      "口当たりが丸く、後半は繊細に抜けます。刺身や寿司のような繊細な食材と合わせても香りが勝ちすぎません。",
    highlights: ["上品", "なめらか", "バランス型"],
    pairings: ["刺身", "寿司", "だし料理"],
    facts: [
      { label: "ブランド", value: "黒龍" },
      { label: "製造会社", value: "黒龍酒造" },
      { label: "都道府県", value: "福井県" },
      { label: "製法", value: "吟醸" },
      { label: "スタイル", value: "上品で滑らか" },
      { label: "おすすめ温度", value: "10-14°C" },
    ],
    radar: radarTemplate([3.8, 2.8, 3.4, 4.0, 3.8]),
    accent: "plum",
  },
  {
    category: "sake",
    slug: "aramasa-no6-s-type",
    name: "新政 No.6 S-type",
    subtitle: "Nama Sake",
    summary:
      "生酒らしいフレッシュ感とモダンな酸の印象があり、従来の日本酒像より軽やかで立体的に感じられる一本です。",
    story:
      "香りは瑞々しく、甘みと酸の動きで飲み口にリズムが生まれます。クラシックな旨口というより、輪郭の明るさと果実感で見せるタイプです。",
    note:
      "フレッシュなガス感や酸の伸びが魅力。チーズやハーブを使った料理とも合わせやすいモダンな方向性です。",
    highlights: ["フレッシュ", "モダン", "酸が立つ"],
    pairings: ["ブッラータチーズ", "ハーブサラダ", "白身魚のマリネ"],
    facts: [
      { label: "ブランド", value: "新政 No.6" },
      { label: "製造会社", value: "新政酒造" },
      { label: "都道府県", value: "秋田県" },
      { label: "製法", value: "生酒" },
      { label: "スタイル", value: "瑞々しくモダン" },
      { label: "おすすめ温度", value: "8-10°C" },
    ],
    radar: radarTemplate([4.2, 3.5, 3.1, 3.8, 4.4]),
    accent: "ruby",
  },
];

const wineEntries: AlcoholEntry[] = [
  {
    category: "wine",
    slug: "cabernet-sauvignon",
    name: "カベルネ・ソーヴィニヨン",
    subtitle: "Red Variety",
    summary:
      "しっかりしたタンニンと黒系果実の厚みが特徴で、力強い赤ワインを代表する品種です。",
    story:
      "味の芯が太く、樽熟成とも相性が良いため、地域によってはカシス、杉、スパイスの表情が出ます。濃いめの肉料理に合わせやすい、王道のフルボディタイプです。",
    note:
      "若いうちは骨格がはっきりし、熟成で丸みが出ます。ボルドー、ナパ、チリなどでスタイル差が出やすい品種です。",
    highlights: ["フルボディ", "タンニン強め", "黒果実"],
    pairings: ["ステーキ", "赤ワイン煮込み", "熟成チーズ"],
    facts: [
      { label: "品種", value: "Cabernet Sauvignon" },
      { label: "主な国", value: "フランス / アメリカ / チリ" },
      { label: "代表産地", value: "ボルドー / ナパ" },
      { label: "スタイル", value: "重厚で骨格が強い赤" },
      { label: "香りの方向", value: "カシス / 杉 / スパイス" },
      { label: "おすすめ温度", value: "16-18°C" },
    ],
    radar: radarTemplate([3.9, 2.1, 4.8, 3.2, 4.6]),
    accent: "ruby",
  },
  {
    category: "wine",
    slug: "pinot-noir",
    name: "ピノ・ノワール",
    subtitle: "Red Variety",
    summary:
      "繊細な果実味と軽やかな口当たりで、赤ワインの中でもエレガントさが際立つ品種です。",
    story:
      "厚みよりも質感や香りの細やかさで魅力が出るタイプで、チェリー、ラズベリー、紅茶のような印象に振れやすいのが特徴です。",
    note:
      "産地によってかなり表情が変わり、ブルゴーニュでは繊細、ニューワールドでは果実味がより前に出る傾向があります。",
    highlights: ["エレガント", "軽やか", "香りが繊細"],
    pairings: ["鴨肉", "きのこ料理", "サーモンのグリル"],
    facts: [
      { label: "品種", value: "Pinot Noir" },
      { label: "主な国", value: "フランス / アメリカ / ニュージーランド" },
      { label: "代表産地", value: "ブルゴーニュ / オレゴン" },
      { label: "スタイル", value: "軽やかで上品な赤" },
      { label: "香りの方向", value: "チェリー / 紅茶 / 土っぽさ" },
      { label: "おすすめ温度", value: "14-16°C" },
    ],
    radar: radarTemplate([4.4, 2.6, 2.8, 3.6, 4.2]),
    accent: "plum",
  },
  {
    category: "wine",
    slug: "chardonnay",
    name: "シャルドネ",
    subtitle: "White Variety",
    summary:
      "産地や醸造で表情が大きく変わる白ワインの代表格で、ふくよかにもシャープにも仕上がる品種です。",
    story:
      "ステンレスタンクなら柑橘や青りんごの清潔感、樽熟成ならバターやバニラの厚みが出やすく、白ワインの幅広さを体感しやすい品種です。",
    note:
      "シャブリのようなミネラル感のあるスタイルから、カリフォルニアのリッチなタイプまで振れ幅が大きいのが魅力です。",
    highlights: ["幅広い表情", "白の定番", "醸造で差が出る"],
    pairings: ["ローストチキン", "クリームソース", "白身魚のソテー"],
    facts: [
      { label: "品種", value: "Chardonnay" },
      { label: "主な国", value: "フランス / アメリカ / オーストラリア" },
      { label: "代表産地", value: "ブルゴーニュ / カリフォルニア" },
      { label: "スタイル", value: "シャープにもリッチにもなる白" },
      { label: "香りの方向", value: "柑橘 / りんご / バター" },
      { label: "おすすめ温度", value: "10-13°C" },
    ],
    radar: radarTemplate([3.7, 2.8, 4.1, 3.1, 3.9]),
    accent: "amber",
  },
  {
    category: "wine",
    slug: "sauvignon-blanc",
    name: "ソーヴィニヨン・ブラン",
    subtitle: "White Variety",
    summary:
      "ハーブや柑橘を思わせるシャープな香りが特徴で、軽快さと爽快感が際立つ白ワインです。",
    story:
      "酸がきれいに立ちやすく、青草やグレープフルーツのようなニュアンスが出やすい品種です。冷やして飲むと、直線的な清涼感が非常にわかりやすく出ます。",
    note:
      "ロワール系は引き締まり、ニュージーランド系はトロピカル感が増すなど、国で香りの強さが変わりやすい品種です。",
    highlights: ["爽快", "ハーバル", "酸がきれい"],
    pairings: ["牡蠣", "山羊チーズ", "ハーブサラダ"],
    facts: [
      { label: "品種", value: "Sauvignon Blanc" },
      { label: "主な国", value: "フランス / ニュージーランド / チリ" },
      { label: "代表産地", value: "ロワール / マールボロ" },
      { label: "スタイル", value: "シャープで香り高い白" },
      { label: "香りの方向", value: "グレープフルーツ / ハーブ" },
      { label: "おすすめ温度", value: "8-11°C" },
    ],
    radar: radarTemplate([4.5, 2.0, 2.4, 4.8, 3.2]),
    accent: "forest",
  },
  {
    category: "wine",
    slug: "riesling",
    name: "リースリング",
    subtitle: "White Variety",
    summary:
      "高い酸と透明感ある果実味が魅力で、辛口から甘口まで幅広く表現できる白ワイン品種です。",
    story:
      "レモンや青りんご、花の香りに加え、熟成で石油香と呼ばれる独特の個性が出ることがあります。軽やかなのに奥行きがあり、食事との相性幅も広い品種です。",
    note:
      "ドイツでは残糖のバランスが魅力になり、アルザスではよりドライで密度のある印象に寄りやすい傾向があります。",
    highlights: ["透明感", "高い酸", "辛口から甘口まで対応"],
    pairings: ["スパイス料理", "豚肉料理", "青魚のマリネ"],
    facts: [
      { label: "品種", value: "Riesling" },
      { label: "主な国", value: "ドイツ / フランス / オーストラリア" },
      { label: "代表産地", value: "モーゼル / アルザス" },
      { label: "スタイル", value: "酸が高く透明感のある白" },
      { label: "香りの方向", value: "ライム / 白い花 / ミネラル" },
      { label: "おすすめ温度", value: "8-12°C" },
    ],
    radar: radarTemplate([4.2, 3.1, 2.5, 4.6, 4.0]),
    accent: "sunset",
  },
];

const entryMap = {
  sake: sakeEntries,
  wine: wineEntries,
  beer: [],
  shochu: [],
  umeshu: [],
} as const satisfies Record<CategorySlug, AlcoholEntry[]>;

export function getReadyCategories() {
  return categories.filter((category) => category.status === "ready");
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getEntriesByCategory(category: CategorySlug) {
  return [...entryMap[category]];
}

export function getAllEntries() {
  return [...sakeEntries, ...wineEntries];
}

export function getEntry(category: string, slug: string) {
  if (category !== "sake" && category !== "wine") {
    return undefined;
  }

  return entryMap[category].find((entry) => entry.slug === slug);
}
