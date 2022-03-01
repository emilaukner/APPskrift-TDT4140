/* 
Helper function that filters recipes based on categories. If no categories is selected all recepies is returned
If a category is selected, only recepies matching the categories is returned
*/

export const getFilteredRecipes = (recipeData, meal, estimate, cousine, otherCategories) => 
    recipeData.filter(recipe => {
        if (!meal.length && !estimate.length && !cousine.length && !meal.length && !otherCategories.length ) return true;
        return (recipe.meal.some(spesificMeal => meal.includes(spesificMeal)) 
                || recipe.estimate.some(spesificEstimate => estimate.includes(spesificEstimate)) 
                || recipe.cousine.some(spesificCousine => cousine.includes(spesificCousine)) 
                || recipe.otherCategories.some(spesificOtherCategories => otherCategories.includes(spesificOtherCategories))
        );
    }
);