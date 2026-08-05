# The Needle Weekly — Design System

A personal music radar built around editorial clarity and restraint. The visual language draws from print music journalism — heavy typography, high contrast, no decoration.

---

## Design Principles

**Editorial over decorative.** Every visual decision serves the content. No gradients, no shadows, no color fills that don't carry meaning.

**Typography does the work.** Hierarchy is established through size, weight, and family — not color or ornament.

**Black and white only.** The palette is intentionally stripped down. The album covers provide all the color the page needs.

**Consistent rhythm.** Spacing follows a simple scale. Borders are used sparingly but decisively — when they appear, they carry weight.

---

## Typography

Two typefaces only.

| Role | Family | Usage |
|------|--------|-------|
| Editorial | Georgia, serif | Titles, descriptions, body text, album metadata |
| UI | Arial, sans-serif | Labels, navigation, metadata tags, form elements |

### Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `title-hero` | 72px | 900 | Site title (homepage) |
| `title-page` | 36px | 900 | Page titles (Archive, My Needle) |
| `title-album` | 22px | 700 | Album titles |
| `body` | 15px | 400 | Site description |
| `body-sm` | 14px | 400 | Album descriptions |
| `label` | 10px | 400 | Sources, metadata tags, week labels |
| `nav` | 10px | 400 | Navigation links, topbar |
| `caption` | 11px | 400 | Footer, form labels, listen links |

### Letter spacing

| Context | Value |
|---------|-------|
| Hero title | `-3px` |
| Album title | `-0.3px` |
| Uppercase labels | `0.10–0.15em` |
| Body text | `normal` |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0a0a0a` | Primary text, borders, button backgrounds |
| `body` | `#333333` | Album descriptions |
| `muted` | `#444444` | Site description |
| `subtle` | `#888888` | Sources, labels, nav links, footer text |
| `divider` | `#e0e0e0` | Album separators, sidebar borders |
| `placeholder` | `#f0f0f0` | Album cover placeholder |
| `surface` | `#fafafa` | Sidebar background |
| `white` | `#ffffff` | Page background |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 8px | Internal component gaps |
| `sm` | 12px | Icon gaps, small padding |
| `md` | 16px | Form elements, footer padding |
| `lg` | 24px | Album padding, section gaps |
| `xl` | 32px | Sidebar padding, hero padding |
| `2xl` | 40px | Main content padding |

---

## Borders

Two border weights only.

| Token | Value | Usage |
|-------|-------|-------|
| `border-heavy` | `4px solid #0a0a0a` | Topbar bottom, hero bottom, footer top |
| `border-medium` | `2px solid #0a0a0a` | Sidebar section separators, archive label |
| `border-light` | `1px solid #e0e0e0` | Album separators, archive items |
| `border-form` | `1px solid #0a0a0a` | Input field |

No `border-radius` anywhere. All corners are square.

---

## Components

### Topbar

Full-width bar at the top of every page.

```
[THE NEEDLE WEEKLY]                    [ARCHIVE]  [MY NEEDLE]
─────────────────────────────────────────────────────────────── (4px)
```

- Border: `4px solid #0a0a0a` bottom
- Brand link: Arial 10px uppercase, letter-spacing 0.15em, `#0a0a0a`
- Nav links: Arial 10px uppercase, letter-spacing 0.12em, `#888`
- Padding: 12px vertical

---

### Hero Header

Homepage only. Establishes the brand and editorial context.

```
The Needle
Weekly

[description text — Georgia 15px #444]

Get it in your inbox.  [email input]  [Subscribe]
──────────────────────────────────────────────── (4px)
```

- Title: Georgia 72px, weight 900, line-height 0.95, letter-spacing -3px
- Description: Georgia 15px, `#444`, line-height 1.5, max-width 520px
- Subscribe label: Arial 11px `#888`
- Input: border `1px solid #0a0a0a`, no border-radius, padding 6px 10px
- Button: background `#0a0a0a`, color `#ffffff`, Arial 11px, no border-radius

---

### Page Header

Non-homepage pages (Archive, My Needle).

```
THE NEEDLE WEEKLY  ← small link to /

Page Title
```

