// returns a new user defined item object
export function newUserItem(e, week) {
    const newUserItemObject = {
        food: e.target.itemName.value,
        weight: parseInt(e.target.itemWeight.value),
        week: week,
        isCompleted: false 
    }

    return newUserItemObject
}