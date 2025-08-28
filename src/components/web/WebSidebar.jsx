import React, { useState } from 'react';

const NavItem = ({ active, icon, label, onSelect }) => (
  <button
    onClick={() => onSelect(label)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors duration-200 ${
      active
        ? 'bg-yellow-100 border-yellow-300 text-gray-900 shadow-sm'
        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Check = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between text-[13px] text-gray-700 py-1.5 hover:bg-gray-50 rounded-md transition-colors duration-200">
    <span>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(label, e.target.checked)}
      className="accent-orange-500 w-4 h-4 cursor-pointer focus:ring-2 focus:ring-orange-400"
    />
  </label>
);

const Section = ({ title, open, onToggle, children }) => (
  <div className="mt-5 first:mt-0">
    <div className="flex items-center justify-between text-sm font-medium text-orange-600 mb-2 cursor-pointer" onClick={onToggle}>
      <span>{title}</span>
      <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
    </div>
    <div className={`space-y-1.5 overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
      {children}
    </div>
  </div>
);

const WebSidebar = ({ onNavSelect, onFilterChange, initialFilters = {} }) => {
  const [activeNav, setActiveNav] = useState('Recipes');
  const [filters, setFilters] = useState(initialFilters);
  const [sectionOpen, setSectionOpen] = useState({
    Cuisine: true,
    Meals: true,
    Dinners: false,
    Occasions: false,
    Ingredients: false,
  });

  const handleNavSelect = (label) => {
    setActiveNav(label);
    if (onNavSelect) onNavSelect(label);
  };

  const handleFilterChange = (label, checked) => {
    setFilters((prev) => ({
      ...prev,
      [label]: checked,
    }));
    if (onFilterChange) onFilterChange({ ...filters, [label]: checked });
  };

  const handleSectionToggle = (title) => {
    setSectionOpen((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 p-5 gap-6 fixed h-screen overflow-y-auto shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-gray-900">
        <span>🍽️</span>
        <span className="text-yellow-600">Chefle</span>
      </div>

      {/* Nav Items */}
      <div className="mt-6 grid gap-2">
        <NavItem active={activeNav === 'Recipes'} icon="🧾" label="Recipes" onSelect={handleNavSelect} />
        <NavItem active={activeNav === 'Favorites'} icon="❤️" label="Favorites" onSelect={handleNavSelect} />
      </div>

      {/* Filters */}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <div className="text-lg font-semibold text-gray-900 mb-4">Filters</div>

        <Section title="Cuisine" open={sectionOpen.Cuisine} onToggle={() => handleSectionToggle('Cuisine')}>
          <Check label="Asian" checked={filters.Asian || false} onChange={handleFilterChange} />
          <Check label="Mexican" checked={filters.Mexican || false} onChange={handleFilterChange} />
          <Check label="Japan" checked={filters.Japan || false} onChange={handleFilterChange} />
          <Check label="Italian" checked={filters.Italian || false} onChange={handleFilterChange} />
          <Check label="Thai" checked={filters.Thai || false} onChange={handleFilterChange} />
        </Section>

        <Section title="Meals" open={sectionOpen.Meals} onToggle={() => handleSectionToggle('Meals')}>
          <Check label="Healthy" checked={filters.Healthy || false} onChange={handleFilterChange} />
          <Check label="Lunch" checked={filters.Lunch || false} onChange={handleFilterChange} />
          <Check label="Snacks" checked={filters.Snacks || false} onChange={handleFilterChange} />
          <Check label="Salads" checked={filters.Salads || false} onChange={handleFilterChange} />
          <Check label="Desserts" checked={filters.Desserts || false} onChange={handleFilterChange} />
        </Section>

        <Section title="Dinners" open={sectionOpen.Dinners} onToggle={() => handleSectionToggle('Dinners')}>
          <div className="text-gray-500 text-xs italic">Coming soon</div>
        </Section>
        <Section title="Occasions" open={sectionOpen.Occasions} onToggle={() => handleSectionToggle('Occasions')}>
          <div className="text-gray-500 text-xs italic">Coming soon</div>
        </Section>
        <Section title="Ingredients" open={sectionOpen.Ingredients} onToggle={() => handleSectionToggle('Ingredients')}>
          <div className="text-gray-500 text-xs italic">Coming soon</div>
        </Section>
      </div>
    </aside>
  );
};

export default WebSidebar;