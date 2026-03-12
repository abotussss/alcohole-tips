"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { SearchItem } from "@/data/catalog";

type Props = {
  items: SearchItem[];
  className?: string;
  title?: string;
  description?: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function scoreItem(item: SearchItem, query: string) {
  const normalizedQuery = normalize(query);
  const haystacks = [item.title, item.subtitle, ...item.keywords].map(normalize);

  if (haystacks.some((value) => value === normalizedQuery)) {
    return 100;
  }

  if (haystacks.some((value) => value.startsWith(normalizedQuery))) {
    return 80;
  }

  if (haystacks.some((value) => value.includes(normalizedQuery))) {
    return 60;
  }

  const queryChars = [...normalizedQuery];
  const subsequence = haystacks.some((value) => {
    let pointer = 0;
    for (const char of value) {
      if (char === queryChars[pointer]) {
        pointer += 1;
      }
      if (pointer === queryChars.length) {
        return true;
      }
    }
    return false;
  });

  return subsequence ? 30 : 0;
}

export function SearchPanel({ items, className = "", title, description }: Props) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) {
      return [];
    }

    return items
      .map((item) => ({ item, score: scoreItem(item, deferredQuery) }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 10)
      .map((entry) => entry.item);
  }, [items, deferredQuery]);

  return (
    <section
      className={`rounded-[1.35rem] border border-white/50 bg-white/82 p-4 shadow-[0_16px_44px_rgba(48,29,19,0.08)] backdrop-blur-sm sm:rounded-[1.8rem] sm:p-5 ${className}`}
    >
      {title ? (
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Search
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-7 text-stone-600">{description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-[1.2rem] border border-stone-200 bg-[rgba(248,244,237,0.95)] p-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="銘柄名、都道府県、品種、ワイナリー、産地で検索"
          className="w-full bg-transparent px-2 py-2 text-[15px] text-stone-900 outline-none placeholder:text-stone-400 sm:text-base"
        />
      </div>

      {query.trim() ? (
        <div className="mt-4 grid gap-3">
          {results.length ? (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-[1rem] border border-stone-200/80 bg-stone-50 px-4 py-3 transition hover:border-stone-400 hover:bg-white"
              >
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="mt-1 text-sm text-stone-500">{item.subtitle}</p>
              </Link>
            ))
          ) : (
            <div className="rounded-[1rem] bg-stone-50 px-4 py-4 text-sm text-stone-500">
              候補が見つかりません。別の表記でも試してください。
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