- Breadcrumb: Arial 10px uppercase `#888`, link to `/`
- Title: Georgia 36px, weight 900

---

### Album Card

The core content unit. Used on homepage, archive detail, and My Needle results.

```
┌──────────┐  Artist — "Title" (Year)
│          │  SOURCE A · SOURCE B
│  100×100 │
│          │  Description text in Georgia serif.
│          │
└──────────┘  very aligned with your taste

            Listen on Spotify
────────────────────────────────────────────── (1px #e0e0e0)
```

- Cover: 100×100px square, no border-radius. Placeholder: `#f0f0f0`
- Artist/Title: Georgia 22px, weight 700, letter-spacing -0.3px
- Year: Georgia 22px, weight 400, `#888`
- Sources: Arial 10px, uppercase, letter-spacing 0.10em, `#888`
- Description: Georgia 14px, `#333`, line-height 1.65
- Taste tag: Georgia 12px, italic, `#888`. Only shown when `aligned: true`
- Listen link: Arial 11px, `#0a0a0a`, border-bottom `1px solid #0a0a0a`
- Separator: `1px solid #e0e0e0` bottom, padding 24px vertical

---

### Sidebar

220px fixed column, right side. Background `#fafafa`.

**Archive section**
```
ARCHIVE  ← 9px uppercase, border-bottom 2px #0a0a0a
──────────────────── (2px)
14 Apr 2026  ← bold if active
07 Apr 2026
31 Mar 2026
────────────────────── (1px #e8e8e8 between items)
```

**My Needle section**
```
──────────────────── (2px #0a0a0a top border, mt-32px)
MY NEEDLE
Short description in Georgia 12px #888.
Try it →
```

---

### Subscribe Form

Inline form in the hero. Single row.

```
Get it in your inbox.  [your@email.com          ]  [Subscribe]
```

- Label: Arial 11px `#888`
- Input: width 180px, border `1px solid #0a0a0a`, no border-radius, Arial 11px
- Button: background `#0a0a0a`, color `#fff`, Arial 11px, no border-radius, padding 7px 14px
- Success state: replace form with "You're in." in italic gray

---

### Footer

Full-width, right-aligned, closes every page.

```
──────────────────────────────────────────────────────── (4px)
                          Georgina Armisen  [in]  [⊕]  [◎]
```

- Border: `4px solid #0a0a0a` top
- Name: Arial 11px `#888`, not a link
- Icons: 16×16px SVG, `fill: currentColor`, `#888`, hover `#0a0a0a`
- Icons link to: LinkedIn, Spotify, GitHub

---

## Layout

### Homepage

```
[TOPBAR]
[HERO — full width]
─────────────────────────────────────────────────────
[MAIN CONTENT — flex 1]          │  [SIDEBAR — 200px]
  week label                     │    ARCHIVE
  album card                     │    ──────────────
  album card                     │    dates list
  album card                     │
  N albums recommended           │    MY NEEDLE
  [FOOTER]                       │    ──────────────
                                 │    description
                                 │    Try it →
```

- Main/sidebar separator: `1px solid #e0e0e0`
- Main padding-right: 40px
- Sidebar padding-left: 32px

### Other pages

Single column, max-width 680px centered, padding 24px sides. No sidebar.

---

## Design Tokens Reference

```css
/* Typography */
--font-editorial: Georgia, 'Times New Roman', serif;
--font-ui: Arial, Helvetica, sans-serif;

/* Colors */
--color-ink: #0a0a0a;
--color-body: #333333;
--color-muted: #444444;
--color-subtle: #888888;
--color-divider: #e0e0e0;
--color-placeholder: #f0f0f0;
--color-surface: #fafafa;
--color-white: #ffffff;

/* Borders */
--border-heavy: 4px solid #0a0a0a;
--border-medium: 2px solid #0a0a0a;
--border-light: 1px solid #e0e0e0;
--border-form: 1px solid #0a0a0a;

/* Spacing */
--space-xs: 8px;
--space-sm: 12px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 40px;
```

---

*The Needle Weekly — designed and built by [Georgina Armisen](https://www.linkedin.com/in/giarmisen/)*
