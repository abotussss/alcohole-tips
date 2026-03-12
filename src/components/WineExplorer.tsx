"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getWineRegions,
  getWineWineries,
  type WineRegionEntry,
  type WineStyle,
  type WineVariety,
  type WineWineryEntry,
  wineStyleCaptions,
  wineStyleLabels,
  wineStyleOrder,
} from "@/data/catalog";
import { DrinkIllustration } from "@/components/DrinkIllustration";

type Props = {
  varieties: WineVariety[];
};

const explorerModes = [
  { id: "variety", label: "品種から選ぶ" },
  { id: "winery", label: "ワイナリーから選ぶ" },
  { id: "region", label: "産地から選ぶ" },
] as const;

type ExplorerMode = (typeof explorerModes)[number]["id"];

function VarietyCard({ variety }: { variety: WineVariety }) {
  return (
    <Link
      href={`/wine/${variety.slug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)] sm:rounded-[1.4rem] sm:p-5 lg:p-6"
    >
      <div className="grid gap-3 sm:gap-4">
        <div className="h-32 overflow-hidden rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))] sm:h-44 sm:rounded-[1rem] lg:h-48">
          <DrinkIllustration
            kind="wine"
            title={variety.name}
            accent={variety.accent}
            idBase={`wine-explorer-${variety.slug}`}
            themeKey={`wine-style-${variety.style}`}
          />
        </div>
        <div className="min-w-0">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
              {wineStyleLabels[variety.style]}
            </p>
            <h3 className="mt-1 text-[1.02rem] font-semibold leading-[1.35] tracking-tight text-stone-900 [text-wrap:pretty] sm:mt-2 sm:text-[1.35rem] sm:leading-[1.3] lg:text-[1.55rem]">
              {variety.name}
            </h3>
            <span className="inline-flex w-fit items-center rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500 sm:px-3 sm:text-xs">
              {variety.countries.length} countries
            </span>
          </div>
          <p className="mt-2 hidden text-sm leading-7 text-stone-600 sm:mt-3 sm:block">{variety.summary}</p>
          <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
            {variety.highlights.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-700 sm:px-3 sm:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function WineryCard({ winery }: { winery: WineWineryEntry }) {
  return (
    <Link
      href={`/wine/${winery.primaryVarietySlug}#${winery.primaryCountrySlug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)] sm:rounded-[1.4rem] sm:p-5 lg:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
            {wineStyleLabels[winery.style]}
          </p>
          <h3 className="mt-1 text-[1.02rem] font-semibold leading-[1.35] tracking-tight text-stone-900 [text-wrap:pretty] sm:mt-2 sm:text-[1.35rem] sm:leading-[1.3]">
            {winery.name}
          </h3>
        </div>
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500 sm:px-3 sm:text-xs">
          {winery.bottleCount} wines
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-stone-600">{winery.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {winery.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-700 sm:px-3 sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-stone-500">
        代表商品: {winery.exampleBottle}
      </p>
    </Link>
  );
}

function RegionCard({ region }: { region: WineRegionEntry }) {
  return (
    <Link
      href={`/wine/${region.primaryVarietySlug}#${region.countrySlug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)] sm:rounded-[1.4rem] sm:p-5 lg:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
            {region.country}
          </p>
          <h3 className="mt-1 text-[1.02rem] font-semibold leading-[1.35] tracking-tight text-stone-900 [text-wrap:pretty] sm:mt-2 sm:text-[1.35rem] sm:leading-[1.3]">
            {region.region}
          </h3>
        </div>
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500 sm:px-3 sm:text-xs">
          {region.bottleCount} wines
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-stone-600">{region.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {region.highlights.map((item) => (
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

export function WineExplorer({ varieties }: Props) {
  const [style, setStyle] = useState<WineStyle>("red");
  const [mode, setMode] = useState<ExplorerMode>("variety");
  const filteredVarieties = varieties.filter((variety) => variety.style === style);
  const wineries = useMemo(() => getWineWineries(varieties, style), [style, varieties]);
  const regions = useMemo(() => getWineRegions(varieties, style), [style, varieties]);

  return (
    <section className="mx-auto mt-8 max-w-6xl max-md:rounded-[1.6rem] max-md:border max-md:border-white/50 max-md:bg-[rgba(247,242,234,0.84)] max-md:p-4 max-md:shadow-[0_16px_44px_rgba(48,29,19,0.08)] max-md:backdrop-blur-sm">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-[1.1rem] bg-stone-200/70 p-1.5 max-md:sticky max-md:top-3 max-md:z-10 max-md:bg-[rgba(238,231,223,0.96)] sm:grid-cols-3 sm:rounded-none sm:bg-transparent sm:p-0 lg:grid-cols-5">
        {wineStyleOrder.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStyle(tab)}
            className={`rounded-[0.9rem] px-3 py-3 text-sm font-semibold transition sm:rounded-full sm:px-5 sm:py-3 ${
              style === tab
                ? "bg-stone-900 text-stone-50 shadow-[0_10px_24px_rgba(48,29,19,0.18)]"
                : "bg-white/85 text-stone-700 hover:bg-white"
            }`}
          >
            {wineStyleLabels[tab]}
          </button>
        ))}
      </div>

      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {wineStyleCaptions[style]}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            品種・ワイナリー・産地から探す
          </h2>
        </div>
        <p className="text-sm text-stone-500">
          {mode === "variety"
            ? `${filteredVarieties.length} varieties`
            : mode === "winery"
              ? `${wineries.length} wineries`
              : `${regions.length} regions`}
        </p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2 rounded-[1rem] bg-stone-100/80 p-1.5 sm:flex sm:flex-wrap sm:rounded-full sm:bg-transparent sm:p-0">
        {explorerModes.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`rounded-[0.85rem] px-3 py-2.5 text-sm font-semibold transition sm:rounded-full sm:px-5 ${
              mode === tab.id
                ? "bg-stone-900 text-stone-50 shadow-[0_10px_24px_rgba(48,29,19,0.18)]"
                : "bg-white/85 text-stone-700 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-5 rounded-[1rem] border border-stone-200/80 bg-[rgba(248,244,237,0.92)] p-4">
        <p className="text-sm leading-7 text-stone-600">
          Vivino のように `品種` だけでなく、`ワイナリー` や `産地` からも入れるようにしています。好きな品種を見つけたら、そのまま有名ワイナリーや主要産地へ掘り下げられます。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3">
        {mode === "variety"
          ? filteredVarieties.map((variety) => (
              <VarietyCard key={variety.slug} variety={variety} />
            ))
          : null}
        {mode === "winery"
          ? wineries.map((winery) => (
              <WineryCard key={winery.slug} winery={winery} />
            ))
          : null}
        {mode === "region"
          ? regions.map((region) => (
              <RegionCard key={region.slug} region={region} />
            ))
          : null}
      </div>
    </section>
  );
}
