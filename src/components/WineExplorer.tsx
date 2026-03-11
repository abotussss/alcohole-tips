"use client";

import Link from "next/link";
import { useState } from "react";
import type { WineStyle, WineVariety } from "@/data/catalog";
import { DrinkIllustration } from "@/components/DrinkIllustration";

type Props = {
  redVarieties: WineVariety[];
  whiteVarieties: WineVariety[];
};

function VarietyCard({ variety }: { variety: WineVariety }) {
  return (
    <Link
      href={`/wine/${variety.slug}`}
      className="rounded-[1rem] border border-white/50 bg-white/82 p-3 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)] sm:rounded-[1.4rem] sm:p-4"
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-[140px_1fr]">
        <div className="h-24 overflow-hidden rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))] sm:h-auto sm:rounded-[1rem]">
          <DrinkIllustration
            kind="wine"
            title={variety.name}
            accent={variety.accent}
            idBase={`wine-explorer-${variety.slug}`}
          />
        </div>
        <div>
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-xs sm:tracking-[0.2em]">
                {variety.style === "red" ? "Red Variety" : "White Variety"}
              </p>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-stone-900 sm:mt-2 sm:text-2xl">
                {variety.name}
              </h3>
            </div>
            <span className="text-[11px] text-stone-500 sm:text-sm">{variety.countries.length} countries</span>
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

export function WineExplorer({ redVarieties, whiteVarieties }: Props) {
  const [style, setStyle] = useState<WineStyle>("red");
  const varieties = style === "red" ? redVarieties : whiteVarieties;

  return (
    <section className="mx-auto mt-8 max-w-6xl max-md:rounded-[1.6rem] max-md:border max-md:border-white/50 max-md:bg-[rgba(247,242,234,0.84)] max-md:p-4 max-md:shadow-[0_16px_44px_rgba(48,29,19,0.08)] max-md:backdrop-blur-sm">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-[1.1rem] bg-stone-200/70 p-1.5 max-md:sticky max-md:top-3 max-md:z-10 max-md:bg-[rgba(238,231,223,0.96)] sm:flex sm:flex-wrap sm:gap-3 sm:rounded-none sm:bg-transparent sm:p-0">
        {([
          { id: "red", label: "赤ワイン" },
          { id: "white", label: "白ワイン" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStyle(tab.id)}
            className={`rounded-[0.9rem] px-3 py-3 text-sm font-semibold transition sm:rounded-full sm:px-5 sm:py-3 ${
              style === tab.id
                ? "bg-stone-900 text-stone-50 shadow-[0_10px_24px_rgba(48,29,19,0.18)]"
                : "bg-white/85 text-stone-700 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {style === "red" ? "Red" : "White"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            品種から国別へ
          </h2>
        </div>
        <p className="text-sm text-stone-500">{varieties.length} varieties</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {varieties.map((variety) => (
          <VarietyCard key={variety.slug} variety={variety} />
        ))}
      </div>
    </section>
  );
}
