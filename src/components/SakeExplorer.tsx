"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  SakeBrand,
  SakeBottle,
  SakeServeStyle,
  SakeTaste,
} from "@/data/catalog";
import {
  getSakeBrandPrefecture,
  inferPrimarySakeServeStyle,
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

const anchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

const genericBottleNamePattern =
  /^(大吟醸|純米大吟醸|純米吟醸|純米酒|特別純米|本醸造|特別本醸造|吟醸|清酒)$/;

function getBottleCardTitle(brand: SakeBrand, bottle: SakeBottle) {
  return genericBottleNamePattern.test(bottle.name)
    ? `${brand.name} ${bottle.name}`
    : bottle.name;
}

function getUniqueBottleResults(
  results: Array<{ brand: SakeBrand; bottle: SakeBottle }>,
) {
  return [...new Map(results.map((item) => [`${item.brand.slug}:${item.bottle.name}`, item])).values()];
}

function BrandCard({ brand, note }: { brand: SakeBrand; note?: string }) {
  return (
    <Link
      href={`/sake/${brand.slug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)] sm:rounded-[1.5rem] sm:p-5"
    >
      <div className="overflow-hidden rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))] sm:rounded-[1.15rem]">
        <DrinkIllustration
          kind="sake"
          title={brand.name}
          accent={brand.accent}
          idBase={`sake-explorer-${brand.slug}`}
          themeKey={`sake-prefecture-${getSakeBrandPrefecture(brand)}`}
        />
      </div>
      <div className="mt-3 sm:mt-5">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
              {getSakeBrandPrefecture(brand)}
            </p>
            <h3 className="mt-1 min-h-10 overflow-hidden text-[0.95rem] font-semibold leading-5 tracking-tight text-stone-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:mt-2 sm:min-h-0 sm:text-2xl sm:leading-8 sm:[-webkit-line-clamp:unset] sm:[display:block]">
              {brand.name}
            </h3>
          </div>
          <span className="text-[11px] text-stone-500 sm:text-sm">{brand.lineup.length} types</span>
        </div>
        <p className="mt-2 hidden text-sm leading-7 text-stone-600 sm:mt-4 sm:block">{note ?? brand.summary}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {brand.highlights.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-700 sm:px-3 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function BottleCard({
  brand,
  bottle,
  tag,
}: {
  brand: SakeBrand;
  bottle: SakeBottle;
  tag: string;
}) {
  return (
    <Link
      href={`/sake/${brand.slug}#${anchorId(bottle.name)}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(48,29,19,0.12)] sm:rounded-[1.5rem] sm:p-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
            {getSakeBrandPrefecture(brand)} · {brand.name}
          </p>
          <h3 className="mt-1 min-h-10 overflow-hidden text-[0.92rem] font-semibold leading-5 tracking-tight text-stone-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:mt-2 sm:min-h-0 sm:text-2xl sm:leading-8 sm:[-webkit-line-clamp:unset] sm:[display:block]">
            {getBottleCardTitle(brand, bottle)}
          </h3>
        </div>
        <span className="inline-flex h-6 w-[4.6rem] shrink-0 items-center justify-center rounded-full bg-stone-900 px-2 text-center text-[10px] font-semibold leading-none text-stone-50 sm:h-8 sm:w-[5.6rem] sm:px-3 sm:text-xs">
          {tag}
        </span>
      </div>
      <p className="mt-2 hidden text-sm leading-6 text-stone-600 sm:mt-3 sm:block sm:leading-7">
        {bottle.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {[bottle.style, ...bottle.highlights].slice(0, 3).map((item) => (
          <span
            key={item}
            className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-700 sm:px-3 sm:text-xs"
          >
            {item}
          </span>
        ))}
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
  const prefectureResultRef = useRef<HTMLDivElement | null>(null);

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
      getUniqueBottleResults(
        brands.flatMap((brand) =>
          brand.lineup
            .filter((bottle) => inferSakeTaste(bottle) === taste)
            .map((bottle) => ({ brand, bottle })),
        ),
      ),
    [brands, taste],
  );

  const brandsByServe = useMemo(
    () =>
      getUniqueBottleResults(
        brands.flatMap((brand) =>
          brand.lineup
            .filter((bottle) => inferPrimarySakeServeStyle(bottle) === serveStyle)
            .map((bottle) => ({ brand, bottle })),
        ),
      ),
    [brands, serveStyle],
  );

  useEffect(() => {
    if (activeTab !== "prefecture" || !selectedPrefecture || typeof window === "undefined") {
      return;
    }

    if (!window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      prefectureResultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeTab, selectedPrefecture]);

  return (
    <section className="mx-auto mt-8 max-w-6xl max-md:rounded-[1.6rem] max-md:border max-md:border-white/50 max-md:bg-[rgba(247,242,234,0.84)] max-md:p-4 max-md:shadow-[0_16px_44px_rgba(48,29,19,0.08)] max-md:backdrop-blur-sm">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-[1.1rem] bg-stone-200/70 p-1.5 max-md:sticky max-md:top-3 max-md:z-10 max-md:bg-[rgba(238,231,223,0.96)] sm:flex sm:flex-wrap sm:gap-3 sm:rounded-none sm:bg-transparent sm:p-0">
        {tabLabels.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-[0.9rem] px-3 py-3 text-sm font-semibold transition sm:rounded-full sm:px-5 sm:py-3 ${
              activeTab === tab.id
                ? "bg-stone-900 text-stone-50 shadow-[0_10px_24px_rgba(48,29,19,0.18)]"
                : "bg-white/85 text-stone-700 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "brand" ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : null}

      {activeTab === "prefecture" ? (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.2rem] border border-white/50 bg-white/82 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.7rem] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              都道府県
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

          <div ref={prefectureResultRef} className="grid gap-5">
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
                      代表ラベル
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
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2">
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
        <div className="grid gap-4 sm:gap-5">
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {(["dry", "balanced", "sweet"] as SakeTaste[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTaste(value)}
                className={`min-h-11 rounded-[0.9rem] px-2 py-2.5 text-center text-sm font-semibold transition sm:min-h-0 sm:rounded-full sm:px-5 sm:py-3 ${
                  taste === value
                    ? "bg-stone-900 text-stone-50"
                    : "border border-stone-300 bg-white/80 text-stone-700"
                }`}
              >
                {tasteLabels[value]}
              </button>
            ))}
          </div>
          <div key={taste} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {brandsByTaste.map(({ brand, bottle }) => (
              <BottleCard
                key={`${brand.slug}-${bottle.name}`}
                brand={brand}
                bottle={bottle}
                tag={tasteLabels[taste]}
              />
            ))}
          </div>
        </div>
      ) : null}

      {activeTab === "serve" ? (
        <div className="grid gap-4 sm:gap-5">
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {(["cold", "warm", "hot"] as SakeServeStyle[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setServeStyle(value)}
                className={`min-h-11 rounded-[0.9rem] px-2 py-2.5 text-center text-sm font-semibold transition sm:min-h-0 sm:rounded-full sm:px-5 sm:py-3 ${
                  serveStyle === value
                    ? "bg-stone-900 text-stone-50"
                    : "border border-stone-300 bg-white/80 text-stone-700"
                }`}
              >
                {serveLabels[value]}
              </button>
            ))}
          </div>
          <div
            key={serveStyle}
            className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {brandsByServe.map(({ brand, bottle }) => (
              <BottleCard
                key={`${brand.slug}-${bottle.name}`}
                brand={brand}
                bottle={bottle}
                tag={serveLabels[serveStyle]}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
