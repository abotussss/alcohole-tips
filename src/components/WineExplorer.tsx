"use client";

import Link from "next/link";
import { useState } from "react";
import {
  type WineStyle,
  type WineVariety,
  wineStyleCaptions,
  wineStyleLabels,
  wineStyleOrder,
} from "@/data/catalog";
import { DrinkIllustration } from "@/components/DrinkIllustration";

type Props = {
  varieties: WineVariety[];
};

function VarietyCard({ variety }: { variety: WineVariety }) {
  return (
    <Link
      href={`/wine/${variety.slug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)] sm:rounded-[1.4rem] sm:p-5 lg:p-6"
    >
      <div className="grid gap-3 sm:gap-5 md:grid-cols-[176px_minmax(0,1fr)] xl:grid-cols-[188px_minmax(0,1fr)]">
        <div className="h-24 overflow-hidden rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))] sm:h-32 sm:rounded-[1rem] lg:h-36">
          <DrinkIllustration
            kind="wine"
            title={variety.name}
            accent={variety.accent}
            idBase={`wine-explorer-${variety.slug}`}
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
                {wineStyleLabels[variety.style]}
              </p>
              <h3 className="mt-1 overflow-hidden text-[0.98rem] font-semibold leading-[1.3] tracking-tight text-stone-900 break-words [overflow-wrap:anywhere] sm:mt-2 sm:text-[1.5rem] sm:leading-[1.24] lg:text-[1.72rem]">
                {variety.name}
              </h3>
            </div>
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

export function WineExplorer({ varieties }: Props) {
  const [style, setStyle] = useState<WineStyle>("red");
  const filteredVarieties = varieties.filter((variety) => variety.style === style);

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
            品種・スタイルから国別へ
          </h2>
        </div>
        <p className="text-sm text-stone-500">{filteredVarieties.length} items</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {filteredVarieties.map((variety) => (
          <VarietyCard key={variety.slug} variety={variety} />
        ))}
      </div>
    </section>
  );
}
