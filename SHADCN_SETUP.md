# Shadcn/UI Components Setup Guide

## Overview
This guide explains how to set up and use the shadcn/ui components that have been added to your Taylor Recipe App.

## Components Installed
- **Button** - Various button variants and sizes
- **Input** - Styled input fields
- **Card** - Card components with header, content, and footer
- **Badge** - Badge components for labels and tags

## Installation Steps

### 1. Install Dependencies
Since there were PowerShell execution policy issues, you'll need to manually install the dependencies. Run this command in your terminal:

```bash
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

### 2. Verify Installation
Check that the dependencies were added to your `package.json`:

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

## Component Usage

### Button Component
```jsx
import { Button } from './components/ui/button'

// Different variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

### Input Component
```jsx
import { Input } from './components/ui/input'

<Input placeholder="Search for recipes..." />
<Input type="email" placeholder="Enter your email" />
```

### Card Components
```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Recipe Title</CardTitle>
    <CardDescription>Recipe description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Recipe content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>View Recipe</Button>
  </CardFooter>
</Card>
```

### Badge Component
```jsx
import { Badge } from './components/ui/badge'

<Badge variant="default">Italian</Badge>
<Badge variant="secondary">Quick</Badge>
<Badge variant="outline">Vegetarian</Badge>
<Badge variant="destructive">Spicy</Badge>
```

## Demo Component
A demo component has been created at `src/components/ShadcnDemo.jsx` that showcases all the components with various variants and use cases.

To view the demo, you can temporarily import it into your App.jsx:

```jsx
import ShadcnDemo from './components/ShadcnDemo'

// Add this to your App component to see the demo
<ShadcnDemo />
```

## Integration with Recipe App

These components can be used to enhance your recipe app:

1. **Replace existing buttons** with the Button component for consistent styling
2. **Use Input components** for search fields and forms
3. **Display recipes in Card components** for better visual hierarchy
4. **Add Badge components** for recipe tags (cuisine, difficulty, time, etc.)

## CSS Variables
The necessary CSS variables are already configured in your `src/index.css` file, so the components should work immediately after installing the dependencies.

## Troubleshooting

### PowerShell Execution Policy Issues
If you encounter PowerShell execution policy issues, you can:

1. **Run PowerShell as Administrator** and execute:
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

2. **Use Command Prompt** instead of PowerShell

3. **Install dependencies manually** by running the npm install command in a different terminal

### Component Import Issues
Make sure your import paths are correct. The components are located in `src/components/ui/` and can be imported using:

```jsx
import { Button } from '@/components/ui/button'
```

Or with relative paths:

```jsx
import { Button } from './components/ui/button'
```

## Next Steps
1. Install the dependencies
2. Test the components by viewing the demo
3. Gradually replace existing UI elements with shadcn components
4. Customize the component variants to match your app's design

## Resources
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

