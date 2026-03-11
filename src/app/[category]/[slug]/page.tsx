import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import { RadarChart } from "@/components/RadarChart";
import {
  getCategory,
  getDetailPaths,
  getSakeBrandPrefecture,
  getSakeBrand,
  getWineVariety,
  wineStyleLabels,
} from "@/data/catalog";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

const anchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function generateStaticParams() {
  return getDetailPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const title =
    category === "sake"
      ? getSakeBrand(slug)?.name
      : category === "wine"
        ? getWineVariety(slug)?.name
        : undefined;

  if (!title) {
    return {};
  }

  return {
    title: `${title} | Alcohol Atlas`,
  };
}

export default async function DetailPage({ params }: Props) {
  const { category, slug } = await params;
  const currentCategory = getCategory(category);

  if (!currentCategory) {
    notFound();
  }

  if (category === "sake") {
    const brand = getSakeBrand(slug);

    if (!brand) {
      notFound();
    }

    return (
      <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/sake"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
          >
            <span aria-hidden>←</span>
            日本酒へ戻る
          </Link>
        </div>

        <section className="mx-auto mt-4 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(160deg,rgba(54,37,31,0.98),rgba(17,14,14,0.98))] p-4 shadow-[0_24px_80px_rgba(25,17,14,0.22)]">
            <DrinkIllustration
              kind="sake"
              title={brand.name}
              accent={brand.accent}
              idBase={`sake-${brand.slug}`}
              themeKey={`sake-prefecture-${getSakeBrandPrefecture(brand)}`}
            />
          </div>

          <div className="rounded-[1.6rem] border border-white/50 bg-[rgba(247,242,234,0.84)] p-6 shadow-[0_24px_80px_rgba(50,31,23,0.08)] backdrop-blur-sm sm:rounded-[2rem] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              銘柄
            </p>
            <h1
              className="mt-3 text-4xl tracking-tight text-stone-900 sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {brand.name}
            </h1>
            <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">{brand.summary}</p>
            <p className="mt-4 text-sm leading-8 text-stone-600">{brand.story}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {brand.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {brand.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-[1.2rem] border border-stone-200/80 bg-white/72 p-5"
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

        <section className="mx-auto mt-8 max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                ラインナップ
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                {brand.name} の種類
              </h2>
            </div>
            <p className="text-sm text-stone-500">{brand.lineup.length} items</p>
          </div>

          <div className="mt-6 grid gap-5">
            {brand.lineup.map((bottle) => (
              <article
                key={bottle.name}
                id={anchorId(bottle.name)}
                className="rounded-[1.35rem] border border-white/50 bg-white/80 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                          {bottle.style}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                          {bottle.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {bottle.summary}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {bottle.notes}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {bottle.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {bottle.facts.map((fact) => (
                        <div key={fact.label} className="rounded-xl bg-stone-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                            {fact.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-stone-900">
                            {fact.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.2rem] bg-[rgba(248,244,237,0.95)] p-3 sm:rounded-[1.4rem] sm:p-4">
                    <RadarChart metrics={bottle.radar} accent={brand.accent} compact />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (category === "wine") {
    const variety = getWineVariety(slug);

    if (!variety) {
      notFound();
    }

    return (
      <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/wine"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900"
          >
            <span aria-hidden>←</span>
            ワインへ戻る
          </Link>
        </div>

        <section className="mx-auto mt-4 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(160deg,rgba(54,37,31,0.98),rgba(17,14,14,0.98))] p-4 shadow-[0_24px_80px_rgba(25,17,14,0.22)]">
            <DrinkIllustration
              kind="wine"
              title={variety.name}
              accent={variety.accent}
              idBase={`wine-${variety.slug}`}
              themeKey={`wine-style-${variety.style}`}
            />
          </div>

          <div className="rounded-[1.6rem] border border-white/50 bg-[rgba(247,242,234,0.84)] p-6 shadow-[0_24px_80px_rgba(50,31,23,0.08)] backdrop-blur-sm sm:rounded-[2rem] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              {wineStyleLabels[variety.style]}
            </p>
            <h1
              className="mt-3 text-4xl tracking-tight text-stone-900 sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {variety.name}
            </h1>
            <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">{variety.summary}</p>
            <p className="mt-4 text-sm leading-8 text-stone-600">{variety.story}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {variety.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.35rem] border border-white/50 bg-white/80 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              味わいプロフィール
            </p>
            <div className="mt-4">
              <RadarChart metrics={variety.radar} accent={variety.accent} />
            </div>
          </article>

          <article className="rounded-[1.35rem] border border-white/50 bg-white/80 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Countries
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
              国を選ぶ
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {variety.countries.map((country) => (
                <a
                  key={country.slug}
                  href={`#${country.slug}`}
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-900 hover:bg-stone-100"
                >
                  <span className="mr-2">{country.flag}</span>
                  {country.country}
                </a>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {variety.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl bg-stone-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-stone-900">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mx-auto mt-8 grid max-w-6xl gap-5">
          {variety.countries.map((country) => (
            <article
              key={country.slug}
              id={country.slug}
              className="rounded-[1.35rem] border border-white/50 bg-white/80 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                    Country
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                    <span className="mr-3">{country.flag}</span>
                    {country.country}
                  </h2>
                </div>
                <p className="text-sm text-stone-500">{country.region}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-600">{country.summary}</p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {country.bottles.map((bottle) => (
                  <div
                    key={bottle.name}
                    className="rounded-[1.1rem] border border-stone-200/80 bg-[rgba(248,244,237,0.9)] p-4 sm:rounded-[1.3rem] sm:p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                      {bottle.region}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                      {bottle.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-stone-500">
                      {bottle.winery}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {bottle.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {bottle.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }

  notFound();
}
