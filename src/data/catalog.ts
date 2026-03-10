export type CategorySlug = "sake" | "wine" | "beer" | "shochu" | "umeshu";
export type Accent = "amber" | "ruby" | "forest" | "sunset" | "plum";
export type WineStyle = "red" | "white";

export type RadarMetric = {
  label: string;
  value: number;
};

export type Fact = {
  label: string;
  value: string;
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

export type SakeBottle = {
  name: string;
  style: string;
  summary: string;
  notes: string;
  highlights: string[];
  facts: Fact[];
  radar: RadarMetric[];
};

export type SakeBrand = {
  category: "sake";
  slug: string;
  name: string;
  summary: string;
  story: string;
  accent: Accent;
  facts: Fact[];
  highlights: string[];
  lineup: SakeBottle[];
};

export type WineBottle = {
  name: string;
  winery: string;
  region: string;
  summary: string;
  highlights: string[];
};

export type WineCountry = {
  slug: string;
  country: string;
  flag: string;
  region: string;
  summary: string;
  bottles: WineBottle[];
};

export type WineVariety = {
  category: "wine";
  slug: string;
  name: string;
  style: WineStyle;
  summary: string;
  story: string;
  accent: Accent;
  facts: Fact[];
  highlights: string[];
  radar: RadarMetric[];
  countries: WineCountry[];
};

export const categories: AlcoholCategory[] = [
  {
    slug: "sake",
    title: "日本酒",
    latinTitle: "Sake",
    description:
      "ブランドを選ぶと、その中の代表的な種類をシンプルに見比べられる構成です。",
    focus: "ブランド → 種類",
    status: "ready",
    accent: "amber",
  },
  {
    slug: "wine",
    title: "ワイン",
    latinTitle: "Wine",
    description:
      "赤と白を分けた上で、品種ごとに国別の特徴と代表的なワイン例を見られる構成です。",
    focus: "赤 / 白 → 品種 → 国",
    status: "ready",
    accent: "ruby",
  },
  {
    slug: "beer",
    title: "ビール",
    latinTitle: "Beer",
    description: "スタイルごとの違いを整理する拡張枠です。",
    focus: "スタイル → 地域",
    status: "preview",
    accent: "sunset",
  },
  {
    slug: "shochu",
    title: "焼酎",
    latinTitle: "Shochu",
    description: "原料と蒸留方法を軸に追加できる構成です。",
    focus: "原料 → 造り",
    status: "preview",
    accent: "forest",
  },
  {
    slug: "umeshu",
    title: "梅酒",
    latinTitle: "Umeshu",
    description: "ベース酒や甘さの違いを整理するための枠です。",
    focus: "ベース → 味わい",
    status: "preview",
    accent: "plum",
  },
];

const radar = (values: [number, number, number, number, number]): RadarMetric[] => [
  { label: "香り", value: values[0] },
  { label: "甘み", value: values[1] },
  { label: "コク", value: values[2] },
  { label: "キレ", value: values[3] },
  { label: "余韻", value: values[4] },
];

const facts = (...items: Array<[string, string]>): Fact[] =>
  items.map(([label, value]) => ({ label, value }));

const sakeBottle = (
  name: string,
  style: string,
  summary: string,
  notes: string,
  highlights: string[],
  bottleFacts: Fact[],
  bottleRadar: RadarMetric[],
): SakeBottle => ({
  name,
  style,
  summary,
  notes,
  highlights,
  facts: bottleFacts,
  radar: bottleRadar,
});

const wineBottle = (
  name: string,
  winery: string,
  region: string,
  summary: string,
  highlights: string[],
): WineBottle => ({
  name,
  winery,
  region,
  summary,
  highlights,
});

const wineCountry = (
  slug: string,
  country: string,
  flag: string,
  region: string,
  summary: string,
  bottles: WineBottle[],
): WineCountry => ({
  slug,
  country,
  flag,
  region,
  summary,
  bottles,
});

const sakeBrands: SakeBrand[] = [
  {
    category: "sake",
    slug: "dassai",
    name: "獺祭",
    summary: "華やかでクリーン。純米大吟醸中心で比較しやすいブランドです。",
    story:
      "香りの高さと透明感が特徴で、磨きの違いによる質感差がわかりやすいブランドです。",
    accent: "amber",
    highlights: ["華やか", "クリーン", "純米大吟醸中心"],
    facts: facts(
      ["製造会社", "株式会社 獺祭"],
      ["都道府県", "山口県"],
      ["ブランド傾向", "香りが高く現代的"],
      ["見るポイント", "磨きの違い"],
    ),
    lineup: [
      sakeBottle(
        "獺祭 純米大吟醸45",
        "定番",
        "獺祭らしい華やかさと飲みやすさの中心にある一本。",
        "白桃系の香りと軽やかな甘みで、入口として最もわかりやすいです。",
        ["フルーティー", "軽やか", "定番"],
        facts(["製法", "純米大吟醸"], ["精米歩合", "45%"], ["おすすめ温度", "8-12°C"]),
        radar([4.8, 3.4, 2.8, 4.1, 3.7]),
      ),
      sakeBottle(
        "獺祭 磨き三割九分",
        "上位スタンダード",
        "45よりやや繊細で、香りの精度が上がるタイプ。",
        "甘みが出過ぎず、後半の抜けがよりきれいにまとまります。",
        ["上品", "繊細", "香りがきれい"],
        facts(["製法", "純米大吟醸"], ["精米歩合", "39%"], ["おすすめ温度", "8-10°C"]),
        radar([4.9, 3.2, 2.9, 4.4, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "aramasa",
    name: "新政",
    summary: "酸とフレッシュさで見せる、モダンな日本酒ブランドです。",
    story:
      "クラシックな辛口よりも、酸と瑞々しさのバランスで個性を作るブランドとして比較しやすいです。",
    accent: "ruby",
    highlights: ["モダン", "酸が立つ", "フレッシュ"],
    facts: facts(
      ["製造会社", "新政酒造"],
      ["都道府県", "秋田県"],
      ["ブランド傾向", "酸とフレッシュ感"],
      ["見るポイント", "シリーズ差"],
    ),
    lineup: [
      sakeBottle(
        "No.6 S-type",
        "バランス型",
        "No.6らしいフレッシュ感を保ちながら整ったバランス。",
        "軽いガス感と果実感があり、白ワイン的に感じやすい一本です。",
        ["軽快", "現代的", "飲みやすい"],
        facts(["製法", "生酒"], ["シリーズ", "No.6"], ["おすすめ温度", "8-10°C"]),
        radar([4.2, 3.5, 3.1, 3.8, 4.4]),
      ),
      sakeBottle(
        "Colors 亜麻猫",
        "酸を楽しむタイプ",
        "酸の輪郭が強く、新政らしさが最も伝わりやすい一本。",
        "レモンやヨーグルトのような軽い酸の印象があり、個性が明快です。",
        ["酸が主役", "個性的", "印象が強い"],
        facts(["製法", "生酒"], ["シリーズ", "Colors"], ["おすすめ温度", "6-10°C"]),
        radar([4.0, 3.2, 2.9, 4.2, 4.6]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "kokuryu",
    name: "黒龍",
    summary: "香りとキレの均衡が上品で、和食と合わせやすいブランドです。",
    story:
      "派手すぎず地味すぎない、洗練された酒質で見せるタイプ。食中酒としてのまとまりが高いです。",
    accent: "plum",
    highlights: ["上品", "なめらか", "食中酒向き"],
    facts: facts(
      ["製造会社", "黒龍酒造"],
      ["都道府県", "福井県"],
      ["ブランド傾向", "上品で滑らか"],
      ["見るポイント", "香りとキレの均衡"],
    ),
    lineup: [
      sakeBottle(
        "いっちょらい",
        "定番吟醸",
        "黒龍の入口として最もわかりやすい端正な一本。",
        "刺身や寿司の繊細さを壊しにくく、食事に寄り添いやすいです。",
        ["端正", "定番", "なめらか"],
        facts(["製法", "吟醸"], ["位置づけ", "ブランド定番"], ["おすすめ温度", "10-14°C"]),
        radar([3.8, 2.8, 3.4, 4.0, 3.8]),
      ),
      sakeBottle(
        "純吟",
        "旨み寄り",
        "吟醸のきれいさに少し厚みを足したタイプ。",
        "冷やしすぎない方が旨みが出やすく、食中での安定感があります。",
        ["旨み", "上品", "食事向け"],
        facts(["製法", "純米吟醸"], ["位置づけ", "やや厚みあり"], ["おすすめ温度", "12-15°C"]),
        radar([3.5, 2.9, 3.8, 3.8, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "hakkaisan",
    name: "八海山",
    summary: "淡麗で軽快。新潟らしいすっきり感が見えやすいブランドです。",
    story:
      "シャープな後味と穏やかな香りが特徴で、冷酒から燗まで守備範囲が広いブランドです。",
    accent: "forest",
    highlights: ["淡麗", "軽快", "新潟らしい"],
    facts: facts(
      ["製造会社", "八海醸造"],
      ["都道府県", "新潟県"],
      ["ブランド傾向", "すっきりと軽快"],
      ["見るポイント", "温度で変わる表情"],
    ),
    lineup: [
      sakeBottle(
        "特別本醸造",
        "日常向け",
        "八海山の軽快さを最も素直に感じやすい定番。",
        "雑味が少なく、日常の食卓に自然に馴染むタイプです。",
        ["すっきり", "軽快", "定番"],
        facts(["製法", "特別本醸造"], ["スタイル", "淡麗"], ["おすすめ温度", "12-18°C"]),
        radar([2.5, 2.1, 2.9, 4.8, 3.0]),
      ),
      sakeBottle(
        "純米大吟醸45",
        "上質な淡麗型",
        "軽快さを保ちつつ、香りのきれいさを高めた一本。",
        "白い花のような香りがあり、後味はあくまでクリアです。",
        ["クリア", "上品", "やや華やか"],
        facts(["製法", "純米大吟醸"], ["精米歩合", "45%"], ["おすすめ温度", "8-12°C"]),
        radar([3.6, 2.5, 3.0, 4.6, 3.7]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "kubota",
    name: "久保田",
    summary: "淡麗辛口の代表格として見やすく、種類ごとの差も整理しやすいブランドです。",
    story:
      "シャープな輪郭を軸にしながら、レンジによって旨みや滑らかさの出方が変わります。",
    accent: "sunset",
    highlights: ["淡麗辛口", "端正", "万能"],
    facts: facts(
      ["製造会社", "朝日酒造"],
      ["都道府県", "新潟県"],
      ["ブランド傾向", "辛口寄りで端正"],
      ["見るポイント", "レンジごとの厚み差"],
    ),
    lineup: [
      sakeBottle(
        "千寿",
        "食中酒の中心",
        "久保田の中核。料理に寄り添う辛口寄りの一本。",
        "香りは控えめで、後味のキレがとても素直です。",
        ["食中酒", "辛口寄り", "安定感"],
        facts(["製法", "吟醸"], ["位置づけ", "中心レンジ"], ["おすすめ温度", "10-15°C"]),
        radar([2.8, 2.3, 3.2, 4.7, 3.4]),
      ),
      sakeBottle(
        "萬寿",
        "上位レンジ",
        "久保田らしいキレに、滑らかさと余韻を足した上位酒。",
        "辛口基調ながら硬すぎず、全体が丸く整います。",
        ["上位", "滑らか", "余韻"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "上位"], ["おすすめ温度", "10-14°C"]),
        radar([3.4, 2.7, 3.7, 4.4, 4.1]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "juyondai",
    name: "十四代",
    summary: "果実感と柔らかさで人気が高く、華やか系日本酒の象徴的ブランドです。",
    story:
      "甘みと香りの出方が非常に印象的で、モダンでリッチな日本酒像を代表するブランドです。",
    accent: "ruby",
    highlights: ["華やか", "リッチ", "人気銘柄"],
    facts: facts(
      ["製造会社", "高木酒造"],
      ["都道府県", "山形県"],
      ["ブランド傾向", "果実感と柔らかさ"],
      ["見るポイント", "甘みと余韻"],
    ),
    lineup: [
      sakeBottle(
        "本丸",
        "代表レンジ",
        "十四代の果実感をつかみやすい代表的な一本。",
        "みずみずしい甘みが前に出ますが、後味は重すぎません。",
        ["果実感", "人気", "わかりやすい"],
        facts(["製法", "本醸造系"], ["位置づけ", "定番人気"], ["おすすめ温度", "8-12°C"]),
        radar([4.6, 4.1, 3.3, 3.6, 4.3]),
      ),
      sakeBottle(
        "中取り純米",
        "旨み寄り",
        "柔らかな甘みと厚みをより感じやすい一本。",
        "果実感に米の丸みが重なり、余韻も長めに感じます。",
        ["旨み", "リッチ", "余韻"],
        facts(["製法", "純米"], ["位置づけ", "中取り"], ["おすすめ温度", "10-14°C"]),
        radar([4.4, 4.0, 3.9, 3.3, 4.5]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "dewazakura",
    name: "出羽桜",
    summary: "吟醸酒の入口として親しみやすく、香りの出方が比較しやすいブランドです。",
    story:
      "華やかさを持ちながら極端に重くならず、吟醸酒の基本をつかみやすいです。",
    accent: "plum",
    highlights: ["吟醸の定番", "華やか", "親しみやすい"],
    facts: facts(
      ["製造会社", "出羽桜酒造"],
      ["都道府県", "山形県"],
      ["ブランド傾向", "吟醸らしい香り"],
      ["見るポイント", "香りの出方"],
    ),
    lineup: [
      sakeBottle(
        "桜花吟醸酒",
        "看板酒",
        "吟醸の華やかさを素直に表現した看板的な一本。",
        "メロン系の香りが出やすく、入口として非常にわかりやすいです。",
        ["看板", "華やか", "吟醸らしい"],
        facts(["製法", "吟醸"], ["位置づけ", "看板酒"], ["おすすめ温度", "8-12°C"]),
        radar([4.5, 3.0, 2.9, 4.0, 3.8]),
      ),
      sakeBottle(
        "出羽燦々 純米吟醸",
        "やや旨み寄り",
        "華やかさを残しつつ、米の柔らかさも感じられる一本。",
        "吟醸香に丸みが加わり、食中でも使いやすい印象です。",
        ["バランス", "やわらかい", "食中向き"],
        facts(["製法", "純米吟醸"], ["酒米", "出羽燦々"], ["おすすめ温度", "10-14°C"]),
        radar([4.0, 3.2, 3.4, 3.8, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "born",
    name: "梵",
    summary: "熟成感と上品さの両立が見やすく、ギフト感のあるブランドです。",
    story:
      "きれいな酒質に落ち着いた厚みを重ねるタイプで、ややラグジュアリーな印象に寄りやすいです。",
    accent: "amber",
    highlights: ["熟成感", "上品", "ギフト感"],
    facts: facts(
      ["製造会社", "加藤吉平商店"],
      ["都道府県", "福井県"],
      ["ブランド傾向", "上品で落ち着いた厚み"],
      ["見るポイント", "熟成由来のまとまり"],
    ),
    lineup: [
      sakeBottle(
        "梵 GOLD",
        "ブランド定番",
        "梵の上品なまとまりを感じやすい代表作。",
        "やや落ち着いた香りで、飲み口は滑らかにまとまります。",
        ["上品", "滑らか", "定番"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "代表作"], ["おすすめ温度", "10-14°C"]),
        radar([3.8, 2.9, 3.8, 4.0, 4.2]),
      ),
      sakeBottle(
        "梵 幻",
        "上位レンジ",
        "より密度感があり、余韻の美しさが印象に残る一本。",
        "派手すぎず、後半の伸びで差が出るタイプです。",
        ["上位", "密度感", "余韻"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "上位"], ["おすすめ温度", "10-12°C"]),
        radar([4.0, 2.8, 4.1, 4.1, 4.5]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "kazenomori",
    name: "風の森",
    summary: "微発泡感とフレッシュさが魅力で、モダン日本酒の入口になりやすいブランドです。",
    story:
      "発酵由来のガス感と軽やかさが特徴で、同じブランド内でも米違いの比較が楽しいタイプです。",
    accent: "forest",
    highlights: ["フレッシュ", "ガス感", "モダン"],
    facts: facts(
      ["製造会社", "油長酒造"],
      ["都道府県", "奈良県"],
      ["ブランド傾向", "微発泡で軽快"],
      ["見るポイント", "米違い"],
    ),
    lineup: [
      sakeBottle(
        "秋津穂 657",
        "定番",
        "風の森の世界観をつかみやすい最初の一本。",
        "軽いガス感と透明感があり、非常にフレッシュです。",
        ["定番", "軽快", "フレッシュ"],
        facts(["製法", "無濾過無加水"], ["酒米", "秋津穂"], ["おすすめ温度", "6-10°C"]),
        radar([4.1, 3.1, 2.8, 4.2, 4.0]),
      ),
      sakeBottle(
        "ALPHA 1 次章への扉",
        "モダンライン",
        "風の森の軽快さをより現代的に見せる一本。",
        "甘みと酸のバランスがよく、入口として親しみやすいです。",
        ["モダン", "親しみやすい", "酸がきれい"],
        facts(["製法", "無濾過無加水"], ["シリーズ", "ALPHA"], ["おすすめ温度", "6-10°C"]),
        radar([4.2, 3.4, 2.7, 4.0, 4.1]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "senkin",
    name: "仙禽",
    summary: "酸と水のような透明感が特徴で、ナチュラル寄りの飲み口が魅力です。",
    story:
      "柔らかな果実感と酸が重なり、日本酒らしさとモダンさの中間に位置するブランドです。",
    accent: "sunset",
    highlights: ["透明感", "酸", "ナチュラル"],
    facts: facts(
      ["製造会社", "せんきん"],
      ["都道府県", "栃木県"],
      ["ブランド傾向", "酸と透明感"],
      ["見るポイント", "モダン / クラシック差"],
    ),
    lineup: [
      sakeBottle(
        "モダン仙禽 無垢",
        "モダンライン",
        "仙禽の現代的な飲みやすさを素直に感じられる一本。",
        "果実感がやさしく、酸の出方も角が立ちません。",
        ["モダン", "やわらかい", "果実感"],
        facts(["製法", "生もと系"], ["シリーズ", "モダン"], ["おすすめ温度", "8-12°C"]),
        radar([4.1, 3.4, 2.9, 3.9, 4.1]),
      ),
      sakeBottle(
        "クラシック仙禽 雄町",
        "クラシックライン",
        "モダンよりも旨みの輪郭が少し強く出るタイプ。",
        "酸は残しつつ、厚みと余韻を少し長く感じやすいです。",
        ["旨み", "余韻", "バランス"],
        facts(["製法", "生もと系"], ["シリーズ", "クラシック"], ["おすすめ温度", "10-14°C"]),
        radar([3.9, 3.3, 3.5, 3.7, 4.2]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "hiroki",
    name: "飛露喜",
    summary: "きれいさと旨みのバランスが高く、玄人にも人気の高いブランドです。",
    story:
      "端正さを土台にしながら、飲み口に丸みもあり、派手さではなく完成度で魅せるタイプです。",
    accent: "plum",
    highlights: ["完成度", "旨み", "人気"],
    facts: facts(
      ["製造会社", "廣木酒造本店"],
      ["都道府県", "福島県"],
      ["ブランド傾向", "きれいさと旨みの両立"],
      ["見るポイント", "滑らかさ"],
    ),
    lineup: [
      sakeBottle(
        "特別純米",
        "代表作",
        "飛露喜のバランスの良さを最も感じやすい一本。",
        "旨みはありつつ重くならず、後半も自然に流れます。",
        ["代表作", "バランス", "旨み"],
        facts(["製法", "特別純米"], ["位置づけ", "代表作"], ["おすすめ温度", "10-14°C"]),
        radar([3.5, 3.0, 3.8, 4.0, 4.0]),
      ),
      sakeBottle(
        "純米吟醸",
        "上品寄り",
        "特別純米より少しきれいで軽やかな表情。",
        "香りがほんのり上がり、輪郭がより整って見えます。",
        ["上品", "きれい", "軽快"],
        facts(["製法", "純米吟醸"], ["位置づけ", "上品寄り"], ["おすすめ温度", "8-12°C"]),
        radar([3.8, 2.8, 3.4, 4.2, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "nabeshima",
    name: "鍋島",
    summary: "華やかさとクリアさのバランスが良く、近年人気の高いブランドです。",
    story:
      "果実感はあるものの重くなりすぎず、全体にクリーンなまとまりがあります。",
    accent: "ruby",
    highlights: ["華やか", "クリーン", "人気"],
    facts: facts(
      ["製造会社", "富久千代酒造"],
      ["都道府県", "佐賀県"],
      ["ブランド傾向", "華やかでクリア"],
      ["見るポイント", "果実感の軽さ"],
    ),
    lineup: [
      sakeBottle(
        "特別純米",
        "定番",
        "鍋島の飲みやすさを素直に感じる定番レンジ。",
        "果実感はあるのに重くならず、非常に親しみやすいです。",
        ["定番", "親しみやすい", "バランス"],
        facts(["製法", "特別純米"], ["位置づけ", "定番"], ["おすすめ温度", "10-14°C"]),
        radar([4.0, 3.4, 3.2, 3.9, 4.0]),
      ),
      sakeBottle(
        "純米吟醸 山田錦",
        "やや上位",
        "鍋島の華やかさを少し上品に見せる一本。",
        "香りの立ち上がりがきれいで、飲み口もなめらかです。",
        ["上品", "華やか", "滑らか"],
        facts(["製法", "純米吟醸"], ["酒米", "山田錦"], ["おすすめ温度", "8-12°C"]),
        radar([4.3, 3.3, 3.1, 4.0, 4.1]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "hououbiden",
    name: "鳳凰美田",
    summary: "果実感のある香りと柔らかい口当たりが印象的なブランドです。",
    story:
      "甘みと香りがしっかり感じられる一方で、後味は極端に重くなりすぎないバランス型です。",
    accent: "sunset",
    highlights: ["果実感", "やわらかい", "華やか"],
    facts: facts(
      ["製造会社", "小林酒造"],
      ["都道府県", "栃木県"],
      ["ブランド傾向", "柔らかく華やか"],
      ["見るポイント", "甘みの丸さ"],
    ),
    lineup: [
      sakeBottle(
        "純米吟醸 無濾過本生",
        "ブランドらしさが出る",
        "鳳凰美田の果実感をまっすぐ感じやすい一本。",
        "桃系の香りと丸い甘みがあり、入口としてわかりやすいです。",
        ["果実感", "やわらかい", "本生"],
        facts(["製法", "純米吟醸"], ["状態", "無濾過本生"], ["おすすめ温度", "8-10°C"]),
        radar([4.5, 3.8, 3.2, 3.5, 4.1]),
      ),
      sakeBottle(
        "Black Phoenix",
        "個性派",
        "鳳凰美田の中でもやや個性を感じやすいライン。",
        "厚みと果実味があり、飲みごたえが少し増します。",
        ["個性的", "厚み", "余韻"],
        facts(["製法", "純米吟醸系"], ["位置づけ", "個性派"], ["おすすめ温度", "10-12°C"]),
        radar([4.4, 3.9, 3.8, 3.2, 4.3]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "kuheiji",
    name: "醸し人九平次",
    summary: "食との相性も意識された、洗練度の高いモダンブランドです。",
    story:
      "ワイン的な視点でも語られやすく、香りと酸、ミネラル感のような印象が整理しやすいです。",
    accent: "forest",
    highlights: ["洗練", "モダン", "食との相性"],
    facts: facts(
      ["製造会社", "萬乗醸造"],
      ["都道府県", "愛知県"],
      ["ブランド傾向", "洗練されたモダン型"],
      ["見るポイント", "酸と質感"],
    ),
    lineup: [
      sakeBottle(
        "EAU DU DESIR",
        "代表作",
        "九平次のモダンな質感を素直に感じやすい看板的な一本。",
        "果実感はあるものの、輪郭が細く、食中でも使いやすいです。",
        ["代表作", "モダン", "細い輪郭"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "代表作"], ["おすすめ温度", "8-12°C"]),
        radar([4.2, 3.0, 3.0, 4.1, 4.2]),
      ),
      sakeBottle(
        "彼の地",
        "上位寄り",
        "より密度と余韻を感じやすい、少し上位の表情。",
        "派手な甘みよりも、後半の伸びとまとまりで魅せます。",
        ["上位", "余韻", "洗練"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "上位寄り"], ["おすすめ温度", "10-12°C"]),
        radar([4.1, 2.9, 3.4, 4.0, 4.5]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "zaku",
    name: "作",
    summary: "クリーンさと果実感のバランスが良く、現代的で比較しやすいブランドです。",
    story:
      "透明感のある飲み口とやさしい香りが特徴で、種類ごとの差も追いやすいブランドです。",
    accent: "amber",
    highlights: ["クリーン", "現代的", "バランス"],
    facts: facts(
      ["製造会社", "清水清三郎商店"],
      ["都道府県", "三重県"],
      ["ブランド傾向", "クリアでモダン"],
      ["見るポイント", "香りの穏やかさ"],
    ),
    lineup: [
      sakeBottle(
        "穂乃智",
        "定番",
        "作のクリアさを一番つかみやすい入口の一本。",
        "軽い果実感がありつつ、重さは出にくい設計です。",
        ["定番", "クリア", "飲みやすい"],
        facts(["製法", "純米"], ["位置づけ", "入口向け"], ["おすすめ温度", "10-14°C"]),
        radar([3.7, 3.0, 3.1, 4.2, 3.9]),
      ),
      sakeBottle(
        "雅乃智",
        "やや上位",
        "作らしい透明感に、少し華やかさを足した人気レンジ。",
        "香りの立ち方がきれいで、後味もなめらかです。",
        ["華やか", "人気", "なめらか"],
        facts(["製法", "純米吟醸"], ["位置づけ", "人気レンジ"], ["おすすめ温度", "8-12°C"]),
        radar([4.2, 3.1, 3.0, 4.1, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "masumi",
    name: "真澄",
    summary: "食中向きの安定感と、ややクラシックな整い方が魅力のブランドです。",
    story:
      "長野の老舗として知られ、派手すぎない香りと食事に寄り添うバランスで比較しやすいブランドです。",
    accent: "forest",
    highlights: ["食中向き", "安定感", "老舗"],
    facts: facts(
      ["製造会社", "宮坂醸造"],
      ["都道府県", "長野県"],
      ["ブランド傾向", "食と合わせやすい"],
      ["見るポイント", "香りの穏やかさ"],
    ),
    lineup: [
      sakeBottle(
        "真澄 奥伝寒造り",
        "定番",
        "真澄らしい安定感をつかみやすい定番レンジ。",
        "穏やかな香りとすっきりした後味で、普段の食事に寄り添いやすいです。",
        ["穏やか", "食中向き", "定番"],
        facts(["製法", "本醸造系"], ["位置づけ", "定番"], ["おすすめ温度", "10-15°C"]),
        radar([3.0, 2.5, 3.2, 4.4, 3.8]),
      ),
      sakeBottle(
        "真澄 山花",
        "上品寄り",
        "穏やかさを保ちながら、少し上品な質感を持つ一本。",
        "食事を邪魔しない香りの出方で、後半のまとまりもきれいです。",
        ["上品", "まとまり", "やわらかい"],
        facts(["製法", "純米大吟醸"], ["位置づけ", "上品寄り"], ["おすすめ温度", "8-12°C"]),
        radar([3.5, 2.8, 3.3, 4.2, 4.0]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "nanbu-bijin",
    name: "南部美人",
    summary: "クリーンさと柔らかい旨みのバランスが良く、海外でも評価の高いブランドです。",
    story:
      "岩手らしいきれいな酒質を持ちつつ、軽さだけでなくやわらかい旨みも感じやすいブランドです。",
    accent: "ruby",
    highlights: ["クリーン", "柔らかい旨み", "海外評価が高い"],
    facts: facts(
      ["製造会社", "株式会社南部美人"],
      ["都道府県", "岩手県"],
      ["ブランド傾向", "きれいで柔らかい"],
      ["見るポイント", "旨みの丸さ"],
    ),
    lineup: [
      sakeBottle(
        "特別純米",
        "代表作",
        "南部美人のバランスの良さをもっともつかみやすい一本。",
        "旨みがありつつ後味はきれいで、幅広い料理に合わせやすいです。",
        ["代表作", "バランス", "食中向き"],
        facts(["製法", "特別純米"], ["位置づけ", "代表作"], ["おすすめ温度", "10-14°C"]),
        radar([3.6, 3.0, 3.6, 4.0, 4.0]),
      ),
      sakeBottle(
        "純米吟醸",
        "やや上品",
        "特別純米より少し香りが上がり、軽やかに感じやすい一本。",
        "きれいな果実感がありながら、輪郭はあくまで素直です。",
        ["上品", "軽やか", "きれい"],
        facts(["製法", "純米吟醸"], ["位置づけ", "上品寄り"], ["おすすめ温度", "8-12°C"]),
        radar([4.0, 2.9, 3.2, 4.1, 4.1]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "kikusui",
    name: "菊水",
    summary: "新潟らしい軽快さを持ちながら、比較的親しみやすいレンジも多いブランドです。",
    story:
      "淡麗な方向を軸にしながら、日常向けから少し個性のあるラインまで揃っていて、入りやすいブランドです。",
    accent: "sunset",
    highlights: ["新潟", "軽快", "親しみやすい"],
    facts: facts(
      ["製造会社", "菊水酒造"],
      ["都道府県", "新潟県"],
      ["ブランド傾向", "軽快で親しみやすい"],
      ["見るポイント", "日常向けの使いやすさ"],
    ),
    lineup: [
      sakeBottle(
        "ふなぐち一番しぼり",
        "個性派定番",
        "菊水の中でも存在感が強く、濃さとフレッシュ感が伝わりやすい一本。",
        "飲みごたえがあり、通常の淡麗辛口とは少し違う個性を楽しめます。",
        ["濃い", "フレッシュ", "個性派"],
        facts(["製法", "生原酒系"], ["位置づけ", "人気定番"], ["おすすめ温度", "6-10°C"]),
        radar([3.7, 3.8, 4.1, 3.2, 4.0]),
      ),
      sakeBottle(
        "純米吟醸",
        "軽快寄り",
        "よりきれいで軽やかな方向を見やすい一本。",
        "香りは穏やかで、日常の食事にも取り入れやすいです。",
        ["軽快", "穏やか", "日常向き"],
        facts(["製法", "純米吟醸"], ["位置づけ", "軽快寄り"], ["おすすめ温度", "8-12°C"]),
        radar([3.4, 2.7, 3.0, 4.3, 3.7]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "tedorigawa",
    name: "手取川",
    summary: "透明感と穏やかな香りが特徴で、北陸のきれいな酒質を感じやすいブランドです。",
    story:
      "重すぎず軽すぎず、食中で使いやすいきれいなまとまりが魅力です。",
    accent: "amber",
    highlights: ["透明感", "穏やか", "食中向き"],
    facts: facts(
      ["製造会社", "吉田酒造店"],
      ["都道府県", "石川県"],
      ["ブランド傾向", "きれいで穏やか"],
      ["見るポイント", "透明感"],
    ),
    lineup: [
      sakeBottle(
        "吉田蔵u",
        "モダンライン",
        "手取川の中でも軽快でモダンな印象が伝わるライン。",
        "酸の出方がきれいで、現代的な日本酒として入りやすいです。",
        ["モダン", "軽快", "酸"],
        facts(["製法", "モダン系"], ["位置づけ", "新しい柱"], ["おすすめ温度", "8-12°C"]),
        radar([3.9, 3.1, 2.8, 4.1, 4.0]),
      ),
      sakeBottle(
        "大吟醸 名流",
        "クラシック寄り",
        "香りの上品さとすっきり感のバランスが良い一本。",
        "派手さよりも、なめらかな流れ方で差が見えます。",
        ["上品", "すっきり", "なめらか"],
        facts(["製法", "大吟醸"], ["位置づけ", "上品寄り"], ["おすすめ温度", "8-10°C"]),
        radar([4.1, 2.6, 3.1, 4.3, 4.1]),
      ),
    ],
  },
  {
    category: "sake",
    slug: "gekkeikan",
    name: "月桂冠",
    summary: "歴史ある大手ブランドで、スタンダードな日本酒像を掴む起点として使いやすいです。",
    story:
      "親しみやすい日常酒の印象が強い一方で、吟醸系との違いも整理しやすいブランドです。",
    accent: "plum",
    highlights: ["歴史ある", "親しみやすい", "スタンダード"],
    facts: facts(
      ["製造会社", "月桂冠株式会社"],
      ["都道府県", "京都府"],
      ["ブランド傾向", "スタンダードで親しみやすい"],
      ["見るポイント", "日常酒と吟醸系の差"],
    ),
    lineup: [
      sakeBottle(
        "月桂冠 上撰",
        "スタンダード",
        "もっともベーシックな日本酒像を掴みやすい一本。",
        "穏やかで癖が少なく、日常酒としての使いやすさがあります。",
        ["ベーシック", "穏やか", "日常酒"],
        facts(["製法", "普通酒系"], ["位置づけ", "スタンダード"], ["おすすめ温度", "常温-燗"]),
        radar([2.6, 2.7, 3.1, 3.8, 3.2]),
      ),
      sakeBottle(
        "月桂冠 The Shot 大吟醸",
        "現代的レンジ",
        "より軽やかで香りも感じやすいモダン寄りの一本。",
        "カジュアルに飲みやすく、日本酒の入口として使いやすいです。",
        ["現代的", "軽やか", "入口向け"],
        facts(["製法", "大吟醸"], ["位置づけ", "モダン寄り"], ["おすすめ温度", "8-12°C"]),
        radar([3.8, 2.8, 2.8, 4.0, 3.7]),
      ),
    ],
  },
];

const wineVarieties: WineVariety[] = [
  {
    category: "wine",
    slug: "cabernet-sauvignon",
    name: "カベルネ・ソーヴィニヨン",
    style: "red",
    summary: "骨格が強く、黒系果実とタンニンが特徴の王道赤品種です。",
    story:
      "国ごとにクラシックさ、果実の厚み、飲みやすさの差が出やすく、比較に向いています。",
    accent: "ruby",
    highlights: ["フルボディ", "黒果実", "タンニン"],
    facts: facts(
      ["主なスタイル", "重厚な赤"],
      ["香りの方向", "カシス / 杉 / スパイス"],
      ["見るポイント", "タンニンと果実味"],
      ["相性", "赤身肉 / 熟成チーズ"],
    ),
    radar: radar([3.9, 2.1, 4.8, 3.2, 4.6]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Bordeaux",
        "端正でクラシックな骨格が出やすいです。",
        [
          wineBottle("Chateau Lynch-Bages", "Pauillac", "Bordeaux", "骨格と果実味の均衡がよい代表例。", ["クラシック", "骨格"]),
          wineBottle("Chateau Montrose", "Saint-Estephe", "Bordeaux", "より引き締まったタンニンが印象的。", ["重厚", "長熟"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Napa Valley",
        "果実味と樽感が前に出やすく、豪華さがわかりやすいです。",
        [
          wineBottle("Robert Mondavi Cabernet Sauvignon", "Robert Mondavi Winery", "Napa Valley", "果実味と樽感のバランスが取りやすい一本。", ["リッチ", "樽感"]),
          wineBottle("Caymus Cabernet Sauvignon", "Caymus Vineyards", "Napa Valley", "濃密でなめらかなアメリカ的スタイル。", ["濃密", "豪華"]),
        ],
      ),
      wineCountry(
        "chile",
        "チリ",
        "🇨🇱",
        "Colchagua / Puente Alto",
        "熟した果実味と価格バランスの良さが魅力です。",
        [
          wineBottle("Montes Alpha Cabernet Sauvignon", "Montes", "Colchagua Valley", "飲みごたえと親しみやすさのバランス型。", ["果実味", "コスパ"]),
          wineBottle("Don Melchor", "Concha y Toro", "Puente Alto", "チリの上位レンジを象徴する完成度の高い例。", ["上位", "完成度"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "pinot-noir",
    name: "ピノ・ノワール",
    style: "red",
    summary: "軽やかで繊細。質感と香りの細やかさで差が出る赤品種です。",
    story:
      "厚みよりもエレガンスが主役。国ごとに果実の明るさと土っぽさの出方が変わります。",
    accent: "plum",
    highlights: ["エレガント", "軽やか", "繊細"],
    facts: facts(
      ["主なスタイル", "繊細な赤"],
      ["香りの方向", "チェリー / 紅茶 / 土"],
      ["見るポイント", "質感の細さ"],
      ["相性", "鴨肉 / きのこ料理"],
    ),
    radar: radar([4.4, 2.6, 2.8, 3.6, 4.2]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Burgundy",
        "土や紅茶のような複雑さと繊細さが出やすいです。",
        [
          wineBottle("Louis Jadot Bourgogne Pinot Noir", "Louis Jadot", "Burgundy", "ブルゴーニュの入口として理解しやすい一本。", ["繊細", "赤果実"]),
          wineBottle("Joseph Drouhin Bourgogne Pinot Noir", "Joseph Drouhin", "Burgundy", "軽やかで上品なクラシックスタイル。", ["上品", "クラシック"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California / Oregon",
        "果実のふくらみが出やすく、親しみやすい印象になります。",
        [
          wineBottle("Meiomi Pinot Noir", "Meiomi", "California", "果実感が前に出る親しみやすいスタイル。", ["果実感", "まろやか"]),
          wineBottle("Domaine Drouhin Pinot Noir", "Domaine Drouhin Oregon", "Oregon", "果実味と繊細さのバランスが良い一本。", ["バランス", "透明感"]),
        ],
      ),
      wineCountry(
        "new-zealand",
        "ニュージーランド",
        "🇳🇿",
        "Marlborough / Central Otago",
        "透明感ある果実味ときれいな酸が出やすいです。",
        [
          wineBottle("Cloudy Bay Pinot Noir", "Cloudy Bay", "Marlborough", "明るい果実味と軽快さが感じやすい例。", ["ピュア", "明るい"]),
          wineBottle("Felton Road Bannockburn Pinot Noir", "Felton Road", "Central Otago", "凝縮感と冷涼感を併せ持つ上質な一本。", ["凝縮", "冷涼感"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "merlot",
    name: "メルロー",
    style: "red",
    summary: "カベルネより柔らかく、丸みのある果実味を感じやすい赤品種です。",
    story:
      "国によってクラシックな上品さから親しみやすい果実型まで振れ幅があります。",
    accent: "sunset",
    highlights: ["丸み", "なめらか", "中庸"],
    facts: facts(
      ["主なスタイル", "中庸からややリッチ"],
      ["香りの方向", "プラム / チョコ / ハーブ"],
      ["見るポイント", "果実味の丸さ"],
      ["相性", "煮込み / ハンバーグ"],
    ),
    radar: radar([3.5, 3.1, 4.0, 3.3, 4.0]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Pomerol / Saint-Emilion",
        "滑らかさと上品な厚みのバランスが見えやすいです。",
        [
          wineBottle("Chateau Petrus", "Pomerol", "Bordeaux", "メルロー主体の象徴的な存在。", ["象徴的", "滑らか"]),
          wineBottle("Chateau La Fleur-Petrus", "Pomerol", "Bordeaux", "メルローの上品さと深さが伝わる一本。", ["上品", "深み"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Napa Valley",
        "より丸く豊かな果実味が感じやすいです。",
        [
          wineBottle("Duckhorn Merlot", "Duckhorn Vineyards", "Napa Valley", "ナパのメルローらしいまろやかさが出る定番。", ["まろやか", "果実味"]),
          wineBottle("Decoy Merlot", "Decoy", "California", "親しみやすく、入口向けにわかりやすい一本。", ["親しみやすい", "やわらかい"]),
        ],
      ),
      wineCountry(
        "chile",
        "チリ",
        "🇨🇱",
        "Colchagua / Rapel",
        "熟した果実味がストレートに出やすいです。",
        [
          wineBottle("Montes Alpha Merlot", "Montes", "Colchagua Valley", "果実味と厚みのバランスが良いスタイル。", ["果実味", "厚み"]),
          wineBottle("Casa Lapostolle Merlot", "Lapostolle", "Rapel Valley", "滑らかで飲みやすいチリの代表例。", ["滑らか", "飲みやすい"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "syrah-shiraz",
    name: "シラー / シラーズ",
    style: "red",
    summary: "黒胡椒感と濃さが魅力で、国によって表情差が非常に大きい赤品種です。",
    story:
      "フランスでは引き締まり、オーストラリアでは豊かさ、アメリカでは果実感が前に出やすいです。",
    accent: "forest",
    highlights: ["スパイス", "濃さ", "黒胡椒"],
    facts: facts(
      ["主なスタイル", "スパイシーな赤"],
      ["香りの方向", "黒胡椒 / ブルーベリー / スモーク"],
      ["見るポイント", "スパイスと濃さ"],
      ["相性", "ラム / グリル料理"],
    ),
    radar: radar([4.0, 2.6, 4.5, 3.4, 4.4]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Rhone",
        "黒胡椒や鉄っぽさを伴う引き締まった印象になりやすいです。",
        [
          wineBottle("E. Guigal Crozes-Hermitage", "E. Guigal", "Rhone", "ローヌのシラーらしいスパイス感が伝わる一本。", ["スパイス", "引き締まり"]),
          wineBottle("M. Chapoutier Crozes-Hermitage", "M. Chapoutier", "Rhone", "果実と胡椒感のバランスが良い例。", ["黒胡椒", "バランス"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Barossa / McLaren Vale",
        "より豊かでボリューム感あるスタイルになりやすいです。",
        [
          wineBottle("Penfolds Bin 28 Shiraz", "Penfolds", "Barossa", "オーストラリアらしい厚みがわかりやすい一本。", ["豊か", "厚み"]),
          wineBottle("d'Arenberg Dead Arm Shiraz", "d'Arenberg", "McLaren Vale", "濃密さとスパイス感を併せ持つ代表例。", ["濃密", "スパイス"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California / Washington",
        "果実味が前に出やすく、やや親しみやすい印象になります。",
        [
          wineBottle("Cline Ancient Vines Syrah", "Cline Cellars", "California", "熟した果実味が前に出るスタイル。", ["果実味", "親しみやすい"]),
          wineBottle("K Vintners The Deal Syrah", "K Vintners", "Washington", "濃さとスパイス感のバランスが良い一本。", ["濃さ", "スパイス"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "malbec",
    name: "マルベック",
    style: "red",
    summary: "紫系果実と力強さが特徴で、アルゼンチンで特に存在感を持つ赤品種です。",
    story:
      "アルゼンチンの豊かなスタイルを軸に、フランスの引き締まりやチリの親しみやすさが比較できます。",
    accent: "plum",
    highlights: ["紫果実", "力強い", "アルゼンチン"],
    facts: facts(
      ["主なスタイル", "濃く力強い赤"],
      ["香りの方向", "ブラックベリー / スミレ / カカオ"],
      ["見るポイント", "濃さと柔らかさ"],
      ["相性", "グリル肉 / ハードチーズ"],
    ),
    radar: radar([3.8, 2.8, 4.5, 3.2, 4.2]),
    countries: [
      wineCountry(
        "argentina",
        "アルゼンチン",
        "🇦🇷",
        "Mendoza",
        "豊かで果実味が前に出るマルベックの中心地です。",
        [
          wineBottle("Catena Malbec", "Bodega Catena Zapata", "Mendoza", "アルゼンチンらしい果実味をつかみやすい定番。", ["果実味", "定番"]),
          wineBottle("Achaval Ferrer Malbec", "Achaval Ferrer", "Mendoza", "凝縮感と上品さを両立した上位例。", ["凝縮", "上品"]),
        ],
      ),
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Cahors",
        "より引き締まり、土っぽいニュアンスも出やすいです。",
        [
          wineBottle("Clos Triguedina Cahors Malbec", "Clos Triguedina", "Cahors", "フランスのマルベックらしい渋みと深さ。", ["引き締まり", "深み"]),
          wineBottle("Chateau du Cedre Cahors", "Chateau du Cedre", "Cahors", "骨格がしっかりしたクラシックな例。", ["骨格", "クラシック"]),
        ],
      ),
      wineCountry(
        "chile",
        "チリ",
        "🇨🇱",
        "Colchagua / Maipo",
        "果実味を保ちつつ、親しみやすくまとまりやすいです。",
        [
          wineBottle("Montes Alpha Malbec", "Montes", "Colchagua Valley", "果実の濃さと飲みやすさを両立。", ["濃さ", "飲みやすい"]),
          wineBottle("Santa Rita Medalla Real Malbec", "Santa Rita", "Maipo Valley", "チリらしいわかりやすい果実型。", ["果実型", "親しみやすい"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "tempranillo",
    name: "テンプラニーリョ",
    style: "red",
    summary: "赤果実と熟成香の両方を見やすく、スペインを代表する赤品種です。",
    story:
      "若いうちは赤い果実、熟成でバニラやリコリスも出やすく、樽との相性も良い品種です。",
    accent: "sunset",
    highlights: ["スペイン代表", "熟成向き", "赤果実"],
    facts: facts(
      ["主なスタイル", "樽熟成に強い赤"],
      ["香りの方向", "プラム / 赤果実 / バニラ"],
      ["見るポイント", "若さと熟成感"],
      ["相性", "生ハム / ローストポーク"],
    ),
    radar: radar([3.6, 2.7, 4.0, 3.8, 4.2]),
    countries: [
      wineCountry(
        "spain",
        "スペイン",
        "🇪🇸",
        "Rioja / Ribera del Duero",
        "クラシックなテンプラニーリョの基準になる国です。",
        [
          wineBottle("Marques de Murrieta Reserva", "Marques de Murrieta", "Rioja", "熟成感と果実味の均衡がよい代表例。", ["熟成", "クラシック"]),
          wineBottle("Vina Alberdi Reserva", "La Rioja Alta", "Rioja", "樽と果実のバランスが美しい定番。", ["樽感", "定番"]),
        ],
      ),
      wineCountry(
        "argentina",
        "アルゼンチン",
        "🇦🇷",
        "Mendoza",
        "より果実味を前に出したスタイルが見やすいです。",
        [
          wineBottle("Norton Reserva Tempranillo", "Bodega Norton", "Mendoza", "テンプラニーリョの果実型としてわかりやすい例。", ["果実型", "飲みやすい"]),
          wineBottle("Finca La Anita Tempranillo", "Finca La Anita", "Mendoza", "柔らかさと厚みが感じやすい一本。", ["柔らかい", "厚み"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Texas / Washington",
        "果実感を前に出しつつ、親しみやすくまとまります。",
        [
          wineBottle("Becker Vineyards Tempranillo", "Becker Vineyards", "Texas", "アメリカのテンプラニーリョとして知名度のある一本。", ["果実味", "親しみやすい"]),
          wineBottle("Pedernales Tempranillo", "Pedernales Cellars", "Texas", "果実感と樽感が素直に伝わるスタイル。", ["樽感", "バランス"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "sangiovese",
    name: "サンジョヴェーゼ",
    style: "red",
    summary: "酸と赤果実が主役で、イタリアらしい食中向きの赤品種です。",
    story:
      "明るい果実味と酸の張りが特徴で、国によって濃さの出方が変わります。",
    accent: "forest",
    highlights: ["酸がきれい", "赤果実", "食中向き"],
    facts: facts(
      ["主なスタイル", "酸のある赤"],
      ["香りの方向", "チェリー / ハーブ / 土"],
      ["見るポイント", "酸と果実のバランス"],
      ["相性", "トマト料理 / 熟成ハム"],
    ),
    radar: radar([3.7, 2.4, 3.5, 4.3, 4.0]),
    countries: [
      wineCountry(
        "italy",
        "イタリア",
        "🇮🇹",
        "Tuscany",
        "サンジョヴェーゼの基準で、酸と旨みの調和が見えやすいです。",
        [
          wineBottle("Fontodi Chianti Classico", "Fontodi", "Tuscany", "酸と果実味の均衡が美しい代表例。", ["酸", "クラシック"]),
          wineBottle("Castello di Ama Chianti Classico", "Castello di Ama", "Tuscany", "上品で食中に合わせやすい一本。", ["上品", "食中向き"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "果実味が少し豊かになり、親しみやすさが増しやすいです。",
        [
          wineBottle("Scott Harvey Sangiovese", "Scott Harvey Wines", "California", "果実感のあるアメリカ型の一例。", ["果実感", "親しみやすい"]),
          wineBottle("Giornata Sangiovese", "Giornata", "California", "酸と明るさをきれいに見せるタイプ。", ["明るい", "酸"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Victoria / South Australia",
        "明るい果実味を保ちながら、ややモダンにまとまりやすいです。",
        [
          wineBottle("Coriole Sangiovese", "Coriole Vineyards", "McLaren Vale", "オーストラリアのサンジョヴェーゼ定番格。", ["モダン", "果実味"]),
          wineBottle("Pizzini Sangiovese", "Pizzini", "Victoria", "軽快さと親しみやすさを持つ一本。", ["軽快", "やわらかい"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "nebbiolo",
    name: "ネッビオーロ",
    style: "red",
    summary: "香り高く、強いタンニンと長い余韻を持つイタリアの名品種です。",
    story:
      "力強いのに香りは繊細で、国ごとの差も感じやすいが、まずはイタリアが基準になります。",
    accent: "plum",
    highlights: ["香り高い", "強いタンニン", "長い余韻"],
    facts: facts(
      ["主なスタイル", "香り高い長熟赤"],
      ["香りの方向", "バラ / タール / チェリー"],
      ["見るポイント", "香りとタンニンの差"],
      ["相性", "煮込み / トリュフ料理"],
    ),
    radar: radar([4.5, 2.1, 4.4, 4.0, 4.8]),
    countries: [
      wineCountry(
        "italy",
        "イタリア",
        "🇮🇹",
        "Barolo / Barbaresco",
        "ネッビオーロの基準で、香りと骨格の両方が強く出ます。",
        [
          wineBottle("Prunotto Barolo", "Prunotto", "Barolo", "ネッビオーロの骨格を理解しやすい一本。", ["骨格", "香り"]),
          wineBottle("Produttori del Barbaresco", "Produttori del Barbaresco", "Barbaresco", "香りと上品さのバランスが良い代表例。", ["上品", "長い余韻"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "イタリアよりやや果実味が前に出て親しみやすくなりやすいです。",
        [
          wineBottle("Vino Noceto Nebbiolo", "Vino Noceto", "California", "アメリカのネッビオーロ例として見やすい一本。", ["果実味", "親しみやすい"]),
          wineBottle("Palmina Nebbiolo", "Palmina", "California", "ネッビオーロの香り高さを残したスタイル。", ["香り", "やわらかい"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Victoria",
        "モダンで少し軽やかな表情になることがあります。",
        [
          wineBottle("Pizzini Nebbiolo", "Pizzini", "Victoria", "親しみやすさのあるオーストラリア例。", ["モダン", "軽快"]),
          wineBottle("Luke Lambert Nebbiolo", "Luke Lambert", "Yarra Valley", "香りの高さと冷涼感が出やすい一本。", ["冷涼感", "香り"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "chardonnay",
    name: "シャルドネ",
    style: "white",
    summary: "造りと産地で大きく表情が変わる、白ワインの中心的品種です。",
    story:
      "シャープにもリッチにもなり得るため、白ワインの幅を知る入口に最適です。",
    accent: "amber",
    highlights: ["白の定番", "幅広い", "造りで差が出る"],
    facts: facts(
      ["主なスタイル", "シャープからリッチまで幅広い"],
      ["香りの方向", "柑橘 / りんご / バター"],
      ["見るポイント", "酸と樽感"],
      ["相性", "白身魚 / クリーム系"],
    ),
    radar: radar([3.7, 2.8, 4.1, 3.1, 3.9]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Burgundy",
        "ミネラル感からふくよかさまで、基準になるスタイルが揃います。",
        [
          wineBottle("William Fevre Chablis", "Domaine William Fevre", "Chablis", "シャープでミネラル感ある代表的シャルドネ。", ["ミネラル", "シャープ"]),
          wineBottle("Louis Latour Meursault", "Louis Latour", "Meursault", "よりリッチでバター感も出やすい一本。", ["リッチ", "バター感"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California / Napa Valley",
        "熟した果実味と樽由来の厚みが前に出やすいです。",
        [
          wineBottle("Kendall-Jackson Vintner's Reserve Chardonnay", "Kendall-Jackson", "California", "アメリカのリッチなシャルドネ像を掴みやすい定番。", ["リッチ", "親しみやすい"]),
          wineBottle("Far Niente Chardonnay", "Far Niente", "Napa Valley", "完成度の高い上位レンジの代表例。", ["上位", "厚み"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Adelaide Hills / Margaret River",
        "近年は重すぎず、果実味と酸のバランス型も多いです。",
        [
          wineBottle("Penfolds Bin 311 Chardonnay", "Penfolds", "Multi-region Australia", "果実味と酸のバランスが良い一本。", ["バランス", "モダン"]),
          wineBottle("Leeuwin Estate Prelude Chardonnay", "Leeuwin Estate", "Margaret River", "柑橘感と樽のまとまりがきれいな例。", ["柑橘", "上品"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "sauvignon-blanc",
    name: "ソーヴィニヨン・ブラン",
    style: "white",
    summary: "爽快感とハーブ感が主役で、冷やして魅力が伝わりやすい白品種です。",
    story:
      "国によってハーバルさ、トロピカル感、ミネラル感のバランスが変わります。",
    accent: "forest",
    highlights: ["爽快", "ハーバル", "きれいな酸"],
    facts: facts(
      ["主なスタイル", "シャープな白"],
      ["香りの方向", "グレープフルーツ / ハーブ"],
      ["見るポイント", "ハーブ感と酸"],
      ["相性", "牡蠣 / 山羊チーズ"],
    ),
    radar: radar([4.5, 2.0, 2.4, 4.8, 3.2]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Loire",
        "ミネラル感と引き締まった酸が魅力です。",
        [
          wineBottle("Pascal Jolivet Sancerre", "Pascal Jolivet", "Loire", "ロワールらしいシャープさを感じやすい一本。", ["シャープ", "ミネラル"]),
          wineBottle("Domaine Vacheron Sancerre", "Domaine Vacheron", "Loire", "より緻密で上品な印象にまとまる例。", ["上品", "緻密"]),
        ],
      ),
      wineCountry(
        "new-zealand",
        "ニュージーランド",
        "🇳🇿",
        "Marlborough",
        "ハーブ感とトロピカル感がはっきり出やすいです。",
        [
          wineBottle("Cloudy Bay Sauvignon Blanc", "Cloudy Bay", "Marlborough", "世界的に有名なニュージーランド代表例。", ["有名", "ハーバル"]),
          wineBottle("Dog Point Sauvignon Blanc", "Dog Point Vineyard", "Marlborough", "香りの強さと輪郭のきれいさが印象的。", ["香りが強い", "クリア"]),
        ],
      ),
      wineCountry(
        "chile",
        "チリ",
        "🇨🇱",
        "Casablanca / Leyda",
        "爽快さを保ちつつ、比較的親しみやすいスタイルになりやすいです。",
        [
          wineBottle("Montes Limited Selection Sauvignon Blanc", "Montes", "Casablanca Valley", "チリの爽快なソーヴィニヨン例。", ["爽快", "親しみやすい"]),
          wineBottle("Casa Lapostolle Sauvignon Blanc", "Lapostolle", "Rapel Valley", "果実味と酸のバランスが良い一本。", ["果実味", "バランス"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "riesling",
    name: "リースリング",
    style: "white",
    summary: "高い酸と透明感が魅力で、辛口から甘口まで幅広い白品種です。",
    story:
      "国や地域で甘さ、香り、ミネラル感の出方がかなり変わる比較しがいのある品種です。",
    accent: "sunset",
    highlights: ["高い酸", "透明感", "幅広い甘辛"],
    facts: facts(
      ["主なスタイル", "高酸で透明感ある白"],
      ["香りの方向", "ライム / 白い花 / ミネラル"],
      ["見るポイント", "酸と残糖"],
      ["相性", "スパイス料理 / 豚肉"],
    ),
    radar: radar([4.2, 3.1, 2.5, 4.6, 4.0]),
    countries: [
      wineCountry(
        "germany",
        "ドイツ",
        "🇩🇪",
        "Mosel / Rheingau",
        "リースリングの本場で、酸と透明感の基準になります。",
        [
          wineBottle("Dr. Loosen Blue Slate Riesling", "Dr. Loosen", "Mosel", "ドイツらしい透明感を感じやすい一本。", ["透明感", "高酸"]),
          wineBottle("Schloss Johannisberg Gelblack", "Schloss Johannisberg", "Rheingau", "クラシックなドイツリースリングの代表例。", ["クラシック", "上品"]),
        ],
      ),
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Alsace",
        "よりドライで密度感のある方向に寄りやすいです。",
        [
          wineBottle("Trimbach Riesling", "Trimbach", "Alsace", "辛口アルザスの定番として知られる一本。", ["辛口", "定番"]),
          wineBottle("Hugel Riesling", "Hugel", "Alsace", "果実味とドライさのバランスが良い例。", ["ドライ", "果実味"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Clare / Eden Valley",
        "ライムのような酸と直線的な爽快感が出やすいです。",
        [
          wineBottle("Pewsey Vale Riesling", "Pewsey Vale", "Eden Valley", "オーストラリアのリースリングらしい酸が明快。", ["ライム", "爽快"]),
          wineBottle("Jim Barry Lodge Hill Riesling", "Jim Barry", "Clare Valley", "柑橘感と張りのある酸が魅力。", ["柑橘", "高酸"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "chenin-blanc",
    name: "シュナン・ブラン",
    style: "white",
    summary: "酸と蜜感の両方を持ちやすく、辛口から甘口まで振れ幅の広い白品種です。",
    story:
      "ロワールを基準にしつつ、南アフリカやアメリカでより果実味を前に出した表情も見られます。",
    accent: "amber",
    highlights: ["振れ幅が広い", "酸", "蜜感"],
    facts: facts(
      ["主なスタイル", "高酸で幅広い白"],
      ["香りの方向", "洋梨 / 蜂蜜 / 花"],
      ["見るポイント", "辛口から甘口の幅"],
      ["相性", "鶏料理 / スパイス料理"],
    ),
    radar: radar([3.9, 3.2, 3.1, 4.2, 4.1]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Loire",
        "シュナン・ブランの本場で、酸と複雑さの両方が見えます。",
        [
          wineBottle("Domaine Huet Vouvray", "Domaine Huet", "Loire", "ロワールのシュナンを学ぶ入口として優秀。", ["本場", "複雑"]),
          wineBottle("Clos de la Coulee de Serrant", "Nicolas Joly", "Loire", "個性が強く、奥行きのある代表例。", ["個性的", "奥行き"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "果実味を少し前に出したスタイルになりやすいです。",
        [
          wineBottle("Leo Steen Saini Farms Chenin Blanc", "Leo Steen", "California", "アメリカのシュナンらしい明るさがある一本。", ["明るい", "果実味"]),
          wineBottle("Dry Creek Vineyard Clarksburg Chenin Blanc", "Dry Creek Vineyard", "California", "親しみやすく爽快な例。", ["爽快", "親しみやすい"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Western Australia",
        "やや軽快でドライな方向にまとまりやすいです。",
        [
          wineBottle("West Cape Howe Chenin Blanc", "West Cape Howe", "Western Australia", "オーストラリアの軽快なシュナン例。", ["軽快", "ドライ"]),
          wineBottle("Voyager Estate Chenin Blanc", "Voyager Estate", "Margaret River", "果実味と酸がきれいに整う一本。", ["酸", "果実味"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "pinot-gris-grigio",
    name: "ピノ・グリ / ピノ・グリージョ",
    style: "white",
    summary: "軽快にも厚みありにも振れやすく、飲み口の差が面白い白品種です。",
    story:
      "イタリアでは軽快、アルザスでは厚み、アメリカでは果実味とのバランスが見えやすいです。",
    accent: "forest",
    highlights: ["軽快", "やわらかい", "スタイル差が大きい"],
    facts: facts(
      ["主なスタイル", "軽快から厚みありまで"],
      ["香りの方向", "梨 / 白桃 / スパイス"],
      ["見るポイント", "軽さと厚み"],
      ["相性", "前菜 / 白身魚"],
    ),
    radar: radar([3.6, 2.8, 3.0, 4.1, 3.7]),
    countries: [
      wineCountry(
        "italy",
        "イタリア",
        "🇮🇹",
        "Friuli / Alto Adige",
        "軽快で親しみやすいスタイルになりやすいです。",
        [
          wineBottle("Jermann Pinot Grigio", "Jermann", "Friuli", "イタリアらしいきれいな軽さが出る一本。", ["軽快", "クリーン"]),
          wineBottle("Livio Felluga Pinot Grigio", "Livio Felluga", "Friuli", "果実味を保ちつつ上品にまとまる例。", ["上品", "果実味"]),
        ],
      ),
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Alsace",
        "より厚みがあり、スパイス感も見えやすくなります。",
        [
          wineBottle("Zind-Humbrecht Pinot Gris", "Zind-Humbrecht", "Alsace", "厚みと香りの複雑さが感じやすい一本。", ["厚み", "複雑"]),
          wineBottle("Trimbach Reserve Pinot Gris", "Trimbach", "Alsace", "ドライさとボリュームの均衡が良い例。", ["ドライ", "ボリューム"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Oregon",
        "果実味と爽快感のバランス型になりやすいです。",
        [
          wineBottle("King Estate Pinot Gris", "King Estate", "Oregon", "アメリカのピノ・グリ代表格。", ["代表格", "果実味"]),
          wineBottle("Elk Cove Pinot Gris", "Elk Cove", "Oregon", "すっきりしつつ香りもきれいな一本。", ["すっきり", "香り"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "gewurztraminer",
    name: "ゲヴュルツトラミネール",
    style: "white",
    summary: "ライチやバラを思わせる非常に個性的な香りが魅力の白品種です。",
    story:
      "香りの強さが主役で、国によって甘さや厚みの出方が変わります。",
    accent: "plum",
    highlights: ["個性的", "アロマティック", "香りが強い"],
    facts: facts(
      ["主なスタイル", "香り主導の白"],
      ["香りの方向", "ライチ / バラ / スパイス"],
      ["見るポイント", "香りの強さと甘さ"],
      ["相性", "エスニック料理 / 青カビチーズ"],
    ),
    radar: radar([5.0, 3.5, 3.0, 2.8, 4.3]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Alsace",
        "ゲヴュルツの基準で、香りと厚みの両方が強く出ます。",
        [
          wineBottle("Trimbach Gewurztraminer", "Trimbach", "Alsace", "香りの輪郭がきれいに伝わる一本。", ["香り", "上品"]),
          wineBottle("Hugel Gewurztraminer", "Hugel", "Alsace", "果実感とスパイス感のバランスが良い例。", ["果実感", "スパイス"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "香りを保ちつつ、やや親しみやすい丸さが出やすいです。",
        [
          wineBottle("Navarro Gewurztraminer", "Navarro Vineyards", "Anderson Valley", "アメリカの定番ゲヴュルツの一つ。", ["定番", "華やか"]),
          wineBottle("Gundlach Bundschu Gewurztraminer", "Gundlach Bundschu", "Sonoma", "果実味と香りの強さが明快な一本。", ["果実味", "香りが強い"]),
        ],
      ),
      wineCountry(
        "new-zealand",
        "ニュージーランド",
        "🇳🇿",
        "Marlborough / Hawke's Bay",
        "香りは豊かでも、やや軽快さを保ちやすいです。",
        [
          wineBottle("Te Whare Ra Gewurztraminer", "Te Whare Ra", "Marlborough", "香り高くもきれいにまとまる例。", ["香り高い", "軽快"]),
          wineBottle("Villa Maria Gewurztraminer", "Villa Maria", "East Coast", "親しみやすく華やかなスタイル。", ["華やか", "親しみやすい"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "viognier",
    name: "ヴィオニエ",
    style: "white",
    summary: "アプリコットや花の香りが強く、リッチさも感じやすい白品種です。",
    story:
      "フランスでは上品、アメリカやオーストラリアでは果実味豊かに見えやすい品種です。",
    accent: "sunset",
    highlights: ["花の香り", "リッチ", "アプリコット"],
    facts: facts(
      ["主なスタイル", "香り高くふくよかな白"],
      ["香りの方向", "アプリコット / 花 / 蜂蜜"],
      ["見るポイント", "香りと厚み"],
      ["相性", "鶏料理 / 香草料理"],
    ),
    radar: radar([4.8, 3.0, 3.8, 2.9, 4.2]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Condrieu",
        "ヴィオニエの基準で、花の香りと上品な厚みが魅力です。",
        [
          wineBottle("E. Guigal Condrieu", "E. Guigal", "Rhone", "フランスのヴィオニエらしい上品さがある一本。", ["上品", "花の香り"]),
          wineBottle("Yves Cuilleron Condrieu La Petite Cote", "Yves Cuilleron", "Rhone", "香りの密度が高く、余韻も長い例。", ["密度感", "余韻"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "果実味がより豊かに感じられ、親しみやすいです。",
        [
          wineBottle("Darioush Viognier", "Darioush", "Napa Valley", "濃密で華やかなアメリカ型ヴィオニエ。", ["濃密", "華やか"]),
          wineBottle("Miner Family Viognier", "Miner Family", "California", "香りの強さと飲みやすさのバランス型。", ["香り", "飲みやすい"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Eden Valley / South Australia",
        "豊かな果実味を持ちつつ、モダンに整うスタイルが見やすいです。",
        [
          wineBottle("Yalumba Eden Valley Viognier", "Yalumba", "Eden Valley", "オーストラリアの代表的ヴィオニエ。", ["代表的", "果実味"]),
          wineBottle("Eden Road Viognier", "Eden Road", "Australia", "香りと軽快さのバランスが良い例。", ["軽快", "バランス"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "cabernet-franc",
    name: "カベルネ・フラン",
    style: "red",
    summary: "カベルネ・ソーヴィニヨンより軽やかで、ハーブや赤果実のニュアンスが出やすい赤品種です。",
    story:
      "ロワールでは軽やかで香り高く、アメリカやアルゼンチンでは果実味が少し前に出やすいです。",
    accent: "ruby",
    highlights: ["ハーブ感", "赤果実", "軽やかな骨格"],
    facts: facts(
      ["主なスタイル", "香り高めの中量級赤"],
      ["香りの方向", "ラズベリー / ハーブ / 胡椒"],
      ["見るポイント", "青さと果実味の均衡"],
      ["相性", "ローストチキン / シャルキュトリ"],
    ),
    radar: radar([4.0, 2.4, 3.3, 4.0, 4.0]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Loire",
        "ロワールでは軽やかで香り高いクラシックな表情が見やすいです。",
        [
          wineBottle("Domaine des Roches Neuves Saumur-Champigny", "Domaine des Roches Neuves", "Loire", "カベルネ・フランの香り高さが伝わりやすい一本。", ["香り", "軽やか"]),
          wineBottle("Clos Rougeard Saumur-Champigny", "Clos Rougeard", "Loire", "繊細さと深みを併せ持つ象徴的な存在。", ["繊細", "深み"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California / New York",
        "果実味が少し豊かで親しみやすい印象になりやすいです。",
        [
          wineBottle("Lang & Reed Cabernet Franc", "Lang & Reed", "California", "アメリカのカベルネ・フラン代表格の一つ。", ["代表格", "果実味"]),
          wineBottle("Chateau Frank Cabernet Franc", "Dr. Konstantin Frank Winery", "Finger Lakes", "冷涼感とハーブ感がきれいに出る一本。", ["冷涼感", "ハーブ"]),
        ],
      ),
      wineCountry(
        "argentina",
        "アルゼンチン",
        "🇦🇷",
        "Mendoza",
        "果実味と滑らかさがやや前に出たスタイルが見やすいです。",
        [
          wineBottle("Catena Appellation Cabernet Franc", "Bodega Catena Zapata", "Mendoza", "アルゼンチンの上質なカベルネ・フラン例。", ["滑らか", "上質"]),
          wineBottle("El Enemigo Cabernet Franc", "El Enemigo", "Mendoza", "濃さと香り高さを両立した人気銘柄。", ["人気", "香り高い"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "grenache-garnacha",
    name: "グルナッシュ / ガルナッチャ",
    style: "red",
    summary: "赤果実とスパイス感が魅力で、温暖な産地で豊かさが出やすい赤品種です。",
    story:
      "スペインでは熟した果実、フランスではブレンドの要、オーストラリアでは親しみやすい果実感が見えやすいです。",
    accent: "sunset",
    highlights: ["赤果実", "スパイス", "温暖地向き"],
    facts: facts(
      ["主なスタイル", "果実味豊かな赤"],
      ["香りの方向", "いちご / スパイス / ハーブ"],
      ["見るポイント", "果実味とアルコール感"],
      ["相性", "グリル料理 / スパイス料理"],
    ),
    radar: radar([4.1, 3.0, 3.9, 3.3, 4.0]),
    countries: [
      wineCountry(
        "spain",
        "スペイン",
        "🇪🇸",
        "Priorat / Campo de Borja",
        "熟した果実味と飲みごたえのあるスタイルが出やすいです。",
        [
          wineBottle("Borsao Tres Picos", "Bodegas Borsao", "Campo de Borja", "果実の濃さがわかりやすい人気のガルナッチャ。", ["果実味", "飲みごたえ"]),
          wineBottle("Clos Mogador", "Clos Mogador", "Priorat", "深みとスパイス感を持つ上位例。", ["深み", "スパイス"]),
        ],
      ),
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Rhone",
        "グルナッシュ主体ブレンドで、丸みとスパイス感が見やすいです。",
        [
          wineBottle("Domaine de la Janasse Chateauneuf-du-Pape", "Domaine de la Janasse", "Rhone", "グルナッシュ主体の豊かなスタイル。", ["豊か", "丸み"]),
          wineBottle("E. Guigal Cotes du Rhone Rouge", "E. Guigal", "Rhone", "親しみやすいローヌスタイルの定番。", ["定番", "親しみやすい"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "McLaren Vale / Barossa",
        "果実味が前に出つつ、親しみやすくまとまりやすいです。",
        [
          wineBottle("Yangarra Old Vine Grenache", "Yangarra", "McLaren Vale", "オーストラリアのグルナッシュ代表例。", ["代表例", "果実味"]),
          wineBottle("Thistledown Gorgeous Grenache", "Thistledown", "South Australia", "軽快さも持つモダンなスタイル。", ["モダン", "軽快"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "zinfandel",
    name: "ジンファンデル",
    style: "red",
    summary: "ジャミーな果実味とスパイス感が魅力で、アメリカを象徴する赤品種の一つです。",
    story:
      "アメリカでは濃く豊かなスタイル、イタリアではプリミティーヴォとしてやや親しみやすく見えます。",
    accent: "plum",
    highlights: ["ジャミー", "スパイス", "アメリカ的"],
    facts: facts(
      ["主なスタイル", "濃く豊かな赤"],
      ["香りの方向", "ブラックベリー / ジャム / 胡椒"],
      ["見るポイント", "果実の濃さ"],
      ["相性", "BBQ / ハンバーガー"],
    ),
    radar: radar([4.0, 3.4, 4.4, 3.0, 4.1]),
    countries: [
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California",
        "ジンファンデルの本場で、濃く親しみやすいスタイルが主流です。",
        [
          wineBottle("Ridge Geyserville", "Ridge Vineyards", "California", "ジンファンデル系ブレンドの代表格。", ["代表格", "濃い"]),
          wineBottle("Seghesio Zinfandel", "Seghesio Family Vineyards", "Sonoma", "果実味の濃さを素直に感じやすい定番。", ["定番", "果実味"]),
        ],
      ),
      wineCountry(
        "italy",
        "イタリア",
        "🇮🇹",
        "Puglia",
        "プリミティーヴォとして、より丸く果実味豊かな印象になります。",
        [
          wineBottle("Tormaresca Torcicoda", "Tormaresca", "Puglia", "プリミティーヴォらしい濃さと甘やかさ。", ["濃い", "甘やか"]),
          wineBottle("Feudi di San Marzano Sessantanni", "San Marzano", "Puglia", "力強く親しみやすい人気銘柄。", ["人気", "力強い"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "South Australia",
        "果実味を前に出しつつ、ややモダンにまとまりやすいです。",
        [
          wineBottle("Berton Reserve Zinfandel", "Berton Vineyards", "South Australia", "オーストラリアのジンファンデル例として見やすい一本。", ["果実味", "親しみやすい"]),
          wineBottle("19 Crimes Red Blend", "19 Crimes", "Australia", "ジンファンデル系の親しみやすい濃さを感じやすいスタイル。", ["濃い", "カジュアル"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "albarino",
    name: "アルバリーニョ",
    style: "white",
    summary: "塩味感や柑橘感が魅力で、魚介と合わせやすい爽快な白品種です。",
    story:
      "スペインでは海っぽいミネラル感、ポルトガルでは軽快さ、アメリカでは果実味の丸さも感じやすいです。",
    accent: "amber",
    highlights: ["魚介向き", "柑橘", "塩味感"],
    facts: facts(
      ["主なスタイル", "爽快でミネラル感ある白"],
      ["香りの方向", "レモン / 白桃 / 塩味感"],
      ["見るポイント", "柑橘感とミネラル"],
      ["相性", "魚介 / セビーチェ"],
    ),
    radar: radar([4.1, 2.4, 2.8, 4.6, 3.9]),
    countries: [
      wineCountry(
        "spain",
        "スペイン",
        "🇪🇸",
        "Rias Baixas",
        "アルバリーニョの本場で、海っぽいミネラル感が魅力です。",
        [
          wineBottle("Martin Codax Albarino", "Bodegas Martin Codax", "Rias Baixas", "本場アルバリーニョの入口としてわかりやすい一本。", ["本場", "爽快"]),
          wineBottle("Pazo de Senorans Albarino", "Pazo de Senorans", "Rias Baixas", "果実味と塩味感のバランスが美しい例。", ["塩味感", "上品"]),
        ],
      ),
      wineCountry(
        "portugal",
        "ポルトガル",
        "🇵🇹",
        "Vinho Verde",
        "Alvarinho 名義で、より軽快で親しみやすい表情も見やすいです。",
        [
          wineBottle("Soalheiro Alvarinho", "Quinta de Soalheiro", "Moncao e Melgaco", "ポルトガル側の代表的な一本。", ["代表的", "軽快"]),
          wineBottle("Anselmo Mendes Muros Antigos Alvarinho", "Anselmo Mendes", "Vinho Verde", "柑橘感と軽やかさのバランス型。", ["柑橘", "軽やか"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "California / Oregon",
        "果実味が少し丸く、親しみやすさが増しやすいです。",
        [
          wineBottle("Bokisch Albarino", "Bokisch Vineyards", "California", "アメリカのアルバリーニョ定番の一つ。", ["定番", "果実味"]),
          wineBottle("Broadley Albarino", "Broadley Vineyards", "Oregon", "爽快さを保ちつつやわらかい印象。", ["爽快", "やわらかい"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "gruner-veltliner",
    name: "グリューナー・ヴェルトリーナー",
    style: "white",
    summary: "白胡椒のようなスパイス感ときれいな酸が魅力のオーストリア代表白品種です。",
    story:
      "オーストリアが基準で、ドライでシャープな方向から少し厚みのある方向まで見やすいです。",
    accent: "forest",
    highlights: ["白胡椒感", "高酸", "オーストリア代表"],
    facts: facts(
      ["主なスタイル", "ドライでスパイシーな白"],
      ["香りの方向", "青りんご / 白胡椒 / ハーブ"],
      ["見るポイント", "酸と白胡椒感"],
      ["相性", "野菜料理 / ウィンナー"],
    ),
    radar: radar([3.8, 2.3, 2.7, 4.7, 4.0]),
    countries: [
      wineCountry(
        "austria",
        "オーストリア",
        "🇦🇹",
        "Wachau / Kamptal",
        "グリューナーの本場で、白胡椒感と高い酸が明快です。",
        [
          wineBottle("Domane Wachau Terrassen Gruner Veltliner", "Domane Wachau", "Wachau", "本場グリューナーの入口として優秀。", ["本場", "高酸"]),
          wineBottle("Brundlmayer Gruner Veltliner Terrassen", "Brundlmayer", "Kamptal", "上品でドライな代表例。", ["上品", "ドライ"]),
        ],
      ),
      wineCountry(
        "germany",
        "ドイツ",
        "🇩🇪",
        "Pfalz / Rheinhessen",
        "オーストリアより少し柔らかく見えるスタイルもあります。",
        [
          wineBottle("Weingut Knipser GV", "Weingut Knipser", "Pfalz", "ドイツでのグリューナー例として見やすい一本。", ["やわらかい", "酸"]),
          wineBottle("Keller Gruner Veltliner", "Weingut Keller", "Rheinhessen", "果実味と緊張感を両立したスタイル。", ["緊張感", "果実味"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Oregon / New York",
        "果実味が少し前に出て、親しみやすくまとまりやすいです。",
        [
          wineBottle("Pike Road Gruner Veltliner", "Pike Road", "Oregon", "アメリカの親しみやすいGVの例。", ["親しみやすい", "爽快"]),
          wineBottle("Boundary Breaks Gruner Veltliner", "Boundary Breaks", "Finger Lakes", "冷涼感のあるすっきりした一本。", ["冷涼感", "すっきり"]),
        ],
      ),
    ],
  },
  {
    category: "wine",
    slug: "semillon",
    name: "セミヨン",
    style: "white",
    summary: "厚みや蜜感、または爽快な熟成感を見せる、意外に幅広い白品種です。",
    story:
      "ボルドーではソーヴィニヨン・ブランとのブレンド、オーストラリアでは軽快な単一品種としても個性が見えます。",
    accent: "sunset",
    highlights: ["蜜感", "厚み", "幅が広い"],
    facts: facts(
      ["主なスタイル", "厚みのある白から軽快な白まで"],
      ["香りの方向", "レモン / 蜜 / ワックス"],
      ["見るポイント", "若さと熟成差"],
      ["相性", "ローストチキン / 白身魚"],
    ),
    radar: radar([3.5, 2.7, 3.9, 3.8, 4.2]),
    countries: [
      wineCountry(
        "france",
        "フランス",
        "🇫🇷",
        "Bordeaux",
        "ボルドーではブレンドで厚みと骨格を支える役割が見えやすいです。",
        [
          wineBottle("Chateau Carbonnieux Blanc", "Chateau Carbonnieux", "Bordeaux", "セミヨンを含むボルドーブランの代表格。", ["厚み", "上品"]),
          wineBottle("Chateau Suduiraut", "Chateau Suduiraut", "Sauternes", "甘口側でのセミヨンの力が見える例。", ["甘口", "蜜感"]),
        ],
      ),
      wineCountry(
        "australia",
        "オーストラリア",
        "🇦🇺",
        "Hunter Valley",
        "若いうちは爽快で、熟成で独特の深みが出やすいです。",
        [
          wineBottle("Tyrrell's Hunter Valley Semillon", "Tyrrell's", "Hunter Valley", "オーストラリアのセミヨン定番。", ["定番", "爽快"]),
          wineBottle("Brokenwood ILR Reserve Semillon", "Brokenwood", "Hunter Valley", "熟成ポテンシャルでも知られる一本。", ["熟成向き", "高酸"]),
        ],
      ),
      wineCountry(
        "usa",
        "アメリカ",
        "🇺🇸",
        "Washington / California",
        "果実味を少し前に出したスタイルになりやすいです。",
        [
          wineBottle("L'Ecole No 41 Semillon", "L'Ecole No 41", "Washington", "アメリカのセミヨン例として知名度が高い一本。", ["知名度", "果実味"]),
          wineBottle("Andrew Rich Semillon", "Andrew Rich", "Washington", "やや引き締まりも感じるバランス型。", ["バランス", "引き締まり"]),
        ],
      ),
    ],
  },
];

export function getReadyCategories() {
  return categories.filter((category) => category.status === "ready");
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSakeBrands() {
  return [...sakeBrands];
}

export function getWineVarieties() {
  return [...wineVarieties];
}

export function getWineVarietiesByStyle(style: WineStyle) {
  return wineVarieties.filter((variety) => variety.style === style);
}

export function getDetailPaths() {
  return [
    ...sakeBrands.map((brand) => ({ category: "sake", slug: brand.slug })),
    ...wineVarieties.map((variety) => ({ category: "wine", slug: variety.slug })),
  ];
}

export function getSakeBrand(slug: string) {
  return sakeBrands.find((brand) => brand.slug === slug);
}

export function getWineVariety(slug: string) {
  return wineVarieties.find((variety) => variety.slug === slug);
}
