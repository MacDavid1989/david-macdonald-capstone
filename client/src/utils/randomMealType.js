export function mealType() {
    const mealType = ['breakfast','lunch','dinner','snack']
  
     return mealType[Math.floor(Math.random() * mealType.length)]
} 