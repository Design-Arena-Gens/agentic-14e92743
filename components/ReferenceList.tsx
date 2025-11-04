"use client";

import { useEffect, useMemo, useState } from "react";
import { formatAuthors, toJstorUrl } from "../lib/citation";

type CrossrefItem = {
  DOI?: string;
  title?: string[];
  author?: { family?: string; given?: string }[];
  issued?: { "date-parts"?: number[][] };
  "container-title"?: string[];
  URL?: string;
  type?: string;
  subject?: string[];
};

const DEFAULT_KEYWORDS = [
  "sentimental",
  "sensibility",
  "virtue",
  "gender",
  "class",
  "chastity",
  "marriage",
  "novel",
  "moral",
  "emotion"
];

export default function ReferenceList() {
  const [items, setItems] = useState<CrossrefItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("Pamela Samuel Richardson");
  const [keywords, setKeywords] = useState<string[]>(DEFAULT_KEYWORDS);

  useEffect(() => {
    let canceled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL("https://api.crossref.org/works");
        url.searchParams.set("query", query);
        url.searchParams.set("rows", "60");
        url.searchParams.set("select", [
          "title",
          "author",
          "issued",
          "container-title",
          "DOI",
          "URL",
          "type",
          "subject"
        ].join(","));
        url.searchParams.set("sort", "issued");
        url.searchParams.set("order", "desc");

        const res = await fetch(url.toString(), {
          headers: { "User-Agent": "Pamela-References/1.0 (mailto:example@example.com)" }
        });
        if (!res.ok) throw new Error(`Crossref error ${res.status}`);
        const data = await res.json();
        const raw: CrossrefItem[] = data?.message?.items ?? [];
        const filtered = raw
          .filter((it) => it.type === "journal-article")
          .filter((it) => (it.DOI ?? "").startsWith("10.2307/")) // JSTOR DOI prefix
          .map((it) => it);
        if (!canceled) setItems(filtered);
      } catch (e: any) {
        if (!canceled) setError(e?.message || "Failed to load references");
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    run();
    return () => {
      canceled = true;
    };
  }, [query]);

  const refined = useMemo(() => {
    const kw = new Set(keywords.map((k) => k.toLowerCase()));
    return items.filter((it) => {
      const title = (it.title?.[0] || "").toLowerCase();
      const subj = (it.subject || []).join(" ").toLowerCase();
      // Keep if any keyword appears in title or subject
      for (const k of kw) {
        if (k && (title.includes(k) || subj.includes(k))) return true;
      }
      // Always include core Pamela/Richardson items
      return title.includes("pamela") || title.includes("richardson");
    });
  }, [items, keywords]);

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search query (e.g., Pamela sentimental virtue)"
          aria-label="Search query"
        />
        <div>
          {keywords.map((k) => (
            <span key={k} className="badge">{k}</span>
          ))}
        </div>
      </div>

      {loading && <p className="muted">Loading JSTOR-indexed articles?</p>}
      {error && <p className="muted">{error}</p>}

      {!loading && !error && (
        <div className="refList">
          {refined.map((it) => (
            <RefCard key={it.DOI} item={it} />
          ))}
          {refined.length === 0 && (
            <p className="muted">No results matched the current filters. Try broadening the search.</p>
          )}
        </div>
      )}
    </div>
  );
}

function RefCard({ item }: { item: CrossrefItem }) {
  const year = item.issued?.["date-parts"]?.[0]?.[0];
  const title = item.title?.[0] || "Untitled";
  const journal = item["container-title"]?.[0] || "";
  const authors = formatAuthors(item.author || []);
  const jstorUrl = toJstorUrl(item.DOI || "");

  return (
    <article className="refCard">
      <a className="refTitle" href={jstorUrl} target="_blank" rel="noreferrer noopener">
        {title}
      </a>
      <div className="refMeta">
        {authors && <span>{authors}. </span>}
        {journal && <em>{journal}</em>}
        {year ? <span>, {year}. </span> : <span>. </span>}
        <a href={jstorUrl} target="_blank" rel="noreferrer noopener">JSTOR</a>
      </div>
    </article>
  );
}
