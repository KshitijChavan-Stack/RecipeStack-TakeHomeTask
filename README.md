# 🍳 Taylor's Recipe Finder

A modern React application that helps you find delicious recipes based on ingredients you have at home.

## ✨ Features

- **Smart Search**: Search for recipes using any ingredient
- **Dynamic Placeholders**: Changing placeholder text with recipe suggestions
- **Quick Search**: One-click search for popular ingredients
- **Popular Suggestions**: Clickable ingredient cards for inspiration
- **Beautiful Loading**: Animated cooking pan with flying vegetables
- **Responsive Design**: Works perfectly on all devices
- **Error Handling**: User-friendly error messages with animations

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # App title and description
│   ├── SearchForm.jsx  # Search input and form
│   ├── QuickSearch.jsx # Quick search buttons
│   ├── PopularSuggestions.jsx # Ingredient suggestion cards
│   ├── LoadingSpinner.jsx # Animated loading component
│   ├── RecipeGrid.jsx  # Recipe results display
│   ├── ErrorMessage.jsx # Error display component
│   ├── NoResults.jsx   # No results message
│   └── index.js        # Component exports
├── services/           # API and external service calls
│   └── recipeService.js # Recipe API integration
├── utils/              # Constants and utility functions
│   └── constants.js    # App constants and data
├── App.jsx             # Main application component
├── App.css             # Application styles
└── main.jsx            # Application entry point
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🧩 Components

### Core Components
- **Header**: App branding and description
- **SearchForm**: Main search functionality
- **QuickSearch**: Popular ingredient shortcuts
- **PopularSuggestions**: Ingredient inspiration cards

### Display Components
- **LoadingSpinner**: Animated cooking pan loader
- **RecipeGrid**: Recipe results in grid layout
- **ErrorMessage**: Enhanced error display
- **NoResults**: Empty state messaging

## 🔧 Services

### Recipe Service
- `searchByIngredient(ingredient)`: Search recipes by ingredient
- `getRecipeById(recipeId)`: Get detailed recipe information
- Error handling and API response processing

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized spacing for all screen sizes

## 🎨 Styling

- Modern CSS with animations
- Smooth transitions and hover effects
- Consistent color scheme and typography
- Loading animations and micro-interactions

## 🔍 Search Features

- **Dynamic Placeholders**: Rotating suggestions every 3 seconds
- **Quick Search**: Instant search for chicken, paneer, rice, tofu
- **Popular Suggestions**: 8 categorized ingredient options
- **Auto-search**: Automatic search on quick search selection

## 🚀 Performance

- Component-based architecture for better performance
- Efficient state management
- Optimized re-renders
- Lazy loading ready structure

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations
- **TheMealDB API** - Recipe data source

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
