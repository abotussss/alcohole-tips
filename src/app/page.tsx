import Link from "next/link";
import { DrinkIllustration } from "@/components/DrinkIllustration";
import { SearchPanel } from "@/components/SearchPanel";
import { getReadyCategories } from "@/data/catalog";
import { getSearchItems } from "@/data/search";

export default function Home() {
  const readyCategories = getReadyCategories();
  const searchItems = getSearchItems();

  return (
    <main className="px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[1.6rem] border border-white/50 bg-[rgba(248,243,236,0.86)] p-6 shadow-[0_24px_80px_rgba(50,31,23,0.08)] backdrop-blur-sm sm:rounded-[2rem] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
            Alcohol Atlas
          </p>
          <h1
            className="mt-4 text-4xl leading-[1.08] tracking-tight text-stone-900 sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Know the label
            <br />
            before you order.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
            店では日本酒の銘柄名やワイン名だけを見かけることが多いので、先に特徴を掴めるようにしたWebアプリです。日本酒はブランド、都道府県、辛口甘口、飲み方から。ワインは赤白から入って、品種と国で整理します。
          </p>
        </div>
      </section>

      <SearchPanel
        items={searchItems}
        className="mx-auto mt-6 max-w-5xl"
        title="名前からすぐ探す"
        description="日本酒の銘柄名、都道府県、ワイン品種、ワイン名で曖昧検索できます。"
      />

      <section className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        {readyCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="group overflow-hidden rounded-[1.35rem] border border-white/50 bg-white/78 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)] sm:rounded-[1.7rem]"
          >
            <div className="border-b border-stone-200/70 p-4 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                {category.latinTitle}
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                  {category.title}
                </h2>
                <span className="text-sm font-semibold text-stone-500">
                  {category.focus}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-600 sm:leading-7">
                {category.description}
              </p>
            </div>

            <div className="grid gap-4 p-3 sm:p-4">
              <div className="overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
                <DrinkIllustration
                  kind={category.slug}
                  title={category.latinTitle}
                  accent={category.accent}
                  idBase={`home-${category.slug}`}
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-sm text-stone-500">Explore</span>
                <span className="text-sm font-semibold text-stone-900 transition group-hover:text-stone-600">
                  開く
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
