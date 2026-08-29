# Design Tokens — LaTeX CV Updater

## 1. Color Palette

### Base & Surface Colors
| Token | Value | Usage / Notes |
|---|---|---|
| `color.bg.base` | `#FAFAF9` | App-wide background (Warm neutral tint) |
| `color.bg.surface` | `#FFFFFF` | Cards, panels, modal container background |
| `color.bg.surface-hover` | `#F5F5F4` | Interactive card hover state |
| `color.bg.code` | `#0D1117` | Dark mode code & diff panel background |
| `color.border.default` | `#E3E3E1` | Standard card and input border |
| `color.border.strong` | `#C7C7C4` | Hover and active input borders |
| `color.border.focus` | `#4D8BFF` | 2px accessibility focus ring outline |

### Text Colors
| Token | Value | Usage / Notes |
|---|---|---|
| `color.text.primary` | `#1A1A1A` | Main body text and headings |
| `color.text.secondary` | `#6B6B6B` | Captions, labels, helper text |
| `color.text.tertiary` | `#999999` | Disabled inputs, subtle icons |
| `color.text.on-code` | `#E6E6E6` | High contrast code text on `#0D1117` (11:1 ratio) |
| `color.text.on-primary` | `#FFFFFF` | Text on primary brand buttons |

### Brand & Interactive Accents
| Token | Value | Usage / Notes |
|---|---|---|
| `color.accent.primary` | `#2F6FED` | Primary brand action, active step, key buttons |
| `color.accent.primary-hover` | `#2559C4` | Hover state for primary buttons |
| `color.accent.primary-active` | `#1C47A4` | Active press state for primary buttons |
| `color.accent.subtle` | `#EBF2FF` | Selected tab background, subtle active highlights |

### Status & Feedback Colors
| Token | Value | Usage / Notes |
|---|---|---|
| `color.status.success` | `#1E8E5A` | Successful compilation toast, accepted diff badge |
| `color.status.success-bg` | `#E6F4ED` | Light green background for success alerts |
| `color.status.error` | `#D2492A` | Compile error card, invalid input error |
| `color.status.error-bg` | `#FCEBE8` | Light red background for compile error card |
| `color.status.warning` | `#C48A0A` | Page count overflow alert banner |
| `color.status.warning-bg` | `#FEF7E6` | Light yellow background for warning alerts |

### Diff View Specific Tokens
| Token | Value | Usage / Notes |
|---|---|---|
| `color.diff.added-bg-dark` | `#133D27` | Added code line background (Dark code pane) |
| `color.diff.added-text-dark` | `#3FB950` | Added code text color (Dark code pane) |
| `color.diff.removed-bg-dark` | `#4B1818` | Removed code line background (Dark code pane) |
| `color.diff.removed-text-dark` | `#F85149` | Removed code text color (Dark code pane) |
| `color.diff.added-bg-light` | `#E3F6EA` | Added line highlight (Light mode diff) |
| `color.diff.removed-bg-light` | `#FBEAEA` | Removed line highlight (Light mode diff) |

---

## 2. Typography

### Font Families
- **UI / Body Font**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Code / Monospace Font**: `"JetBrains Mono", "Fira Code", "Source Code Pro", monospace`

### Type Scale (Base 16px, Major Third 1.25 Ratio)
| Token | Font Size | Line Height | Font Weight | Usage |
|---|---|---|---|---|
| `type.display` | `32px` (`2rem`) | `40px` | `700` (Bold) | Hero landing title |
| `type.h1` | `24px` (`1.5rem`) | `32px` | `700` (Bold) | Screen header title |
| `type.h2` | `19px` (`1.1875rem`) | `26px` | `600` (Semi-bold) | Section titles, card headers |
| `type.h3` | `16px` (`1rem`) | `22px` | `600` (Semi-bold) | Sub-headers, trait titles |
| `type.body` | `16px` (`1rem`) | `24px` | `400` (Regular) | Primary paragraph text |
| `type.small` | `14px` (`0.875rem`) | `20px` | `400` (Regular) | Captions, metadata, helper labels |
| `type.tiny` | `12px` (`0.75rem`) | `16px` | `500` (Medium) | Badges, status tags |
| `type.code` | `14px` (`0.875rem`) | `22px` | `400` (Monospace) | LaTeX editor, diff viewer |

---

## 3. Spacing System (4px Base Unit)

| Token | Pixel Value | Rem Value | Common Usage |
|---|---|---|---|
| `space.3xs` | `2px` | `0.125rem` | Micro-gaps, border offsets |
| `space.2xs` | `4px` | `0.25rem` | Badge padding, icon gap |
| `space.xs` | `8px` | `0.5rem` | Button horizontal padding (compact), input gap |
| `space.sm` | `12px` | `0.75rem` | Card internal padding (compact), list gap |
| `space.md` | `16px` | `1rem` | Standard element gap, container padding |
| `space.lg` | `24px` | `1.5rem` | Card padding, section spacing |
| `space.xl` | `32px` | `2rem` | Screen padding, major block spacing |
| `space.2xl` | `48px` | `3rem` | Hero section vertical padding |
| `space.3xl` | `64px` | `4rem` | Page layout margin |

---

## 4. Radius, Border & Elevation

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `radius.xs` | `2px` | Badges, micro tags |
| `radius.sm` | `4px` | Buttons, text inputs, dropdowns |
| `radius.md` | `8px` | Cards, diff hunk blocks, code containers |
| `radius.lg` | `12px` | Modals, major panels, dropzones |
| `radius.full` | `9999px` | Circular buttons, pill badges |

### Elevation & Shadows
| Token | Value | Usage |
|---|---|---|
| `shadow.sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Buttons, subtle input field shadow |
| `shadow.card` | `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)` | Standard surface card shadow |
| `shadow.popover` | `0 4px 12px rgba(0, 0, 0, 0.12)` | Dropdowns, tooltips, popovers |
| `shadow.modal` | `0 8px 24px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)` | Centered dialog overlays |
