import Search from './models/Search';
import * as searchView from './view/serachView';
import { elements } from './view/base';

// ----Global state of the app----
// Search object
// Current recipe object
// Shopping list object
// Liked recipes
const state = {};

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

    // 4) Search for recipe
    await state.search.getResults();

    // 5) Render results on UI
    // console.log(state.search.result);
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
