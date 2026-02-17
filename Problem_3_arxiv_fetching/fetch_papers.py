#!/usr/bin/env python3
"""
fetch_papers.py — Fetch the latest arXiv papers for a set of keywords and
save them as a JSON file that the website can consume.

Uses the official arXiv API via the `arxiv` Python package.
"""

import json
import datetime
import arxiv

# ── Configuration ───────────────────────────────────────────────
# Each entry: (display_name, arXiv query string)
# Using ti: (title) and abs: (abstract) field prefixes for targeted results.
KEYWORDS = [
    ("Medical reasoning LLM", 'ti:"medical reasoning" AND abs:"large language model"'),
    ("Large language model", 'ti:"large language model"'),
    ("Agentic AI", 'ti:"agentic" OR (abs:"agentic" AND abs:"AI agent")'),
]
MAX_RESULTS_PER_KEYWORD = 15  # papers per keyword
OUTPUT_FILE = "Problem_1_Github_website/data/papers.json"
# ────────────────────────────────────────────────────────────────


def fetch_papers() -> list[dict]:
    """Query arXiv for each keyword and return a de-duplicated list of papers."""
    seen_ids: set[str] = set()
    papers: list[dict] = []

    client = arxiv.Client()

    for display_name, query_str in KEYWORDS:
        search = arxiv.Search(
            query=query_str,
            max_results=MAX_RESULTS_PER_KEYWORD,
            sort_by=arxiv.SortCriterion.SubmittedDate,
            sort_order=arxiv.SortOrder.Descending,
        )

        for result in client.results(search):
            paper_id = result.entry_id
            if paper_id in seen_ids:
                continue
            seen_ids.add(paper_id)

            papers.append(
                {
                    "id": paper_id,
                    "title": result.title.replace("\n", " "),
                    "authors": [a.name for a in result.authors],
                    "abstract": result.summary.replace("\n", " "),
                    "published": result.published.strftime("%Y-%m-%d"),
                    "updated": result.updated.strftime("%Y-%m-%d"),
                    "pdf_url": result.pdf_url,
                    "keyword": display_name,
                }
            )

    # Sort by published date (newest first)
    papers.sort(key=lambda p: p["published"], reverse=True)
    return papers


def main() -> None:
    print(
        f"[{datetime.datetime.now(datetime.timezone.utc).isoformat()}] Fetching arXiv papers …"
    )
    papers = fetch_papers()
    print(f"  → fetched {len(papers)} unique papers")

    payload = {
        "last_updated": datetime.datetime.now(datetime.timezone.utc).strftime(
            "%Y-%m-%d %H:%M UTC"
        ),
        "keywords": [name for name, _ in KEYWORDS],
        "papers": papers,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"  → saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
