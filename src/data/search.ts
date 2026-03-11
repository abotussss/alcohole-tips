import {
  type SearchItem,
  getSakeBrandPrefecture,
  getSakeBrands,
  getWineVarieties,
  wineStyleCaptions,
} from "@/data/catalog";
import { prefectureGuides } from "@/data/prefectures";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function getSearchItems(): SearchItem[] {
  const sakeItems = getSakeBrands().flatMap((brand) => {
    const prefecture = getSakeBrandPrefecture(brand);

    return [
      {
        id: `sake-brand-${brand.slug}`,
        title: brand.name,
        subtitle: `日本酒ブランド · ${prefecture}`,
        href: `/sake/${brand.slug}`,
        keywords: [brand.name, prefecture, ...brand.highlights],
      },
      ...brand.lineup.map((bottle) => ({
        id: `sake-bottle-${brand.slug}-${slugify(bottle.name)}`,
        title: bottle.name,
        subtitle: `${brand.name} · 日本酒`,
        href: `/sake/${brand.slug}#${slugify(bottle.name)}`,
        keywords: [bottle.name, brand.name, prefecture, bottle.style, ...bottle.highlights],
      })),
    ];
  });

  const wineItems = getWineVarieties().flatMap((variety) => [
    {
      id: `wine-variety-${variety.slug}`,
      title: variety.name,
      subtitle: `ワイン ${wineStyleCaptions[variety.style]} · 品種/スタイル`,
      href: `/wine/${variety.slug}`,
      keywords: [variety.name, wineStyleCaptions[variety.style], ...variety.highlights],
    },
    ...variety.countries.flatMap((country) => [
      {
        id: `wine-country-${variety.slug}-${country.slug}`,
        title: `${country.country}の${variety.name}`,
        subtitle: `${country.flag} ${country.region}`,
        href: `/wine/${variety.slug}#${country.slug}`,
        keywords: [variety.name, country.country, country.region],
      },
      ...country.bottles.map((bottle) => ({
        id: `wine-bottle-${variety.slug}-${country.slug}-${slugify(bottle.name)}`,
        title: bottle.name,
        subtitle: `${country.flag} ${country.country} · ${variety.name}`,
        href: `/wine/${variety.slug}#${country.slug}`,
        keywords: [bottle.name, bottle.winery, bottle.region, variety.name, country.country, ...bottle.highlights],
      })),
    ]),
  ]);

  const prefectureItems = prefectureGuides.map((prefecture) => ({
    id: `prefecture-${prefecture.slug}`,
    title: prefecture.name,
    subtitle: `都道府県 · ${prefecture.region}`,
    href: `/sake?tab=prefecture&prefecture=${encodeURIComponent(prefecture.name)}`,
    keywords: [prefecture.name, prefecture.region, ...prefecture.featuredBrands],
  }));

  return [...sakeItems, ...wineItems, ...prefectureItems];
}
