"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  SakeBrand,
  SakeServeStyle,
  SakeTaste,
} from "@/data/catalog";
import {
  getSakeBrandPrefecture,
  inferSakeServeStyles,
  inferSakeTaste,
} from "@/data/catalog";
import type { PrefectureGuide } from "@/data/prefectures";
import { prefectureFeaturedLabels, prefectureRegions } from "@/data/prefectures";
import { DrinkIllustration } from "@/components/DrinkIllustration";

type Props = {
  brands: SakeBrand[];
  prefectures: PrefectureGuide[];
  initialTab?: "brand" | "prefecture" | "taste" | "serve";
  initialPrefecture?: string;
};

const tabLabels = [
  { id: "brand", label: "ブランドから選ぶ" },
  { id: "prefecture", label: "都道府県から選ぶ" },
  { id: "taste", label: "辛口・甘口" },
  { id: "serve", label: "飲み方" },
] as const;

const tasteLabels: Record<SakeTaste, string> = {
  dry: "辛口",
  balanced: "バランス",
  sweet: "甘口",
};

const serveLabels: Record<SakeServeStyle, string> = {
  cold: "冷酒向き",
  warm: "ぬる燗向き",
  hot: "熱燗向き",
};

function BrandCard({ brand, note }: { brand: SakeBrand; note?: string }) {
  return (
    <Link
      href={`/sake/${brand.slug}`}
      className="rounded-[1.2rem] border border-white/50 bg-white/82 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)] sm:rounded-[1.5rem] sm:p-5"
    >
      <div className="overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
        <DrinkIllustration
          kind="sake"
          title={brand.name}
          accent={brand.accent}
          idBase={`sake-explorer-${brand.slug}`}
        />
      </div>
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {getSakeBrandPrefecture(brand)}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {brand.name}
            </h3>
          </div>
          <span className="text-sm text-stone-500">{brand.lineup.length} types</span>
        </div>
        <p className="mt-4 text-sm leading-7 text-stone-600">{note ?? brand.summary}</p>
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
  );
}

