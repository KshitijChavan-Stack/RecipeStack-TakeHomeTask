import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-8 py-8">
      <h1 className="text-4xl md:text-5xl text-gray-900 font-bold mb-4">
        🍳 Taylor's Recipe Finder
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover delicious recipes based on ingredients you have at home
      </p>
    </header>
  );
};

export default Header;
