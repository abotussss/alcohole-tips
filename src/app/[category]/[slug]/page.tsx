import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import { RadarChart } from "@/components/RadarChart";
import {
  getAllEntries,
  getCategory,
  getEntry,
} from "@/data/catalog";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllEntries().map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const entry = getEntry(category, slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.name} | ${getCategory(category)?.title ?? "Alcohol Atlas"}`,
    description: entry.summary,
  };
}

export default async function EntryPage({ params }: Props) {
  const { category, slug } = await params;
  const entry = getEntry(category, slug);
  const currentCategory = getCategory(category);

  if (!entry || !currentCategory) {
    notFound();
  }

  return (
    <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/${category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
        >
          <span aria-hidden>←</span>
          {currentCategory.title}へ戻る
        </Link>
      </div>

      <section className="mx-auto mt-4 grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(160deg,rgba(54,37,31,0.98),rgba(17,14,14,0.98))] p-4 shadow-[0_30px_90px_rgba(29,20,17,0.24)]">
          <DrinkIllustration
            kind={entry.category}
            title={entry.name}
            accent={entry.accent}
            idBase={`${entry.category}-${entry.slug}-detail`}
          />
        </div>

        <div className="rounded-[2rem] border border-white/50 bg-[rgba(247,242,234,0.82)] p-8 shadow-[0_24px_80px_rgba(52,34,24,0.1)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            {entry.subtitle}
          </p>
          <h1
            className="mt-3 text-5xl tracking-tight text-stone-900 sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {entry.name}
          </h1>
          <p className="mt-5 text-base leading-8 text-stone-700">{entry.summary}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {entry.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {entry.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[1.25rem] border border-stone-200/80 bg-white/72 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                  {fact.label}
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 tracking-tight text-stone-900">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.8rem] border border-white/50 bg-white/78 p-6 shadow-[0_18px_54px_rgba(49,31,22,0.08)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Profile
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            5角形パラメーター
          </h2>
          <div className="mt-5">
            <RadarChart metrics={entry.radar} accent={entry.accent} />
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-white/50 bg-white/78 p-6 shadow-[0_18px_54px_rgba(49,31,22,0.08)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            特徴の読み方
          </h2>
          <p className="mt-4 text-sm leading-8 text-stone-600">{entry.story}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.3rem] bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                Pairing
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-7 text-stone-700">
                {entry.pairings.map((pairing) => (
                  <li key={pairing}>{pairing}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.3rem] bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                Tasting Note
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{entry.note}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
