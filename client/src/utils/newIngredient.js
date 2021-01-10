import { v4 as uuidv4 } from 'uuid';

// returns an ingredient object with a unique id
export function newIngredient(ingredient, week, id) {
    const newIngredientObject = {
        id: uuidv4(),
        week: week,
        mealId: id,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
        food: ingredient.food,
        foodId: ingredient.foodId,
        weight: ingredient.weight,
        category: ingredient.foodCategory,
        image: ingredient.image,
        isCompleted: false
    };

    return newIngredientObject;
};