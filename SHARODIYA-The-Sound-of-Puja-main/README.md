# 🪔 SHARODOTSAV — The Sound of Puja (শারদোৎসব)

> \*\*"The scent of shiuli flowers, the hypnotic cadence of the dhak, and the timeless melodies of Bengal's greatest homecoming."\*\*

An ambient, editorial sonic web experience capturing the spirit of **Durga Puja** and **Mahalaya** — designed with minimal restraint, regal typography, and high-performance audio engineering.

[!\[Live Website](https://img.shields.io/badge/Live-Website-D4AF37?style=for-the-badge\&logo=vercel)](https://sharodiya-sound-of-puja.vercel.app)
[!\[React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)](https://reactjs.org/)
[!\[TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[!\[Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge\&logo=vite)](https://vitejs.dev/)
[!\[TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge\&logo=tailwind-css)](https://tailwindcss.com/)



\---

## ✨ Features

* **🎧 24-Track Curated Soundtrack**: Authentic celebratory anthems, classic Agomoni songs, and pandal melodies categorized across the festive calendar:

  * **Mahalaya**: *Mahishasuramardini (Original Chandi Path)* — Birendra Krishna Bhadra
  * **Maha Shashti**: *Elo Je Maa*, *Ebar Jeno Onno Rokom Pujo*, *Ashey Maa Durga Shey*, *Dhak Baja Kashor Baja*, *Dugga Ma*, *Bolo Dugga Maiki*
  * **Maha Saptami**: *Dhaker Taley*, *Dhaak Baaje Kaashor Baaje*, *Dugga Elo*, *Pujor Gaan*, *Joy Maa Durga*, *Bolo Bolo Dugga Elo*
  * **Maha Ashtami**: *Aar Koto Raat Eka Thakbo*, *Elo Re Elo Durga Maa*, *Bolo Dugga Maiki (Club Mix)*, *Dhaaker Taale Maa Ashen*, *Maa Go Tumi Sarbajanin*, *Sandhi Puja Dhak Beats*
  * **Maha Nabami**: *Pujo Pujo Gondho Elo*, *Maa er Agomoni*, *Dhak Dhak Beats*, *Dhunuchi Naach Special*
  * **Bijoya Dashami**: *Bishorjon Theme \& Sindur Khela Special*
* **📻 Dedicated Mahalaya Experience**: Atmospheric sunrise broadcast page playing the sacred dawn Chandi Path on an infinite loop.
* **🟢 Real-Time Live Presence Counter**: Upper header real-time visitor presence tracking utilizing `BroadcastChannel` and multi-tab heartbeat coordination.
* **✨ Translucent Glassmorphic Audio Player**: Sleek pill-shaped player with live audio scrubber, volume slider (default 40%), touch swipe gestures, and next/prev/play/pause controls.
* **🏛️ Editorial Curation \& Rotations Section**: Matching high-end editorial music curation with quick day rotations, Spotify \& YouTube Music platform links, and contact inquiries.
* **⚡ 60–120 FPS Silk-Smooth Performance**: Full component memoization (`React.memo`, `useCallback`), throttled audio timeline updates, and GPU-accelerated background image crossfaders (`transform-gpu`, `will-change: opacity`).
* **📱 Ultra Responsive**: Tested and tailored across all viewport sizes from narrow mobile screens (320px) to ultra-wide displays.
* **🎵 Synthesized Audio Fallback**: Web Audio API ambient tone synthesizer ensuring continuous music playback even under restricted network or autoplay settings.

\---

## 🛠️ Tech Stack

* **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Bundler**: [Vite 6](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism System
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio Engine**: HTML5 Audio API + Web Audio API Ambient Synthesizer

\---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18.0 or higher)
* npm or yarn

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Jishnu09-siuu/SHARODIYA-The-Sound-of-Puja.git
   cd SHARODIYA-The-Sound-of-Puja
   ```

2. Install dependencies:

```bash
   npm install
   ```

3. Start development server:

```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:

```bash
   npm run build
   ```

\---

## 📁 Project Structure

```text
├── public/
│   └── assets/
│       ├── images/       # Static high-resolution festive backgrounds
│       └── music/        # Audio tracks \& soundscapes
├── src/
│   ├── components/
│   │   ├── AboutModal.tsx        # Editorial info modal
│   │   ├── BackgroundManager.tsx # High-FPS 2-layer GPU background crossfader
│   │   ├── CurationSection.tsx   # Curation, day rotations \& credits section
│   │   ├── Hero.tsx              # Entrance landing hero
│   │   ├── MahalayaView.tsx      # Sacred Mahalaya Chandi Path view
│   │   ├── MusicPlayer.tsx       # Translucent bottom glass audio player
│   │   ├── Navigation.tsx        # Real-time clock, live online counter \& streaming pills
│   │   ├── PlaylistDrawer.tsx    # Slide-in grouped 24-track playlist
│   │   └── PujaSection.tsx       # Standalone 5-day tithi showcase
│   ├── data/
│   │   └── playlist.ts           # Song metadata, tracklists, and tithi mappings
│   ├── hooks/
│   │   └── useSwipe.ts           # Touch swipe gesture detection
│   ├── types/
│   │   └── playlist.ts           # TypeScript type definitions
│   ├── utils/
│   │   └── audioFallback.ts      # Web Audio API ambient sound generator
│   ├── App.tsx                   # Main application orchestration
│   ├── index.css                 # Custom glassmorphism, scrollbars \& animations
│   └── main.tsx                  # React DOM entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

\---

## 📜 Disclaimer \& Credits

* Audio playback is for atmospheric and cultural appreciation. All rights remain with the respective record labels, artists, composers, and performers.
* If you hold rights to any content on this site and would like it removed, please contact:
📧 **sumit.biswas.pmi.9c@gmail.com**

\---

## 🖋️ Author

Crafted with devotion and nostalgia for Bengal's greatest festival.

**© 2026 SARODOSTAV — The Sound of Puja**

