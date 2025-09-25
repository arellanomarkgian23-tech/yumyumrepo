import { useState, useEffect } from "react";

function App() {
 const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("pasta");
  const [cuisine, setCuisine] = useState("");

  const fetchRecipes = async () => {
    setLoading(true);
    
    try {
      // Build simple query string
      let url = `http://localhost:5000/api/recipes/search?query=${query}`;
      if (cuisine) {
        url += `&cuisine=${cuisine}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.results || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Load recipes when query or cuisine changes
  useEffect(() => {
    if (query.trim()) {
      fetchRecipes();
    }
  }, [query, cuisine]);

  const handleSearch = () => {
    fetchRecipes();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">🍳 Recipe Search</h1>
      
      {/* Simple Search Form */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for recipes (e.g., pasta, chicken)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Cuisine</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="chinese">Chinese</option>
              <option value="indian">Indian</option>
              <option value="american">American</option>
            </select>
          </div>
          
          <button 
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Finding recipes...</p>
        </div>
      )}
      
      {/* Results */}
      {!loading && (
        <>
          <div className="mb-4 text-center">
            <p className="text-gray-600">Found {recipes.length} recipes for "{query}"</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                  {recipe.readyInMinutes && (
                    <p className="text-sm text-gray-600">⏱️ {recipe.readyInMinutes} min</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {recipes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No recipes found. Try a different search!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default App;
