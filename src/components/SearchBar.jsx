import {useState} from "react";

export default function SearchBar({ onSearch }) {
 const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");

  const handleSubmit = () => {
    onSearch({ query, cuisine, diet, intolerances });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <span role="img" aria-label="search">🔍</span>
        <h2 className="text-lg font-bold">Search Recipes</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">Recipe Name</label>
          <input
            id="search"
            type="text"
            placeholder="Type a recipe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium mb-1">Cuisine</label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="american">American</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="diet" className="block text-sm font-medium mb-1">Diet</label>
          <select
            id="diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="intolerances" className="block text-sm font-medium mb-1">Intolerances</label>
          <select
            id="intolerances"
            value={intolerances}
            onChange={(e) => setIntolerances(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No Intolerances</option>
            <option value="gluten">Gluten</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="peanut">Peanut</option>
          </select>
        </div>
      </div>
      
      <button 
        type="button" 
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
      >
        Search Recipes
      </button>
    </div>
  );
}