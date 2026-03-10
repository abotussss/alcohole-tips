import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import {
  categories,
  getCategory,
  getSakeBrands,
  getWineVarietiesByStyle,
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

      {current.status === "ready" && category === "sake" ? (
        <section className="mx-auto mt-8 max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {getSakeBrands().map((brand) => (
              <Link
                key={brand.slug}
                href={`/${current.slug}/${brand.slug}`}
                className="rounded-[1.6rem] border border-white/50 bg-white/80 p-5 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)]"
              >
                <div className="overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
                  <DrinkIllustration
                    kind={current.slug}
                    title={brand.name}
                    accent={brand.accent}
                    idBase={`${current.slug}-${brand.slug}`}
                  />
                </div>
                <div className="mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                        Brand
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                        {brand.name}
                      </h2>
                    </div>
                    <span className="text-sm text-stone-500">{brand.lineup.length} types</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {brand.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {brand.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {current.status === "ready" && category === "wine" ? (
        <section className="mx-auto mt-8 max-w-6xl space-y-10">
          {[
            { title: "Red", label: "赤ワイン品種", items: getWineVarietiesByStyle("red") },
            { title: "White", label: "白ワイン品種", items: getWineVarietiesByStyle("white") },
          ].map((group) => (
            <div key={group.title}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    {group.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
                    {group.label}
                  </h2>
                </div>
                <p className="text-sm text-stone-500">{group.items.length} varieties</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((variety) => (
                  <Link
                    key={variety.slug}
                    href={`/${current.slug}/${variety.slug}`}
                    className="rounded-[1.6rem] border border-white/50 bg-white/80 p-5 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)]"
                  >
                    <div className="overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
                      <DrinkIllustration
                        kind={current.slug}
                        title={variety.name}
                        accent={variety.accent}
                        idBase={`${current.slug}-${variety.slug}`}
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                            {variety.style === "red" ? "Red Variety" : "White Variety"}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                            {variety.name}
                          </h2>
                        </div>
                        <span className="text-sm text-stone-500">
                          {variety.countries.length} countries
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-stone-600">
                        {variety.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {variety.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
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
