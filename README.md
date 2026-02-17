# BST236 Computing I - Homework 1

## Introduction
This repository contains the code for **Homework 1** of the **BST236 Computing I** course (Spring 2026). The primary goal of this assignment is to practice **AI-assisted programming** using tools like GitHub Copilot to build web applications and automate workflows.

The repository is organized into three main problems:
1.  **Problem 1: GitHub Website** - A personal coding blog hosted on GitHub Pages, serving as the central hub for course assignments.
2.  **Problem 2: Pac-Man Game** - A browser-based Pac-Man game with a Valentine's Day theme, featuring AI-generated ghosts and game logic.
3.  **Problem 3: ArXiv Fetching** - An auto-updating feed of scientific papers (Work in Progress).

All code and assets were developed with significant assistance from AI agents, demonstrating the "Agentic Workflow" paradigm.

## Installation

To set up and run the code locally, follow these steps:

### 1. Clone the Repository
Open your terminal and run the following command to clone the repository to your local machine:

```bash
git clone https://github.com/ytian820/BST236_HW1.git
cd BST236_HW1/homework-1-ytian820
```


### 2. Dependencies
This project consists primarily of static HTML, CSS, and JavaScript files.
*   **No backend installation** (Node.js, Python, etc.) is required to run the website or game.
*   A modern web browser (Chrome, Safari, Firefox, Edge) is required.


## Usage

The website is deployed on GitHub Pages. Visit the live site at:

