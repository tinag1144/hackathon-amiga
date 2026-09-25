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
          sidebar: "#0d3836",         // Lateral verde esmeralda oscuro (AeuxGlobal style)
          sidebarActive: "#184e4c",   // Item activo de navegación
          canvas: "#f2f5f4",          // Fondo principal claro y limpio
          darkCard: "#0a2e2e",        // Tarjeta oscura de contraste
          emerald: "#10b981",         // Verde vibrante de indicadores y medidores
          teal: "#118ab2",            // Acción e interacción
          dark: "#073b4c",            // Texto principal
          yellow: "#ffd166",          // Destacados cálidos
          pink: "#ef476f",            // Alertas críticas
          muted: "#64748b"
        }
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px'
      },
      boxShadow: {
        'dashboard': '0 12px 36px -8px rgba(13, 56, 54, 0.08), 0 4px 12px -2px rgba(13, 56, 54, 0.03)',
        'card-hover': '0 18px 48px -10px rgba(13, 56, 54, 0.12)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
