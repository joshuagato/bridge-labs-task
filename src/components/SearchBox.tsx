import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { countries } from '../data/countries';

export function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const filteredSuggestions = debouncedSearchTerm
    ? countries.filter(country => 
        country.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).slice(0, 5)
    : countries.slice(0, 5);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        const input = document.querySelector('.search-box__input') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const searchBox = document.querySelector('.search-box');
      if (searchBox && !searchBox.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusIndex(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= filteredSuggestions.length) {
          return -1;
        }
        return nextIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex(prev => {
        const nextIndex = prev - 1;
        if (nextIndex < -1) {
          return filteredSuggestions.length - 1;
        }
        return nextIndex;
      });
    }
  };

  return (
    <div className="relative search-box">
      <input
        type="text"
        className="search-box__input"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        data-testid="0"
      />
      <button 
        id="close-btn"
        className="search-box__icon"
        onClick={() => {
          setIsOpen(false);
          setFocusIndex(-1);
        }}
      >
        X
      </button>
      <div className="relative">
        <div className="search-box__results">
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                role="listitem"
                tabIndex={0}
                data-testid={index + 1}
                className={`search-box__results__item ${focusIndex === index ? 'focused' : ''}`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
          {searchTerm && (
            <a 
              href={`/search?q=${searchTerm}`}
              className="search-box__results__footer"
              data-testid="6"
            >
              Search: "<span className="truncate">{searchTerm}</span>"
            </a>
          )}
        </div>
      </div>
    </div>
  );
}