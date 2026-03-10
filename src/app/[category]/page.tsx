import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import { RadarChart } from "@/components/RadarChart";
import {
  type CategorySlug,
  categories,
  getCategory,
  getEntriesByCategory,
} from "@/data/catalog";

type Props = {
  params: Promise<{ category: string }>;
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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const current = getCategory(category);

  if (!current) {
    notFound();
  }

  const entries = getEntriesByCategory(category as CategorySlug);

  return (
    <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
        >
          <span aria-hidden>←</span>
          Home
        </Link>
      </div>

      <section className="mx-auto mt-4 grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/50 bg-[rgba(246,240,231,0.82)] p-8 shadow-[0_24px_80px_rgba(50,31,23,0.1)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
            {current.latinTitle}
          </p>
          <h1
            className="mt-3 text-5xl tracking-tight text-stone-900 sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {current.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700">
            {current.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.35rem] border border-stone-200/80 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Status
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                {current.status === "ready" ? "Ready" : "Preview"}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-stone-200/80 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Focus
              </p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-stone-900">
                {current.focus}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-stone-200/80 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Entries
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                {entries.length}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(160deg,rgba(58,34,29,0.96),rgba(15,14,14,0.98))] p-4 shadow-[0_24px_80px_rgba(25,17,14,0.24)]">
          <DrinkIllustration
            kind={current.slug}
            title={current.latinTitle}
            accent={current.accent}
            idBase={`hero-${current.slug}`}
          />
        </div>
      </section>

      {current.status === "ready" ? (
        <section className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Collection
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                収録アイテム
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-stone-600">
              各詳細ページでは、味わいの5軸チャート、製法や産地の基本情報、相性の良い料理をまとめています。
            </p>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${current.slug}/${entry.slug}`}
                className="grid gap-5 rounded-[1.7rem] border border-white/50 bg-white/78 p-5 shadow-[0_16px_40px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(48,29,19,0.12)] md:grid-cols-[220px_1fr]"
              >
                <div className="overflow-hidden rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
                  <DrinkIllustration
                    kind={entry.category}
                    title={entry.name}
                    accent={entry.accent}
                    idBase={`${entry.category}-${entry.slug}-card`}
                  />
                </div>

                <div className="grid gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                      {entry.subtitle}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
                      {entry.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {entry.summary}
                    </p>
                  </div>

                  <div className="grid items-center gap-5 sm:grid-cols-[0.8fr_1.2fr]">
                    <RadarChart metrics={entry.radar} accent={entry.accent} compact />
                    <div className="flex flex-wrap gap-2">
                      {entry.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto mt-8 max-w-7xl rounded-[1.8rem] border border-white/50 bg-white/78 p-8 shadow-[0_16px_48px_rgba(48,30,20,0.08)] backdrop-blur-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            次の拡張候補
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
            このカテゴリは後から追加しやすいよう、トップとカテゴリ一覧まで先に揃えています。日本酒とワインで使った
            情報設計をそのまま移植し、ブランド・地域・製法の軸を置き換えるだけで展開できます。
          </p>
        </section>
      )}
    </main>
  );
}
