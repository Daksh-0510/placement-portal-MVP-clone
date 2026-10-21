# Campus Placement Tracker

You are an elite Staff Staff UI/UX Engineer and React Developer. Build a production-ready, multi-page University Placement Tracker and Company Directory. 

TECH STACK: React (Vite), React Router DOM, Tailwind CSS, Framer Motion, Supabase JS Client, and Lucide React. 

Your goal is to build the COMPLETE application in this single generation. Implement all routes, states, and components specified below. Do not use placeholders for core logic.

### 1. APPLICATION ARCHITECTURE & ROUTING
Implement `react-router-dom` with the following explicit routes:
- `/` : Home Page (Discovery, Search, & Grid)
- `/company/:id` : Company Profile Detail Page
- `/privacy` : Privacy Policy (Generate clean, formatted standard boilerplate text)
- `/tos` : Terms of Service (Generate clean, formatted standard boilerplate text)
- `*` : Custom 404 Error Page (Editorial design, clear "Back to Directory" CTA)

### 2. DESIGN SYSTEM & ANTI-PATTERNS (CRITICAL)
You must create a distinctive, premium, editorial UI. It MUST NOT look like a generic AI-generated template.
- **Theme & Toggle:** Implement full Light/Dark mode using Tailwind's `dark:` classes. Place a sun/moon toggle icon in the top navigation bar.
- **Typography:** Use a clean, highly legible humanist system sans-serif (e.g., SF Pro, Inter-alternative, or standard sans). Enforce `leading-relaxed` for body text. NEVER use m-dashes.
- **Colors:** Use a sophisticated, low-contrast monochromatic scale (slate or zinc). 
  - Light mode background: `#FAFAFA` (Never pure `#FFFFFF`). 
  - Dark mode background: `slate-950`. 
  - Accent Color: Muted Indigo (`indigo-600` for light, `indigo-400` for dark). 
  - NEVER use neon colors, rainbow gradients, or purple/black high-contrast themes.
- **Aesthetics (DO NOT USE):** NEVER use bento grids, liquid glass effects, radial orbs, heavy drop shadows, dot grids, sparkle icons, animated arrows, fake testimonials, or 3-column feature layouts.
- **Shapes:** Use crisp borders (`border-slate-200` / `border-slate-800`) and slight rounding (`rounded-md` or `rounded-sm`). NO extreme pill-shapes or soft `rounded-2xl` cards. 

### 3. SUPABASE DATA FETCHING LOGIC
The database is pre-configured. The core table is `companies`. It has 10 child tables linked by `company_id`. 
When fetching a specific company for the `/company/:id` route, you MUST use this exact Supabase query structure to ensure all 163 parameters load at once:
`const { data, error } = await supabase.from('companies').select('*, company_business(*), company_financials(*), company_culture(*), company_compensation(*), company_logistics(*), company_people(*), company_talent_growth(*), company_technologies(*), company_brand_reputation(*), company_skill_levels(*)').eq('company_id', id).single();`

### 4. PAGE 1: HOME & DIRECTORY (`/`)
- **Global Header:** Fixed top navigation containing a clickable Logo (routes to `/`), the Light/Dark mode toggle, and a mobile hamburger menu.
- **Hero Section (The 5-Second Test):** Above the fold, display an asymmetrical, editorial layout. 
  - Headline: Explain exactly what the tool is (University Placement Tracker).
  - Subheadline: Who it is for and why it matters. 
  - Action: A prominent, large Search Bar that filters the grid below in real-time by `name` or `short_name`.
- **Company Grid:** A responsive alphabetical grid of company cards. 
- **Card Design:** Flat design. Off-white/dark-slate background. 1px border. Centered company logo, with the company name neatly typed below it. 
- **Hover States:** On hover, the card lifts smoothly (`-translate-y-1`), border color shifts to the accent color, and the logo saturation increases.
- **Loading:** Use Framer Motion to create Skeleton Loaders (pulsing boxes matching the grid) while Supabase fetches data.

### 5. SHARED ELEMENT TRANSITION
- Use Framer Motion's `layoutId` on the company logo image.
- When a user clicks a company card on the Home route, route them to `/company/:id`. The logo MUST seamlessly enlarge and animate across the screen to its new position in the Company Detail header.

### 6. PAGE 2: COMPANY PROFILE (`/company/:id`)
- **Header:** The enlarged logo (using `layoutId`), company name, CEO name, and 4 high-level "Stat Cards" (e.g., employee_size, annual_revenue, office_count) styled with minimal borders, NO heavy shadows.
- **Layout Architecture:** An asymmetrical 2-column layout. 
- **Left Column (Sticky Scrollspy):** A sticky vertical sidebar menu listing the 10 data categories (Business, Financials, Culture, etc.). As the user scrolls the right column, the active section in the sidebar must highlight. Clicking a sidebar link smoothly scrolls to that section.
- **Right Column (163 Parameters):** Render the fetched Supabase data grouped cleanly under respective category headers. 
  - DO NOT use comma-separated lists. If a parameter implies a list (e.g., `tech_stack`), map it into minimal badge components.
  - Boolean/Policy parameters must use a Lucide React icon (e.g., Check/X) and text.
  - Render null/empty fields as "Data unavailable" in a muted text color.

### 7. QUALITY ASSURANCE & FUNCTIONALITY
- Implement error boundaries and Toast notifications (Success/Error) for database fetching failures.
- Ensure the footer exists on all pages with copyright, and working links to `/privacy` and `/tos`.
- Ensure all interactive elements (buttons, links) have a defined hover state (e.g., `hover:bg-slate-100 dark:hover:bg-slate-800`).
- No horizontal scrolling anywhere. Fully responsive on mobile (stack the 2-column layout on small screens).

Execute this build completely. Do not stop until all components, pages, and Supabase integrations are written.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e7c8dbbc-d5fa-4774-9721-055e20cead87).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
