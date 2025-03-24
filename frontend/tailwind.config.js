// File: tailwind.config.js

// This file configures Tailwind CSS for the application

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode by adding the 'class' strategy (using .dark class)
  // This allows toggling dark mode without a browser/OS preference
  darkMode: ["class"],
  
  // Specify files to scan for class names during build process
  // This ensures only used utility classes are included in the final CSS
  content: [
    './pages/**/*.{js,jsx}',     // Next.js pages directory
    './components/**/*.{js,jsx}', // Component directory
    './app/**/*.{js,jsx}',       // Next.js app directory
    './src/**/*.{js,jsx}',       // Standard React src directory
  ],
  
  // Optional prefix for all utility classes (empty means no prefix)
  prefix: "",
  
  // Theme customization
  theme: {
    // Container utility configuration
    container: {
      center: true,               // Center containers by default
      padding: "2rem",            // Default padding
      screens: {
        "2xl": "1400px",          // Max width for 2xl screens
      },
    },
    
    // Extensions to the default theme
    extend: {
      // Custom color palette that uses CSS variables
      // These map to the CSS variables defined in global.css
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // Custom border radius that uses CSS variables
      borderRadius: {
        lg: "var(--radius)",                    // Large border radius
        md: "calc(var(--radius) - 2px)",        // Medium border radius
        sm: "calc(var(--radius) - 4px)",        // Small border radius
      },
      
      // Animation keyframes
      keyframes: {
        // Animation for accordion opening
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        // Animation for accordion closing
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      // Named animations using the keyframes
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  // Additional Tailwind plugins
  plugins: [
    // Adds animation utilities like animate-in, animate-out
    require("tailwindcss-animate"),
  ],
}
