import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import { SakeExplorer } from "@/components/SakeExplorer";
import { SearchPanel } from "@/components/SearchPanel";
import { WineExplorer } from "@/components/WineExplorer";
import {
  categories,
  getCategory,
  getSakeBrands,
  getWineVarietiesByStyle,
} from "@/data/catalog";
import { prefectureGuides } from "@/data/prefectures";
import { getSearchItems } from "@/data/search";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ tab?: string; prefecture?: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const current = getCategory(category);

  if (!current) {
    return {};
  }

  return {
    title: `${current.title} | Alcohol Atlas`,
    description: current.description,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;
  const current = getCategory(category);

  if (!current) {
    notFound();
  }

  const searchItems = getSearchItems();

  return (
    <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
        >
          <span aria-hidden>←</span>
          Home
        </Link>
      </div>

      <section className="mx-auto mt-4 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/50 bg-[rgba(247,242,234,0.84)] p-8 shadow-[0_24px_80px_rgba(50,31,23,0.08)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            {current.latinTitle}
          </p>
          <h1
            className="mt-3 text-5xl tracking-tight text-stone-900 sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {current.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
            {current.description}
          </p>
          <div className="mt-8 rounded-[1.25rem] border border-stone-200/80 bg-white/72 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
              Structure
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-stone-900">
              {current.focus}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(160deg,rgba(54,37,31,0.98),rgba(17,14,14,0.98))] p-4 shadow-[0_24px_80px_rgba(25,17,14,0.22)]">
          <DrinkIllustration
            kind={current.slug}
            title={current.latinTitle}
            accent={current.accent}
            idBase={`category-${current.slug}`}
          />
        </div>
      </section>

      {current.status === "ready" ? (
        <SearchPanel
          items={searchItems}
          className="mx-auto mt-8 max-w-6xl"
          title="店で見る前に名前から探す"
          description="日本酒の銘柄名、都道府県、ワイン品種、ワイン名から曖昧検索できます。"
        />
      ) : null}

      {current.status === "ready" && category === "wine" ? (
        <WineExplorer
          redVarieties={getWineVarietiesByStyle("red")}
          whiteVarieties={getWineVarietiesByStyle("white")}
        />
      ) : null}

      {current.status === "ready" && category === "sake" ? (
        <SakeExplorer
          brands={getSakeBrands()}
          prefectures={prefectureGuides}
          initialTab={
            query.tab === "prefecture" ||
            query.tab === "taste" ||
            query.tab === "serve" ||
            query.tab === "brand"
              ? query.tab
              : "brand"
          }
          initialPrefecture={query.prefecture}
        />
      ) : null}

      {current.status !== "ready" ? (
        <section className="mx-auto mt-8 max-w-6xl rounded-[1.8rem] border border-white/50 bg-white/80 p-8 shadow-[0_16px_48px_rgba(48,30,20,0.08)] backdrop-blur-sm">
          <p className="text-sm leading-7 text-stone-600">
            このカテゴリはまだ準備中です。日本酒とワインの情報構造をそのまま横展開できるように土台だけ用意しています。
          </p>
        </section>
      ) : null}
    </main>
  );
}
