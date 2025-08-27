import React from 'react';
import { PLACEHOLDERS } from '../utils/constants';
import SearchBar from './SearchBar';

const SearchForm = ({ 
  ingredient, 
  setIngredient, 
  onSubmit, 
  loading, 
  placeholderIndex 
}) => {
  return (
    <SearchBar
      ingredient={ingredient}
      setIngredient={setIngredient}
      onSubmit={onSubmit}
      loading={loading}
      placeholder={PLACEHOLDERS[placeholderIndex]}
    />
  );
};

export default SearchForm;
