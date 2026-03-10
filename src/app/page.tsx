import Link from "next/link";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import {
  categories,
  getEntriesByCategory,
  getReadyCategories,
} from "@/data/catalog";

const editorialNotes = [
  {
    title: "ブランドで選ぶ日本酒",
    body: "精米歩合や酵母の違いを、香り・甘み・コク・キレ・余韻の5軸で直感的に比較できます。",
  },
  {
    title: "品種で見るワイン",
    body: "カベルネやピノ・ノワールなど、品種ごとの性格に加えて、主要産地の傾向も短く整理しています。",
  },
  {
    title: "写真なしでも伝わる構成",
    body: "権利面の扱いが難しい実写の代わりに、抽象イラストと情報設計で印象を作る設計です。",
  },
];

export default function Home() {
  const readyCategories = getReadyCategories();

  return (
    <main className="px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/50 bg-[rgba(245,239,229,0.8)] p-8 shadow-[0_30px_120px_rgba(49,35,28,0.12)] backdrop-blur-sm sm:p-10">
          <div className="mb-6 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-stone-500">
            <span className="h-px w-10 bg-stone-400" />
            Alcohol Atlas
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <p className="max-w-sm text-sm leading-7 text-stone-600">
                日本酒とワインを主役に、種類・製法・味わいを視覚的に読める
                モダンなガイドに落とし込んだWebアプリです。
              </p>
              <div>
                <h1
                  className="max-w-3xl text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Taste the
                  <br />
                  Character.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
                  ブランドや品種ごとの違いを、抽象イラスト、5角形チャート、
                  産地情報で静かに比較できる設計にしています。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sake"
                  className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
                >
                  日本酒を見る
                </Link>
                <Link
                  href="/wine"
                  className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-900 hover:bg-stone-100"
                >
                  ワインを見る
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-[linear-gradient(145deg,rgba(92,36,22,0.95),rgba(22,17,16,0.98))] p-4">
              <DrinkIllustration
                kind="sake"
                title="Nihonshu"
                accent="amber"
                idBase="home-sake"
              />
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          {editorialNotes.map((note) => (
            <div
              key={note.title}
              className="rounded-[1.5rem] border border-white/40 bg-white/65 p-6 shadow-[0_18px_50px_rgba(56,37,27,0.08)] backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Editorial
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-stone-900">
                {note.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{note.body}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-white/40 bg-[rgba(255,252,247,0.7)] p-6 shadow-[0_20px_60px_rgba(48,29,20,0.08)] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              Categories
            </p>
            <h2
              className="mt-2 text-3xl tracking-tight text-stone-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              まずは日本酒とワインを深く
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-600">
            MVPでは日本酒5銘柄、ワイン5品種を収録。ビール、焼酎、梅酒はこの構造に沿って後から追加できます。
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => {
            const isReady = category.status === "ready";
            const entries = isReady ? getEntriesByCategory(category.slug) : [];

            return (
              <article
                key={category.slug}
                className="group flex h-full flex-col justify-between rounded-[1.5rem] border border-stone-200/80 bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(43,28,22,0.1)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
                        {category.latinTitle}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                        {category.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] ${
                        isReady
                          ? "bg-stone-900 text-stone-50"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {isReady ? "Ready" : "Soon"}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(251,247,239,1),rgba(240,229,214,0.9))] p-3">
                    <DrinkIllustration
                      kind={category.slug}
                      title={category.latinTitle}
                      accent={category.accent}
                      idBase={`category-${category.slug}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">
                      {isReady ? `${entries.length} entries` : "Preview"}
                    </span>
                    <Link
                      href={`/${category.slug}`}
                      className="font-semibold text-stone-900 transition group-hover:text-stone-600"
                    >
                      {isReady ? "見る" : "構想を見る"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-2">
        {readyCategories.map((category) => {
          const featured = getEntriesByCategory(category.slug).slice(0, 2);

          return (
            <article
              key={category.slug}
              className="rounded-[1.8rem] border border-white/50 bg-white/75 p-6 shadow-[0_18px_60px_rgba(46,29,20,0.08)] backdrop-blur-sm sm:p-7"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Featured
                  </p>
                  <h2
                    className="mt-2 text-3xl tracking-tight text-stone-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {category.title}
                  </h2>
                </div>
                <Link
                  href={`/${category.slug}`}
                  className="text-sm font-semibold text-stone-700 transition hover:text-stone-900"
                >
                  一覧へ
                </Link>
              </div>

              <div className="mt-6 grid gap-4">
                {featured.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/${category.slug}/${entry.slug}`}
                    className="grid gap-4 rounded-[1.35rem] border border-stone-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,241,233,0.92))] p-4 transition hover:border-stone-300 hover:shadow-[0_14px_30px_rgba(49,35,28,0.08)] sm:grid-cols-[180px_1fr]"
                  >
                    <div className="overflow-hidden rounded-[1rem] bg-stone-100">
                      <DrinkIllustration
                        kind={entry.category}
                        title={entry.name}
                        accent={entry.accent}
                        idBase={`${entry.category}-${entry.slug}-home`}
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                          {entry.subtitle}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
                          {entry.name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-stone-600">
                          {entry.summary}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {entry.highlights.slice(0, 3).map((item) => (
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
            </article>
          );
        })}
      </section>
    </main>
  );
}
