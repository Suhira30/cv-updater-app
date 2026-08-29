# Design Brief — LaTeX CV Creator & Updater

## 1. Core User Flows

### Path A — Create from Scratch (New Users)
```
Landing Page 
  └─► Select "Create from Scratch (Template)"
        └─► Template Gallery (Technical SWE, Academic/Research, Clean Minimal)
              └─► Guided Questionnaire Wizard (Personal Info → Experience → Education → Skills → Projects)
                    └─► API Key Setup (BYO OpenAI / Anthropic / Gemini Key)
                          └─► Generating LaTeX Code & PDF Sandbox Compile
                                └─► Workspace: Live PDF Preview & Initial Download (.tex / .pdf)
```

### Path B — Future Incremental Updates (Existing `.tex` Context)
```
CV Workspace (Loaded with User's Existing / Generated .tex Source)
  └─► "Add / Modify Content" Prompt Input Box (e.g., "Add new job bullet under Experience at Acme Corp: Built a RAG pipeline...")
        └─► AI Smart Placement Engine (maps update into existing .tex structure using matching macros)
              └─► Sandboxed Compilation (Auto-Retry loop on error)
                    └─► Side-by-Side Diff Review (Old vs New .tex) & Live PDF Preview Update
                          └─► Download Updated .pdf / .tex
```

---

## 2. Screen Inventory

| # | Screen / Modal | Purpose / Key Role |
|---|---|---|
| 1 | **Landing / Entry Selection** | Choices: *"Create from Scratch (Path A)"* or *"Upload Existing .tex (Path B)"*. |
| 2 | **Template Gallery** | Visual card selection of starter LaTeX CV templates (*Technical SWE*, *Academic*, *Minimal*). |
| 3 | **Guided Questionnaire Wizard** | Multi-step form collecting Name, Contact, Experience, Education, Skills, and Projects. |
| 4 | **Upload Existing `.tex`** | Drag-and-drop / paste `.tex` file container for Path B users. |
| 5 | **API Key Configuration Modal** | BYO API key entry (OpenAI, Anthropic, Gemini) with local session storage. |
| 6 | **Style Contract Summary** | Auto-detected macro summary for uploaded `.tex` files (preamble commands, bullet tenses, date formats). |
| 7 | **CV Workspace & Update Panel** | Core interface: Left pane = Natural language update prompt + code diff review; Right pane = Live PDF preview. |
| 8 | **Generating Overlay** | Multi-stage progress modal (*"Analyzing .tex structure → Placement AI → Compiling PDF (Attempt N/3)"*). |
| 9 | **Compile Error State** | Human-readable error diagnostic card with raw TeX log accordion and recovery options. |
| 10| **Export / Download Modal** | One-click export options for `.pdf` and `.tex` source files. |
