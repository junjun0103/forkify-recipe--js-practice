import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};

// 'Pasta with tomato and spinach'
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  title.split(' ').reduce((prev, cur) => {
    if (prev + cur.length <= limit) {
      newTitle.push(cur);
    }
    return (prev += cur.length);
  }, 0);
  return newTitle.join(' ');
};

const renderRecipe = (recipe) => {
  const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
  // insertAdjacentHTML mdn  <<  google it
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};
