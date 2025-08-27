# 🎨 Tailwind CSS Setup Guide

This guide explains how to set up Tailwind CSS in your Taylor Recipe App project.

## 📦 Installation

Since there are PowerShell execution policy restrictions, you'll need to install the dependencies manually:

### Option 1: Manual Installation
1. Open Command Prompt (not PowerShell) as Administrator
2. Navigate to your project directory
3. Run the following commands:

```bash
npm install -D tailwindcss@^3.3.6 postcss@^8.4.32 autoprefixer@^10.4.16
```

### Option 2: PowerShell Execution Policy Fix
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned`
3. Type 'Y' to confirm
4. Then run: `npm install -D tailwindcss postcss autoprefixer`

## ⚙️ Configuration Files

The following configuration files have been created:

### `tailwind.config.js`
- Configured for Vite and React
- Custom color palette matching your app theme
- Custom animations and shadows
- Content paths for proper purging

### `postcss.config.js`
- PostCSS configuration for Tailwind and Autoprefixer
- Optimized for Vite build process

### `src/index.css`
- Tailwind directives (@tailwind base, components, utilities)
- Custom component classes using @apply
- Base styles and custom utilities

## 🚀 Usage

After installation, you can use Tailwind classes in your components:

```jsx
// Example usage in components
<div className="bg-primary-500 text-white p-6 rounded-xl shadow-soft">
  <h1 className="text-3xl font-bold mb-4">Recipe Title</h1>
  <p className="text-gray-600">Recipe description</p>
</div>
```

## 🎯 Custom Components

The CSS includes custom component classes:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling  
- `.card` - Card container styling
- `.input-field` - Form input styling

## 🔧 Build Process

Tailwind CSS will automatically:
- Scan your JSX files for used classes
- Generate only the CSS you need
- Optimize and minify the output
- Work seamlessly with Vite's hot reload

## 📱 Responsive Design

Use Tailwind's responsive prefixes:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🎨 Custom Theme

The configuration includes:
- Custom primary color palette
- Extended gray scale
- Custom animations (fade-in, slide-up, bounce-gentle)
- Custom shadows (soft, medium)
- Extended border radius options

## 🚨 Troubleshooting

If you encounter issues:

1. **Ensure dependencies are installed**: Check `node_modules` for tailwindcss
2. **Verify configuration files**: Ensure `tailwind.config.js` and `postcss.config.js` exist
3. **Check CSS imports**: Ensure `src/index.css` is imported in `main.jsx`
4. **Restart dev server**: Run `npm run dev` after installation

## 📚 Next Steps

After successful installation:
1. Start using Tailwind classes in your components
2. Gradually migrate existing CSS to Tailwind
3. Customize the theme in `tailwind.config.js`
4. Add more custom components in `src/index.css`
