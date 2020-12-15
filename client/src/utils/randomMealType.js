// returns a random meal type for the search query
export function mealType() {
    const mealType = ['breakfast','lunch','dinner','snack']
  
    return mealType[Math.floor(Math.random() * mealType.length)]
} 