👉 **[https://ytian820.github.io/bst236-code-blog/](https://ytian820.github.io/bst236-code-blog/)**

### 1. Coding Blog Website (Problem 1)
The homepage displays an overview of all course assignments. Use the **sidebar navigation** on the left to switch between pages (Home, Homework 0, Homework 1).

![Homepage](assets/homepage.png)

### 2. Pac-Man Game (Problem 2)
Navigate to the **Homework 1** page and click **"Play Now"** on the Pac-Man card to launch the game.

*   **Controls**: Use Arrow Keys (⬆️, ⬇️, ⬅️, ➡️) to move Pac-Man.
*   **Objective**: Eat all dots and avoid the ghosts.
*   **Special Feature**: Collect the "Rose" power-up to turn ghosts into edible hearts! 💘

![Pac-Man Gameplay](assets/pacman_gameplay.png)

### 3. ArXiv Paper Feed (Problem 3)
Navigate to the **Homework 1** page and click **"Browse Papers"** on the ArXiv Paper Feed card. The feed displays the latest papers on LLMs, Medical AI, and Agentic AI, and is auto-updated daily via GitHub Actions.

*   **Filter by keyword**: Click the keyword badges (e.g., "Large language model") to filter papers by topic.
*   **Search**: Use the search bar to search papers by title, author, or abstract.



## Report

### 1. overview
This project was developed using an **Agentic Workflow**, where I acted as the orchestrator and utilized AI tools (GitHub Copilot, Large Language Models) to handle implementation details, debugging, and content generation.

### 2. AI Tools Used
*   **AI Coding Agent**: Used for complex task planning, multi-file refactoring, and automated bug fixing.

### 3. Problem 1: Coding Blog Website
 To build the website, I first asked chatGPT how to build a github page and what the file structure should look like. During this process, I learned the basic ideas of github pages and how to use it to host a website. 
 
 After getting familiar with the basic concepts, I started to plan the structure of the website. I decided to create a multi-page portfolio with a fixed sidebar navigation and a main content area. I spent some time designing the webpage. 
 
 After finalizing my design, I asked the agent (claude) to generate a TODO.md which lists all the steps to build a github webpage step-by-step. The TODO list generated is in the folder Problem_1_Github_website and can be accessed here: [Problem 1 TODO List](Problem_1_Github_website/TODO.md) 

 Then, I spent some time modifying the TODO list and refining the content. I noticed some errors and fixed them. After that, I asked the agent to generate the code and files in the project folder, which include html files and css files. This gave me an initial webpage.

 I noticed some bugs for this github webpage, so I wrote down the bugs and asked the agent to fix them. The agent fixed the bugs and gave me a new version of the webpage. I repeated this process until I was satisfied with the webpage.
 


### 4. Problem 2: Pac-Man Game (Valentine's Special)
In this problem, I implemented a fully functional Pac-Man game with custom mechanics using HTML Canvas and JavaScript. The goal was not only to reproduce the core gameplay of the classic Pac-Man, but also to extend it with a creative Valentine-themed power-up feature. Throughout the implementation process, I adopted an agentic programming approach using AI assistance to scaffold, iterate, and refine different components of the game.

I began by prompting the AI to generate a standard Pac-Man game structure using HTML Canvas. The objective at this stage was to establish a solid foundational architecture, including the game loop, entity classes (Pac-Man, Ghost, Maze, Pellet), collision detection logic, and rendering pipeline. By explicitly instructing the AI to focus on modular class design and a clear update–render cycle, I were able to obtain a clean separation between game state updates and drawing logic. This initial scaffolding significantly accelerated development and provided a structured baseline for further customization.

To satisfy the homework requirement of adding a Valentine-themed mechanic, I introduced a custom “Rose” power-up system. Instead of modifying the entire game logic at once, I used a targeted prompt strategy. Specifically, I instructed the AI to add a new Rose item such that when Pac-Man eats it, he enters a temporary powered-up state and continuously shoots heart projectiles in the direction he is facing. The AI generated a Rose class and implemented a shootHeart function, along with a timed power-up state variable. I then manually reviewed and refined the timing logic to ensure the power-up expired correctly and that heart projectiles interacted properly with ghost entities. This modular extension approach allowed me to integrate the new feature without disrupting the original game loop.

During testing, I encountered a critical bug where ghosts would occasionally become stuck inside the central “Ghost House” and fail to exit. Rather than manually tracing the entire codebase, I adopted an agent-assisted debugging workflow. I first provided a concise problem description to the AI: “Ghosts are not leaving the start area.” The AI analyzed the movement logic and suggested adding debug logs to trace ghost state transitions. Through this process, I identified that the random movement logic was trapping ghosts due to insufficient directional escape conditions. To resolve this, the AI proposed introducing an explicit inGhostHouse state flag that forces ghosts to move upward until they exit the starting enclosure. After implementing this state transition constraint, I verified the fix using visual trace logs and confirmed that ghost behavior returned to the intended chasing pattern.

Overall, this problem demonstrated how agent-assisted development can support both rapid prototyping and structured debugging. Instead of generating the entire project in a single pass, I decomposed the implementation into modular steps: initial scaffolding, feature extension, and targeted debugging. This iterative workflow improved code clarity, preserved modularity, and made the system easier to reason about. The final game preserves the recognizable Pac-Man mechanics—maze navigation, pellet collection, ghost chasing, life tracking—while incorporating the Valentine-themed rose power-up and heart projectile system as a creative extension.

### 5. Problem 3: ArXiv Paper Feed
In this problem, I built an auto-updating arXiv paper feed that fetches the latest research papers on topics of interest and displays them on the website. The feed is refreshed daily via a GitHub Actions workflow, making it a fully automated data scaffolding pipeline. The development process involved three main components: a Python fetching script, a frontend display page, and a CI/CD automation workflow.

I started by defining the research keywords I wanted to track: "Medical reasoning large language model," "Large language model," and "Agentic AI." I then asked the AI agent to generate a TODO.md outlining all the steps required to build the arXiv feed end-to-end. After reviewing and refining the plan, I instructed the agent to implement a Python script (`fetch_papers.py`) using the `arxiv` Python library. The script queries the arXiv API for each keyword, de-duplicates papers by their unique entry IDs, and saves the results to a JSON file (`data/papers.json`) that the frontend can consume.

Next, I asked the agent to create the frontend page (`arxiv.html`). I specified that it should match the existing dark-themed design of the website and include interactive features such as keyword filter badges, a search bar for filtering by title/author/abstract, and expandable abstracts. The agent generated the complete HTML page with embedded CSS and JavaScript. I reviewed the output and iterated on the design until the page matched my expectations.

For automation, I instructed the agent to create a GitHub Actions workflow (`.github/workflows/update_arxiv_feed.yml`) that runs daily at midnight UTC. The workflow checks out the repository, sets up Python, installs dependencies, runs the fetch script, and commits the updated `papers.json` back to the repository. I also enabled manual triggering via `workflow_dispatch` for on-demand updates.

During testing, I encountered several issues that required iterative debugging with the AI agent. First, the page failed to load papers when opened directly via the `file://` protocol due to browser CORS restrictions on `fetch()` requests. The agent explained that this was expected behavior and that the issue would not exist when served via HTTP or deployed to GitHub Pages. Second, I noticed that clicking the "Large language model" filter badge showed zero papers. After investigating, the agent identified that the original arXiv query was too generic — all three keyword searches returned the same set of latest papers, and the de-duplication logic removed all duplicates from the second and third keywords. To fix this, the agent rewrote the search queries using arXiv's field-specific syntax (`ti:` for title, `abs:` for abstract) with `AND`/`OR` operators, ensuring each keyword retrieved distinct, relevant papers. After this fix, all three keywords returned 15 papers each (45 total).

Finally, when deploying to GitHub Pages via a separate repository, I discovered that the website files were nested inside a `Problem_1_Github_website/` subfolder, which prevented GitHub Pages from finding the `index.html` at the repository root. I asked the agent to restructure the repository by moving all website files to the root level and updating all relative paths accordingly — including the Pac-Man link in `hw1.html`, the output path in `fetch_papers.py`, and the `git add` path in the GitHub Actions workflow.

Overall, this problem demonstrated the full lifecycle of an agentic development workflow: from initial planning and implementation, through iterative debugging of API queries, browser security issues, and deployment configuration, to a fully automated daily-updating paper feed. The key takeaway was that effective AI-assisted development requires clear problem descriptions and an iterative feedback loop — when I provided specific bug reports (e.g., "the Large language model filter shows 0 papers"), the agent could quickly diagnose and resolve the root cause.

## Contributions
*   **Yuan Tian**: Project setup, Website design, Pac-Man game implementation, and Report writing.

