import React from 'react';
import { SearchBox } from './components/SearchBox';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Search Component
          </h1>
          <p className="text-lg text-gray-600">
            Press <kbd className="px-2 py-1 bg-gray-200 rounded">Ctrl</kbd> +{' '}
            <kbd className="px-2 py-1 bg-gray-200 rounded">K</kbd> to start searching
          </p>
        </div>
        <SearchBox />
      </div>
    </div>
  );
}

export default App;