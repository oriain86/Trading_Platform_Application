// File: postcss.config.js

// This file configures PostCSS plugins for processing CSS

export default {
  // List of PostCSS plugins to use during build
  plugins: {
    // Process Tailwind CSS directives and generate utility classes
    // This transforms @tailwind directives into actual CSS
    tailwindcss: {},
    
    // Automatically add vendor prefixes to CSS properties
    // Ensures better cross-browser compatibility (e.g., -webkit-, -moz-, -ms-)
    autoprefixer: {},
    
    // Other commonly used PostCSS plugins that could be added:
    // cssnano: {}, // Minifies CSS for production
    // postcss-preset-env: {}, // Converts modern CSS into browser-compatible CSS
    // postcss-import: {}, // Handles @import statements in CSS
  },
}
