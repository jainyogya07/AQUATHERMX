/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#00E0FF", // Cyan brand
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "#00FF94", // Green accent
                    foreground: "#000000",
                },
                // Semantic Research Colors
                brand: {
                    dark: "#0B1220", // Main bg
                    panel: "#121A2F", // Panel bg
                },
                status: {
                    safe: "#22C55E",
                    warning: "#F59E0B",
                    critical: "#EF4444",
                    neutral: "#CBD5E1"
                }
            }
        },
    },
    plugins: [],
}
