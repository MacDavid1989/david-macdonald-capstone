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