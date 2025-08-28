import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-6 px-4 md:px-8 text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-2">
        🍳 <span className="text-yellow-600">Taylor's Recipe Finder</span>
      </h1>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover delicious recipes based on ingredients you have at home
      </p>
    </header>
  );
};

export default Header;