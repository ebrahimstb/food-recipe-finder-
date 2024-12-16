// script.js

// Preloaded recipes data (placeholders for now)
const preloadedRecipes = [
  {
    title: "Holiday Cookies",
    image: "https://via.placeholder.com/200x150.png?text=Holiday+Cookies",
    id: 1, // Example ID placeholder
  },
  {
    title: "Eggnog Latte",
    image: "https://via.placeholder.com/200x150.png?text=Eggnog+Latte",
    id: 2, // Example ID placeholder
  },
  {
    title: "Roast Turkey",
    image: "https://via.placeholder.com/200x150.png?text=Roast+Turkey",
    id: 3, // Example ID placeholder
  },
  {
    title: "Pumpkin Pie",
    image: "https://via.placeholder.com/200x150.png?text=Pumpkin+Pie",
    id: 4, // Example ID placeholder
  },
];

// Function to display preloaded recipes
const displayPreloadedRecipes = () => {
  const container = document.getElementById("recipes-container");
  preloadedRecipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    container.appendChild(recipeCard);
  });
};

// Fetch recipes from Spoonacular API
const fetchRecipes = async (query) => {
  const API_KEY = "1d941ff16b5f4fd0bff1f02120b78843"; // Replace with your Spoonacular API key
  const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    displaySearchResults(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

// Display search results
const displaySearchResults = (results) => {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results
  document.getElementById("search-results").classList.remove("hidden");

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
    return;
  }

  results.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    resultsContainer.appendChild(recipeCard);
  });

  // Attach event listeners to "View Recipe" buttons
  const buttons = document.querySelectorAll(".view-recipe-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const recipeId = e.target.getAttribute("data-id");
      fetchRecipeDetails(recipeId);
    });
  });
};

// Fetch detailed recipe information
const fetchRecipeDetails = async (id) => {
  const API_KEY = "1d941ff16b5f4fd0bff1f02120b78843"; // Replace with your Spoonacular API key
  const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const recipe = await response.json();
    displayRecipeDetails(recipe);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
};

// Display detailed recipe
const displayRecipeDetails = (recipe) => {
  const recipeDetailsContainer = document.createElement("div");
  recipeDetailsContainer.classList.add("recipe-details");

  recipeDetailsContainer.innerHTML = `
    <div class="recipe-overlay">
      <div class="recipe-content">
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>
          ${recipe.extendedIngredients
            .map((ingredient) => `<li>${ingredient.original}</li>`)
            .join("")}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions || "No instructions available."}</p>
        <button id="close-recipe">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(recipeDetailsContainer);

  // Close button functionality
  document.getElementById("close-recipe").addEventListener("click", () => {
    recipeDetailsContainer.remove();
  });
};

// Event listeners
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-bar").value;
  if (query) fetchRecipes(query);
});

// Initialize
displayPreloadedRecipes();