export function SakeExplorer({
  brands,
  prefectures,
  initialTab = "brand",
  initialPrefecture = "",
}: Props) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPrefecture, setSelectedPrefecture] = useState(initialPrefecture);
  const [taste, setTaste] = useState<SakeTaste>("dry");
  const [serveStyle, setServeStyle] = useState<SakeServeStyle>("cold");

  const prefectureGuide = prefectures.find((prefecture) => prefecture.name === selectedPrefecture);
  const featuredLabels = selectedPrefecture
    ? prefectureFeaturedLabels[selectedPrefecture] ?? []
    : [];

  const brandsByPrefecture = useMemo(
    () => brands.filter((brand) => getSakeBrandPrefecture(brand) === selectedPrefecture),
    [brands, selectedPrefecture],
  );

  const brandsByTaste = useMemo(
    () =>
      brands.filter((brand) =>
        brand.lineup.some((bottle) => inferSakeTaste(bottle) === taste),
      ),
    [brands, taste],
  );

  const brandsByServe = useMemo(
    () =>
      brands.filter((brand) =>
        brand.lineup.some((bottle) => inferSakeServeStyles(bottle).includes(serveStyle)),
      ),
    [brands, serveStyle],
  );

  return (
    <section className="mx-auto mt-8 max-w-6xl max-md:rounded-[1.4rem] max-md:border max-md:border-white/50 max-md:bg-[rgba(247,242,234,0.84)] max-md:p-3 max-md:shadow-[0_16px_44px_rgba(48,29,19,0.08)] max-md:backdrop-blur-sm max-md:max-h-[78svh] max-md:overflow-hidden">
      <div className="mb-5 flex flex-wrap gap-2 sm:gap-3 max-md:sticky max-md:top-0 max-md:z-10 max-md:bg-[rgba(247,242,234,0.96)] max-md:pb-3">
        {tabLabels.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:py-3 ${
              activeTab === tab.id
                ? "bg-stone-900 text-stone-50"
                : "border border-stone-300 bg-white/80 text-stone-700 hover:border-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "brand" ? (
        <div className="grid gap-4 max-md:max-h-[calc(78svh-5.5rem)] max-md:overflow-y-auto md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : null}

      {activeTab === "prefecture" ? (
        <div className="grid gap-4 max-md:max-h-[calc(78svh-5.5rem)] max-md:overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.2rem] border border-white/50 bg-white/82 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Prefecture
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              都道府県から探す
            </h2>
            <div className="mt-5 rounded-[1rem] border border-stone-200 bg-stone-50 p-3">
              <select
                value={selectedPrefecture}
                onChange={(event) => setSelectedPrefecture(event.target.value)}
                className="w-full bg-transparent px-2 py-2 text-[15px] text-stone-900 outline-none sm:text-base"
              >
                <option value="">都道府県を選択</option>
                {prefectures.map((prefecture) => (
                  <option key={prefecture.slug} value={prefecture.name}>
                    {prefecture.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {prefectureRegions.map((region) => (
                <div key={region} className="rounded-[1rem] bg-[rgba(248,244,237,0.95)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    {region}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {prefectures
                      .filter((prefecture) => prefecture.region === region)
                      .map((prefecture) => (
                        <button
                          key={prefecture.slug}
                          type="button"
                          onClick={() => setSelectedPrefecture(prefecture.name)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                            selectedPrefecture === prefecture.name
                              ? "bg-stone-900 text-stone-50"
                              : "bg-white text-stone-700 hover:bg-stone-200"
                          }`}
                        >
                          {prefecture.name}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            {selectedPrefecture && prefectureGuide ? (
              <article className="rounded-[1.2rem] border border-white/50 bg-white/82 p-5 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                  {prefectureGuide.region}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                  {prefectureGuide.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {prefectureGuide.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prefectureGuide.featuredBrands.map((brand) => (
                    <span
                      key={brand}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                {featuredLabels.length ? (
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                      Representative Labels
                    </p>
                    <div className="mt-3 grid gap-2">
                      {featuredLabels.map((label) => (
                        <div
                          key={label}
                          className="rounded-xl bg-[rgba(248,244,237,0.95)] px-4 py-3 text-sm font-medium text-stone-700"
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ) : (
              <article className="rounded-[1.35rem] border border-dashed border-stone-300 bg-white/65 p-5 text-sm leading-7 text-stone-500 sm:rounded-[1.7rem] sm:p-6">
                47都道府県から選べます。都道府県を選ぶと、代表銘柄例と、このアプリ内で見られる関連ブランドを表示します。
              </article>
            )}

            {selectedPrefecture && brandsByPrefecture.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {brandsByPrefecture.map((brand) => (
                  <BrandCard key={brand.slug} brand={brand} />
                ))}
              </div>
            ) : selectedPrefecture ? (
              <article className="rounded-[1.7rem] border border-white/50 bg-white/82 p-6 text-sm leading-7 text-stone-500 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm">
                この都道府県の代表銘柄データを整理中です。別の都道府県を選ぶと、詳細ブランドカードからそのまま銘柄ごとの種類まで確認できます。
              </article>
            ) : null}
          </div>
        </div>
      ) : null}

      {activeTab === "taste" ? (
        <div className="grid gap-4 max-md:max-h-[calc(78svh-5.5rem)] max-md:overflow-y-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(["dry", "balanced", "sweet"] as SakeTaste[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTaste(value)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:py-3 ${
                  taste === value
                    ? "bg-stone-900 text-stone-50"
                    : "border border-stone-300 bg-white/80 text-stone-700"
                }`}
              >
                {tasteLabels[value]}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {brandsByTaste.map((brand) => (
              <BrandCard
                key={brand.slug}
                brand={brand}
                note={`${tasteLabels[taste]}寄りの種類を含むブランド。店で見かけた時に方向性を掴みやすいです。`}
              />
            ))}
          </div>
        </div>
      ) : null}

      {activeTab === "serve" ? (
        <div className="grid gap-4 max-md:max-h-[calc(78svh-5.5rem)] max-md:overflow-y-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(["cold", "warm", "hot"] as SakeServeStyle[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setServeStyle(value)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:py-3 ${
                  serveStyle === value
                    ? "bg-stone-900 text-stone-50"
                    : "border border-stone-300 bg-white/80 text-stone-700"
                }`}
              >
                {serveLabels[value]}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {brandsByServe.map((brand) => (
              <BrandCard
                key={brand.slug}
                brand={brand}
                note={`${serveLabels[serveStyle]}の種類を含むブランド。温度帯で表情を変えやすい銘柄を探せます。`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
