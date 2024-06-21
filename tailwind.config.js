/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        "13px": "13px"
      },
      colors: {
        "color-primary": "#1db954",
        "color-primary-v2": "#00C1A2",
        "color-border-primary": "#1db954",

        "color-text-primary": "#262626",
        "color-outline": "#fff",
        "color-text-dark-01": "rgba(0,0,0,.45)",
        "color-text-dark-02": "#8c8c8c",

        "primary": "rgb(26,92,255)",
        "theme-color": "#2c3e50",
        "theme-color-hover": "#eaf7ff",
        "theme-layout": "#fff",
        "theme-code": "#3f3d56",
        "theme-code2": "#363449",
        "theme-border": "#e0e2e3",
        "theme-border2": "rgb(162 189 255)",
        "theme-border3": "#b6c1cd",
        "theme-border4": "#e5e5e5",
        "theme-sidebar": "#131720",

        "theme-bg": "#f4f7f8",
        "theme-bg2": "#eef2f5",
        "theme-bg3": "#42454c",
        "theme-bg4": "#2b2e3a",
        "theme-bg5": "#f0f4f7",
        "theme-bg6": "#dce9ff",
        "theme-bg-gray": "#b6c1cd",

        "theme-warn": "rgb(255,186,0)",
        "theme-danger": "rgb(255,71,87)",
        "theme-success": "rgb(70,201,58)",

        "theme-box-shadow": "rgba(26,92,255, .6)",
        "theme-table-selected": " #e8eeff",

        "theme-bg-picker": "rgb(238, 242, 245, .6)",
        "theme-bg-scan": "rgba(26,92,255, .1)",

        "theme-bg-rect": "rgba(160, 162, 164, 1)",
        "theme-bg-play": "rgba(0, 0, 0, .59)",

        "theme-bg-skeleton1": "#c9d4da80",
        "theme-bg-skeleton2": "#f0f3f5",

        "theme-dropdown-box-shadow": "0 0 12px 0 rgb(17 18 25 / 14%)",
        "theme-color-shortcut": "#868aa5",
        "theme-color-rect": "rgb(160, 162, 164, 1)",

        "theme-button-dark": "rgb(24, 24, 24)",
        "theme-button-dark-hover": "#2b2929",
        "theme-button-shadow": "rgb(207 207 207 / 60%) -0.78px 1.84px 11px 2px",
        "theme-button-primary": "rgb(56, 74, 221)",

        "theme-text-color-1": "#aeb2ba"
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%'
      },
      backgroundColor: {
        "bg-primary": "#00C1A2"
      }
    },
  },
  plugins: [],
}
