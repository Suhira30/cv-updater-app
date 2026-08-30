# TeXForge CV — LaTeX CV Creator & Updater 📄✨

> **Create and update publication-grade LaTeX resumes in seconds — zero manual code editing required.**

![Next.js](https://img.shields.io/badge/Next.js-14+-09090b?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-09090b?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-09090b?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-09090b?style=flat-square&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-09090b?style=flat-square&logo=shadcnui&logoColor=white)
![Compiler](https://img.shields.io/badge/Compiler-Tectonic_Rust-09090b?style=flat-square&logo=rust&logoColor=orange)
![License](https://img.shields.io/badge/License-MIT-09090b?style=flat-square)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [The Problem & Solution](#-the-problem--solution)
- [Dual User Workflows](#-dual-user-workflows)
  - [Path A: Create from Scratch (New Users)](#path-a-create-from-scratch-new-users)
  - [Path B: Existing .tex Import & Incremental Updates](#path-b-existing-tex-import--incremental-updates)
- [User Stories](#-user-stories)
- [Core Features](#-core-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [System Requirements & Prerequisites](#-system-requirements--prerequisites)
- [Getting Started](#-getting-started)
- [Zero-Setup AI Engine & Privacy Policy](#-zero-setup-ai-engine--privacy-policy)
- [Documentation Quick Links](#-documentation-quick-links)
- [License](#-license)

---

## 🔍 Overview

**TeXForge CV** is a modern web application designed for software engineers, ML developers, graduate students, researchers, and academics who want the **flawless typography of LaTeX** without the frustration of hand-editing code, fixing broken packages, or debugging compiler errors.

Whether you need a fresh LaTeX CV built from a battle-tested template or want to perform routine updates on your existing `.tex` source using plain English prompts, TeXForge handles syntax formatting, macro placement, sandboxed compilation, side-by-side diffing, and live PDF previewing automatically.

---

## ⚡ The Problem & Solution

### The Problem

1. **High Initial Creation Barrier**: Creating a custom LaTeX CV from scratch requires downloading multi-gigabyte TeX distributions, learning complex formatting syntax (`\begin{itemize}`, preambles, custom macros), or wrestling with fragile online templates.
2. **High Recurring Maintenance Tax**: Updating an existing LaTeX CV requires locating custom macros, maintaining bullet styling/tenses, avoiding unescaped special characters (`%`, `&`, `_`), and fitting within page limits.

### The Solution

- **Zero Manual Code Editing**: Fill out a guided questionnaire to build a new CV or paste your existing `.tex` code to import your custom macros.
- **Natural Language Updation Engine**: Tell the AI what you want to add or change in plain English (e.g., *"Add a new job bullet under Experience at Acme Corp about building a RAG pipeline"*).
- **Smart Placement & Sandboxed Compile**: The AI converts prompts into matching LaTeX macros, places them into the exact target section, compiles via a sandboxed Rust-based TeX engine (Tectonic), and displays live side-by-side diffs + PDF previews.

---

## 🔄 Dual User Workflows

```text
                           ┌─────────────────────────────────────────┐
                           │            TeXForge CV App              │
                           └────────────────────┬────────────────────┘
                                                │
                     ┌──────────────────────────┴──────────────────────────┐
                     ▼                                                     ▼
         [Path A: Create New]                                [Path B: Import Existing]
                     │                                                     │
   Select Starter Template (SWE/Academic/Minimal)                 Upload / Paste Existing .tex Source
                     │                                                     │
   Guided Questionnaire Wizard (Info/Exp/Edu/Skills)              Preamble & Custom Macro Extractor
                     │                                                     │
  Generates Initial .tex & Compiles PDF Preview                 Compiles Initial PDF Preview
                     │                                                     │
                     └──────────────────────────┬──────────────────────────┘
                                                │
                                                ▼
                                 [Incremental Updation Phase]
                                                │
                              Plain-Text Natural Language Prompt
                                                │
                             AI Smart Placement & Macro Matcher
                                                │
                             Sandboxed Compilation & Auto-Retry
                                                │
                     ┌──────────────────────────┴──────────────────────────┐
                     ▼                                                     ▼
        [Mode 1: Code & PDF Split View]                   [Mode 2: Side-by-Side PDF Comparison]
                     │                                                     │
     Monaco Diff + Live PDF Viewport                       Old PDF vs. New PDF Visual Preview
                     │                                                     │
                     └──────────────────────────┬──────────────────────────┘
                                                │
                                                ▼
                             One-Click Copy LaTeX Code & Download PDF
```

### Path A: Create from Scratch (New Users)

1. **Select Template**: Pick a starter template (*Technical SWE*, *Academic/Research*, *Clean Minimal*).
2. **Fill Questionnaire**: Step-by-step wizard collects Personal Details, Experience, Education, Skills, and Projects.
3. **Generate & Preview**: Generates clean `.tex` source and compiles a live PDF preview.

### Path B: Existing `.tex` Import & Incremental Updates

1. **Upload `.tex` Source**: Drag-and-drop or paste your existing `.tex` file.
2. **Style & Macro Indexing**: Automatically extracts preambles, custom macros (`\cvitem`, `\publication`), bullet verb tenses, and section structures.
3. **Plain-Text Updation**: Provide an update prompt (e.g., *"Add my AWS Architect Certification under Skills"*).
4. **Smart Placement & Diff**: The AI converts the prompt into matching LaTeX macros, inserts it into the correct section, sandboxes the compilation, and shows a side-by-side diff (old vs. new `.tex`) alongside the updated PDF.

---

## 👤 User Stories

- **US1 (Template Wizard)**: *As a job seeker without LaTeX expertise*, I want to select a template and complete a simple questionnaire so that I get a publication-grade LaTeX CV and downloadable PDF instantly.
- **US2 (Existing `.tex` Import)**: *As a developer with an existing LaTeX CV*, I want to upload my `.tex` file so that the system indexes my custom macros and formatting conventions.
- **US3 (Natural Language Updation)**: *As a user updating my CV*, I want to type simple update instructions in plain English, so that the AI automatically formats the changes into matching LaTeX macros and places them in the exact right section.
- **US4 (Sandboxed Compilation Guarantee)**: *As a user*, I want automatic backend compilation with LLM error-recovery retries, ensuring I am never handed broken LaTeX code.
- **US5 (Dual Viewports — Code Diff, Side-by-Side PDF Comparison & Instant Export)**: *As a user*, I want to review both a side-by-side code diff (old vs. new `.tex`) AND a visual side-by-side PDF comparison (Original PDF vs. Updated PDF preview), with one-click buttons to copy updated LaTeX code to clipboard and download the updated PDF CV.
- **US6 (Page-Length Alert)**: *As a user keeping a 1-page resume*, I want to be alerted if an update pushes my CV onto a second page and receive AI bullet compression suggestions.

---

## ✨ Core Features

### MVP (Phase 1)

- 🎨 **Dual Onboarding Paths**: Template gallery + questionnaire wizard (Path A) or existing `.tex` dropzone (Path B).
- ⚡ **Zero-Setup AI Model Selector**: Managed server keys for **Google Gemini**, **OpenAI GPT-4o**, and **Anthropic Claude 3.5 Sonnet** out of the box — no API key prompts required!
- 🧠 **Smart Placement AI Engine**: Parses `.tex` structure, maps natural language prompts to target sections, and generates matching custom macros with LaTeX character escaping.
- ⚙️ **Sandboxed Compile & Auto-Retry Loop**: Containerized Tectonic engine with automated multi-turn error recovery (up to 3 retries).
- 🔍 **Dual Workspace Viewports**: 
  - *Mode 1 (Code & PDF View)*: Monaco Editor diff viewer showing line `+`/`-` changes with `[✓ Accept]` and `[✕ Reject]` toggles alongside PDF preview.
  - *Mode 2 (Side-by-Side PDF Comparison)*: Visual comparison between **Original PDF (Before Update)** and **Updated PDF (After AI Placement)**.
- 📋 **One-Click Copy & Export**: One-click **Copy Updated LaTeX Code** to clipboard and **Download Updated PDF CV** buttons.
- ⚠️ **Page-Length Awareness**: Automatic pre/post compile page count comparison with page overflow warning banners and 1-click **AI Bullet Trimmer**.

### Phase 1.5 & V2 (Future Roadmap)

- ✂️ **1-Click AI Bullet Trimmer**: Automatic conciseness engine to pull 2-page overflows back onto 1 page.
- 📜 **Session Version History**: Local undo/redo and snapshot rollback stack.
- 🎯 **Job Description Tailoring**: Paste a job description to get automated bullet reordering and keyword emphasis.
- 📄 **ATS-Safe Export**: Export plain text and DOCX files for Applicant Tracking Systems.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 14+ (App Router, React, TypeScript) | High-performance routing, client components, and API routes. |
| **Styling & UI** | Tailwind CSS + Shadcn UI | Design token styling (`design/tokens/design-tokens.md`) with accessible primitives. |
| **Form Handling** | React Hook Form + Zod | Schema validation for multi-step questionnaire forms. |
| **Code Diff Editor** | Monaco Editor (`@monaco-editor/react`) | Interactive side-by-side code diff viewer with LaTeX syntax highlighting. |
| **PDF Renderer** | `react-pdf` (pdf.js) | High-DPI client-side PDF rendering canvas. |
| **LaTeX Compilation** | Tectonic Engine (Rust LaTeX Compiler) | Fast (<1s compile), auto-downloads CTAN packages, containerized execution. |
| **LLM Integration** | Vercel AI SDK (Gemini / OpenAI / Anthropic) | Multi-provider AI engine layer supported by server keys. |
| **State & Privacy** | Zustand + SessionStorage | Client-side state management with zero server database footprint. |

---

## 📁 Project Directory Structure

```text
cv-updater-app/
├── README.md                          # Project overview & setup instructions
├── docs/
│   ├── 01-prd.md                      # Product Requirements Document (Problem, Users, Features)
│   └── 02-design-brief.md             # Design Brief (User flows, Screens, Components, A11y)
├── design/
│   ├── tokens/
│   │   └── design-tokens.md           # Color palette, typography scale, spacing, radiuses
│   └── wireframes/                    # UI wireframe assets
├── prompts/
│   └── llm-prompt-structure.md        # System prompts, user prompt templates, compile retry loop
├── tasks/
│   └── task-breakdown.md              # Phased sprint tasks & tech stack breakdown
└── src/                               # Application source code (Next.js App Router)
    ├── app/                           # Page routes & API endpoints
    │   ├── api/                       # /api/update & /api/compile routes
    │   ├── create/                    # Path A Questionnaire Wizard page
    │   ├── upload/                    # Path B Upload & Style Extraction page
    │   └── workspace/                 # Core Interactive Editing Workspace page
    ├── components/                    # UI components
    │   ├── wizard/                    # TemplateGallery, WizardStepper, QuestionnaireForm
    │   ├── upload/                    # FileDropzone, StyleTraitCard, StyleContractSummary
    │   └── workspace/                 # UpdatePromptBox, MonacoDiffEditor, PdfViewer, SideBySidePdfViewer, ErrorCard, PageOverflowBanner, ExportModal
    ├── lib/                           # LaTeX sanitizer, Style Extractor, Template Builder
    ├── store/                         # Zustand state stores (useWizardStore, useUploadedCvStore, useWorkspaceStore, useApiKeyStore)
    └── types/                         # Strict TypeScript type definitions
```

---

## 💻 System Requirements & Prerequisites

Before running the project locally, ensure you have:

- **Node.js**: `v18.17.0` or higher
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`
- **Docker** *(Optional for local compilation)*: Required if compiling LaTeX locally via the Tectonic container image.
- **LLM API Key**: Google Gemini, OpenAI, or Anthropic API key (configured in `.env.local`).

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Suhira30/cv-updater-app.git
cd cv-updater-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Server-Side Managed API Key (Git-ignored)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Compiler microservice URL (defaults to local container)
TECTONIC_COMPILER_URL=http://localhost:8080/compile
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Zero-Setup AI Engine & Privacy Policy

TeXForge CV is built with a **Privacy-First Architecture**:

- **Zero User Setup**: Users are never forced to supply API keys. Our server environment variables handle compilation and formatting calls automatically.
- **Provider Choice**: Users can switch AI providers (**Google Gemini**, **OpenAI GPT-4o**, **Anthropic Claude**) anytime via the UI header model selector.
- **No Cloud Database**: Resume contents are never stored in a backend database or retained for AI training.

---

## 🔗 Documentation Quick Links

- 📘 **[Product Requirements Document (PRD)](docs/01-prd.md)**
- 🎨 **[Design Brief & UI Layouts](docs/02-design-brief.md)**
- 🎨 **[Design Tokens Specification](design/tokens/design-tokens.md)**
- 🤖 **[LLM Prompt Structures](prompts/llm-prompt-structure.md)**
- 📋 **[Phased Task Breakdown](tasks/task-breakdown.md)**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.