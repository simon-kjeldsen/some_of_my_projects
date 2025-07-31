# Neural Network Visualizer

En futuristic neural network visualizer med interaktive animationer og real-time data streams.

## Features

- 🧠 **Interaktiv Neural Network Visualisering** - Se dit netværk i realtid
- 🎮 **Kontrol Panel** - Juster layers, learning rate og epochs
- 📊 **Real-time Data Stream** - Live metrics og training progress
- 🌟 **Futuristic UI/UX** - Neon farver, animationer og effekter
- 📱 **Responsive Design** - Fungerer på alle enheder

## Teknologier

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animationer
- **Three.js** - 3D effekter

## Installation

```bash
# Installer dependencies
npm install

# Start development server
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i din browser.

## Brug

### Landing Page (`/`)
- **Futuristic forside** med dine billeder som baggrunde
- **Scroll-effekter** der skifter baggrund når du scroller
- **Matrix rain animation** og floating elements
- **CTA knap** der fører til portfolio

### Portfolio (`/portfolio`)
- **Alle projekter** med interaktive cards
- **Hover effekter** og smooth animationer
- **Kategoriserede projekter** med unikke farver

### Neural Network Visualizer (`/neural-network`)
1. **Konfigurer Netværket** - Brug sliders til at ændre antal nodes i hver layer
2. **Start Training** - Klik "START TRAINING" for at se netværket i aktion
3. **Overvåg Data** - Se real-time metrics og data stream
4. **Interager** - Klik på nodes for at se detaljer

## Projekt Struktur

```
├── app/
│   ├── components/
│   │   ├── NeuralNetwork.tsx    # Hoved visualisering
│   │   ├── ControlPanel.tsx     # Interaktive kontroller
│   │   ├── DataStream.tsx       # Real-time data
│   │   └── MatrixBackground.tsx # Matrix baggrund
│   ├── globals.css              # Globale styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Hovedside
├── tailwind.config.js           # Tailwind konfiguration
└── package.json                 # Dependencies
```

## Customization

Du kan nemt tilpasse:
- **Farver** - Ændr neon farver i `tailwind.config.js`
- **Animationer** - Modificer keyframes i CSS
- **Netværk Struktur** - Tilføj flere layers eller nodes
- **Data Sources** - Integrer med rigtige ML modeller

## Portfolio Værdi

Dette projekt demonstrerer:
- ✅ Moderne React/Next.js development
- ✅ TypeScript implementation
- ✅ Avancerede CSS animationer
- ✅ Responsive design
- ✅ Interaktive komponenter
- ✅ Real-time data visualisering
- ✅ Futuristic UI/UX design

Perfekt til at vise dine frontend færdigheder til virksomheder! 