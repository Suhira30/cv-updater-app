# Task Breakdown — LaTeX CV Creator & Updater

## Tech Stack Evaluation & Recommended Additions

Our evaluation confirms that your **7-point tech stack is 100% optimal for BOTH Path A (Create from Scratch Wizard) and Path B (Existing `.tex` Import + Updation)**. Below is the final stack specification with 3 small utility additions for form validation and diff computation:

| Layer | Technology Choice | Role & Rationale for Path A & Path B |
|---|---|---|
| **1. Frontend Framework** | **Next.js 14+ (App Router, React, TypeScript)** | Excellent routing for wizard steps (`/create/template`, `/create/wizard`) and split workspace (`/workspace`). Strict TypeScript schemas for questionnaire data and diff payloads. |
| **2. UI & Styling** | **Tailwind CSS + Shadcn UI** | Utility styling matching design tokens (`design/tokens/design-tokens.md`). Shadcn UI provides unstyled accessible primitives (steppers, dialogs, dropdowns, buttons). |
| **Form Validation (Addition)** | **React Hook Form + Zod** | *Recommended Addition*: Ensures robust client-side validation for the multi-step questionnaire wizard in Path A. |
| **3. Code Diff Viewer** | **Monaco Editor (`@monaco-editor/react`)** | Industry-standard diff editor showing side-by-side `.tex` code diffs with line `+`/`-` markers, syntax highlighting, and custom hunk action widgets. |
| **Diff Utility (Addition)** | **`diff-match-patch` / `diff`** | *Recommended Addition*: Computes fast line-level diff hunks for Monaco Editor and accept/reject state tracking. |
| **4. PDF Rendering** | **`react-pdf` (pdf.js)** | Client-side PDF canvas renderer with zoom (`+`, `-`, `Fit`), page navigation, and instant binary buffer rendering. |
| **5. Backend & LaTeX Compiler** | **Tectonic Engine (Rust-based in Docker)** | Fast (<1s compile), auto-downloads required CTAN packages on the fly, self-contained binary running inside a Docker container on Render / Cloud Run / AWS. |
| **6. LLM Integration** | **Vercel AI SDK (OpenAI / Anthropic / Gemini)** | Multi-provider streaming SDK supporting BYO API Key request headers. |
| **7. State & Privacy Storage** | **Zustand + Browser SessionStorage** | Client-side state store for wizard inputs, candidate diffs, session API keys, and compiler logs with zero server-side CV database storage. |

---

## Design Brief UI/UX & Frontend Task Breakdown (from `docs/02-design-brief.md`)

### Epic 1 — Design System & Global Navigation (Sprint 1)
- [ ] Configure Tailwind theme with tokens from `design/tokens/design-tokens.md` (colors, typography scale, 4px spacing grid, shadows, border radiuses)
- [ ] Build `NavigationHeader` component with logo, step progress badge, and API key status pill (`Key Configured ✓`)
- [ ] Build `ApiKeyModal` dialog with provider selector (OpenAI, Anthropic, Gemini), password-masked input, reveal toggle, and local session storage handler

### Epic 2 — Entry Selection & Path A Questionnaire Wizard (Sprint 2)
- [ ] Build `Landing/EntrySelection` UI featuring dual hero action cards: *"Create from Scratch (Path A)"* vs *"Upload Existing .tex (Path B)"*
- [ ] Build `TemplateGallery` card grid with 3 starter templates (*Technical SWE*, *Academic/Research*, *Clean Minimal*) and visual hover previews
- [ ] Build `WizardStepper` progress bar tracking steps (`Personal Info` → `Experience` → `Education` → `Skills` → `Projects`)
- [ ] Implement `DynamicFormSection` using React Hook Form + Zod for repeating input fields (`+ Add Position`, `+ Add Project`, `+ Add Skill`)
- [ ] Connect wizard completion to initial LaTeX generator & PDF compiler

### Epic 3 — Path B Upload & Style Contract UI (Sprint 3)
- [ ] Build `FileDropzone` component supporting drag-and-drop `.tex` files and direct paste textarea with syntax validation
- [ ] Build `StyleTraitCard` summary grid displaying auto-detected preamble macros (`\cvitem`), date formats, and bullet tenses
- [ ] Implement Style Contract Confirmation view

### Epic 4 — Core Split Workspace & Incremental Updation UI (Sprint 4)
- [ ] Build 50/50 flex responsive split workspace layout (`CVWorkspace` component)
- [ ] Build `UpdatePromptBox` text area with natural language input & quick suggestion chips (*"Add project"*, *"Update job title"*, *"Add reference"*)
- [ ] Integrate `MonacoDiffEditor` displaying side-by-side code diffs with line `+`/`-` markers and custom hunk `[✓ Accept]` / `[✕ Reject]` action buttons
- [ ] Build `PdfViewer` canvas viewport with zoom (`+`, `-`, `Fit`), page flip, and print controls
- [ ] Implement `LoadingOverlay` multi-stage progress modal (*"Analyzing .tex → Smart placement → Compiling PDF (Attempt N/3)"*)

### Epic 5 — Error Diagnostics, Alerts & Export Modal (Sprint 5)
- [ ] Build `ErrorCard` component featuring plain-language error diagnostics, collapsible raw TeX compiler log accordion, and recovery CTAs
- [ ] Build `PageOverflowBanner` alert banner triggered when compilation page count expands (e.g. 1 → 2 pages) with 1-click *"AI Bullet Trimmer"* CTA
- [ ] Build `ExportModal` dialog for downloading `.pdf` and `.tex` source files

### Epic 6 — Accessibility & Production Hardening (Sprint 6)
- [ ] Enforce WCAG 2.1 AA keyboard focus rings (`outline: 2px solid #4D8BFF` on focus-visible)
- [ ] Configure `aria-live="polite"` regions for compilation status and `aria-live="assertive"` for compile errors
- [ ] Ensure color-independent diff styling (`+` / `-` symbols with strikethrough for deleted code)
- [ ] End-to-end testing across Chrome, Firefox, Edge, and Safari
