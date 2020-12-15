// returns a meal object with a week and date value that contains an array of ingredients with unique ids
export function newMeal(meal, ingredients, week, id, date) {
    const newMealObject = {
        id: id,
        date: date,
        week: week,
        calories: Math.ceil(meal.calories / meal.yield),
        name: meal.label,
        image: meal.image,
        url: meal.url,
        ingredients: ingredients
    }

    return newMealObject
}