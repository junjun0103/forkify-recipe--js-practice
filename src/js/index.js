import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './view/serachView';
import { elements, renderLoader, clearLoader } from './view/base';

// ----Global state of the app----
// Search object
// Current recipe object
// Shopping list object
// Liked recipes
const state = {};

// Search controller

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput(); // todo
  console.log(query);

  if (query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipe
      await state.search.getResults();

      // 5) Render results on UI
      // console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// Recipe controller

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    // Prepare UI for chnages

    // Create new recipe object
    state.recipe = new Recipe(id);

    // TESTING
    window.r = state.recipe;

    try {
      // Get recipe data parse ingredients
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
