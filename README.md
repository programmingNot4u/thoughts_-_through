# Thoughts & Thorough - Survey, Research & Consultancy

A modern, professional website for Thoughts & Thorough, built with React, TypeScript, and Tailwind CSS. The design is inspired by Gallup's minimal, authoritative style with a green theme representing environment, trust, and growth.

## Features

- ✅ **Multi-page professional structure** with React Router
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Sticky navigation with active page highlighting
- ✅ **Home Page**: Hero section with call-to-action buttons, focus areas, and ongoing projects
- ✅ **About Page**: Vision, Mission, Goals & Objectives, Chairman introduction, and Board of Directors
- ✅ **Research Areas Page**: Detailed research focus areas and relevant links
- ✅ **Publications Page**: Research publications, reports, and legal documents with filtering
- ✅ **Resource Panel Page**: Expert team profiles with expertise filtering
- ✅ **Projects Page**: Showcase of ongoing research projects
- ✅ **Media Page**: Media coverage and published events gallery
- ✅ **Contact Page**: Contact information and inquiry form
- ✅ Comprehensive footer with social links
- ✅ Smooth animations (AOS - Animate On Scroll)
- ✅ Scroll-to-top button

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **AOS** (Animate On Scroll) for animations
- **React Router DOM** for navigation (ready for future routing)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Color Palette

- **Forest Green**: `#1C7C54` (Primary brand color)
- **Deep Green**: `#11543A` (Header/navigation)
- **Light Green Tint**: `#E6F4EC` (Section backgrounds)
- **Dark Gray**: `#323232` (Body text)
- **Medium Gray**: `#767676` (Subheading text)
- **Accent Yellow**: `#C9A227` (Optional highlights)

## Typography

- **Headings**: Inter / Montserrat (bold, modern)
- **Body**: Lato / Open Sans (readable, research-oriented)

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx              # Home page with Hero, Focus Areas, Projects
│   ├── About.tsx             # About page with Vision/Mission, Chairman, Board
│   ├── ResearchAreas.tsx     # Research areas and relevant links
│   ├── Publications.tsx      # Publications and legal documents
│   ├── ResourcePanel.tsx     # Expert team profiles
│   ├── Projects.tsx          # Ongoing projects showcase
│   ├── Media.tsx             # Media coverage and events
│   └── Contact.tsx           # Contact information and form
├── components/
│   ├── Navigation.tsx        # Main navigation with routing
│   ├── Hero.tsx
│   ├── FocusWindows.tsx
│   ├── VisionMission.tsx
│   ├── ChairmanIntro.tsx
│   ├── ResourcePanel.tsx
│   ├── BoardDirectors.tsx
│   ├── Publications.tsx
│   ├── MediaCoverage.tsx
│   ├── LegalDocuments.tsx
│   ├── RelevantLinks.tsx
│   ├── OngoingProjects.tsx
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── App.tsx                   # Main app with routing configuration
├── main.tsx
└── style.css
```

## Routes

- `/` - Home page
- `/about` - About page
- `/research-areas` - Research Areas page
- `/publications` - Publications page
- `/resource-panel` - Resource Panel page
- `/projects` - Projects page
- `/media` - Media page
- `/contact` - Contact page

## Customization

### Adding New Content

1. **Publications**: Edit `src/components/Publications.tsx` - add items to the `publications` array
2. **Experts**: Edit `src/components/ResourcePanel.tsx` - add items to the `experts` array
3. **Projects**: Edit `src/components/OngoingProjects.tsx` - add items to the `projects` array
4. **Directors**: Edit `src/components/BoardDirectors.tsx` - add items to the `directors` array

### Styling

All styles use Tailwind CSS. Custom colors and fonts are defined in:

- `tailwind.config.js` - Color palette and font families
- `src/style.css` - Custom utility classes and base styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Thoughts & Thorough. All rights reserved.
