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
      className="rounded-[1.4rem] border border-white/50 bg-white/82 p-4 shadow-[0_12px_34px_rgba(48,29,19,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(48,29,19,0.12)]"
    >
      <div className="grid gap-4 md:grid-cols-[140px_1fr]">
        <div className="overflow-hidden rounded-[1rem] bg-[linear-gradient(180deg,rgba(248,244,237,1),rgba(234,225,214,0.92))]">
          <DrinkIllustration
            kind="wine"
            title={variety.name}
            accent={variety.accent}
            idBase={`wine-explorer-${variety.slug}`}
          />
        </div>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                {variety.style === "red" ? "Red Variety" : "White Variety"}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                {variety.name}
              </h3>
            </div>
            <span className="text-sm text-stone-500">{variety.countries.length} countries</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-600">{variety.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {variety.highlights.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
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
    <section className="mx-auto mt-8 max-w-6xl">
      <div className="mb-5 flex flex-wrap gap-3">
        {([
          { id: "red", label: "赤ワイン" },
          { id: "white", label: "白ワイン" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStyle(tab.id)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              style === tab.id
                ? "bg-stone-900 text-stone-50"
                : "border border-stone-300 bg-white/80 text-stone-700"
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
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            品種から国別へ
          </h2>
        </div>
        <p className="text-sm text-stone-500">{varieties.length} varieties</p>
      </div>

      <div className="grid gap-4">
        {varieties.map((variety) => (
          <VarietyCard key={variety.slug} variety={variety} />
        ))}
      </div>
    </section>
  );
}
