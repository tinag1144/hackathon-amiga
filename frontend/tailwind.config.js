/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amiga: {
          dark: "#073b4c",     // Estructural, títulos, texto principal
          blue: "#118ab2",     // Acción principal, botones, focos interactivos
          green: "#06d6a0",    // Estados positivos, métricas favorables
          yellow: "#ffd166",   // Atención moderada, chips, destacados cálidos
          pink: "#ef476f",     // Alertas críticas, highlights
          cream: "#FAF9F5",    // Fondo base marfil cálido
          card: "#FFFFFF",     // Tarjetas flotantes
          muted: "#64748b"     // Texto secundario
        }
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px'
      },
      boxShadow: {
        'editorial': '0 12px 36px -8px rgba(7, 59, 76, 0.06), 0 4px 12px -2px rgba(7, 59, 76, 0.03)',
        'editorial-hover': '0 18px 48px -10px rgba(7, 59, 76, 0.1), 0 6px 16px -2px rgba(7, 59, 76, 0.04)',
        'chip': '0 2px 8px rgba(7, 59, 76, 0.04)'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
