# Problem 3: Data Scaffolding from the Internet (arXiv Feed)

This TODO list outlines the steps to build an auto-updating arXiv paper feed for the website.

## 1. Plan & Setup
- [x] **Define Keywords**: "Medical reasoning large language model", "Large language model", "Agentic AI"
- [x] **Choose Data Format**: JSON (`papers.json`) for frontend flexibility

## 2. Implement Data Fetching Script
- [x] **Create Script**: `fetch_papers.py` in `Problem_3_arxiv_fetching/`
- [x] **Fetch Data**: Uses `arxiv` Python library, queries by keyword, de-duplicates by paper ID
- [x] **Process & Save**: Outputs to `Problem_1_Github_website/data/papers.json`
- [x] **Test Locally**: Verified — fetches 20 unique papers

## 3. Frontend Implementation
- [x] **Create Page**: `arxiv.html` in `Problem_1_Github_website/`
- [x] **Display Data**: JavaScript dynamically renders paper cards from `data/papers.json`
    - **Paper Listing**: Cards with title, authors, date, abstract, PDF link
    - **Paper Details**: Expandable abstracts (click to toggle), keyword badge
- [x] **Styling**: Dark theme matching site design, keyword filter badges, search bar

## 4. Automation (GitHub Actions)
- [x] **Create Workflow**: `.github/workflows/update_arxiv_feed.yml`
- [x] **Configure Trigger**: Daily midnight UTC cron + manual `workflow_dispatch`
- [x] **Define Steps**: Checkout → Setup Python → Install deps → Run script → Commit & push

## 5. Integration
- [x] **Update Homepage**: arXiv Feed card and sidebar link added to `index.html`
- [x] **Verify Navigation**: Confirmed working via local HTTP server

## 6. Documentation
- [ ] **Update Report**: Edit `README.md` to describe the implementation process
