# Portfolio Website

A modern, interactive portfolio website showcasing systems engineering work with a focus on AI infrastructure, evaluation systems, and reproducible pipelines.

## Features

- **Dual Mode Toggle**: Switch between "Signal" (professional) and "Story" (human) perspectives
- **Interactive Project Cards**: Detailed case studies with architecture diagrams, decisions, and evidence
- **Search & Filter**: Find projects by keywords or tags
- **Thinking Loop**: Visual representation of the problem-solving methodology
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   └── Portfolio.jsx    # Main portfolio component
│   ├── App.jsx              # App entry point
│   ├── main.jsx             # React DOM render
│   └── index.css            # Global styles with Tailwind
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## Customization

### Update Projects

Edit the `projects` array in `src/components/Portfolio.jsx` to add or modify projects.

### Update Skills

Modify the `skills` array in `src/components/Portfolio.jsx` to reflect your tech stack.

### Update Contact Info

Change email addresses and social links in the navbar and footer sections.

## License

MIT
