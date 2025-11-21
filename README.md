# B2B Space

A modern React application built with Vite, TypeScript, Tailwind CSS, and shadcn/ui, featuring a custom design system with warm, professional aesthetics.

## Features

- ⚡️ **Vite** - Lightning fast dev server and build tool
- ⚛️ **React 18** - Latest React with TypeScript support
- 🎨 **Custom Design System** - Warm color palette with professional look
- 🌓 **Dark Mode** - Seamless theme switching
- 💅 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible UI components
- 📱 **Responsive** - Mobile-first design approach

## Design System

The application uses a custom design system with:

- **Primary Color**: Warm terracotta (`#c96442`)
- **Background**: Soft cream (`#faf9f5`)
- **Foreground**: Rich brown (`#3d3929`)
- **Custom shadows and radius**
- **Dark mode support** with adjusted color palette

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
b2b-space/
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with design system
├── public/              # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Customization

### Adding New Components

The project is set up to use shadcn/ui components. To add new components:

1. Check the [shadcn/ui documentation](https://ui.shadcn.com/)
2. Add components manually following the patterns in `src/components/ui/`

### Modifying Colors

Edit the CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 15 56% 52%;
  --background: 38 19% 96%;
  /* ... other variables */
}
```

## Technologies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## License

MIT

