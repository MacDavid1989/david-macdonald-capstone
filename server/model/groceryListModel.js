const { v4: uuidv4 } = require("uuid");

// creates a grocery list from the items array passed as an argument
groceryList = (ingredients) => {
    // sorts the ingredients by their food id
    let sortedIngredients = sortByFoodId(ingredients)

    // consolidates all foods in the sorted list by adding the weight of the next matching foodId
    // then splicing that next matching item from the array
    let consolidatedIngredients = consolidateIngredients(sortedIngredients)

    // sorts the ingredients by their food category
    sortedIngredients = sortByCategory(consolidatedIngredients)

    return sortedIngredients
}

// compares the current and next food ids, if they match, the weights are added together and the next value is spliced
// this continues until the end of the array.
consolidateIngredients = (ingredients) => {
    for(i=0; i < ingredients.length; i++){
        while(ingredients[i+1] !== undefined && ingredients[i].foodId !== undefined &&
            (ingredients[i].foodId === ingredients[i+1].foodId)){
                ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
                ingredients.splice(i+1, 1)
        }
    }

    return ingredients
}

// compares the the foodIds of the item array, the strings are sorted alphabetically grouping like ids together 
sortByFoodId = (item) => {
    item.sort((a, b) => {
        if(a.foodId === undefined && b.foodId === undefined){
            return 0;
        } else if(a.foodId === undefined){
            return -1;
        } else if(b.foodId === undefined){
            return 1;
        } else {
            let fa = a.foodId
            let fb = b.foodId

            if (fa < fb) {
                return -1;
            } else if (fa > fb) {
                return 1;
            } else {
                return 0;
            }
        }  
    })

    return item
}


// compares the the lower case categories of the item array, the strings are sorted alphabetically grouping like categories together
// if the category is null the values are placed at the end of the array 
sortByCategory = (item) => {
    item.sort((a, b) => {
        if(a.category === null && b.category === null){
            return 0;
        } else if(a.category === null){
            return -1;
        } else if(b.category === null){
            return 1;
        } else {
            let fa = a.category.toLowerCase()
            let fb = b.category.toLowerCase()

            if (fa < fb) {
                return -1;
            } else if (fa > fb) {
                return 1;
            } else {
                return 0;
            }
        }  
    })

    return item
}

// fetches the recipe ingredients data
getIngredients = () => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("ingredients");
        collection.find({}).toArray((err, data) => {
          if(err){
            reject(err);
          }
          resolve(data);
        });
    });
}

// fetches the user items data
getUserItems = () => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("userItems");
        collection.find({}).toArray((err, data) => {
          if(err){
            reject(err);
          }
          resolve(data);
        });
    });
}

// adds the user entered item to the db
addNewUserItem = (newUserItem) => {
    // creates new user item object and provides a unique id
    const item = {
        id: uuidv4(),
        food: newUserItem.food.toLowerCase(),
        weight: newUserItem.weight,
        week: newUserItem.week,
        category: "user item",
        isCompleted: newUserItem.isCompleted
    }

    return new Promise((resolve, reject) => {
        const collection = db.collection("userItems");
        collection.insertOne(item, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log("New User Item Added!")
            resolve(item);
        });
    });
}

// if the category is present, will return a promise from the userItems collection where it will
// find the item matching the id and on success update the isCompleted value. if no category present
// the same action will take place in the ingredients collection
setIsCompleted = (id, category) => {
    if(category){
        return new Promise(function (resolve, reject) {
            const collection = db.collection('userItems');
            collection.findOne({id: id}).then(item => {
                collection.updateOne({ id: id }, {$set: {isCompleted: !item.isCompleted}});
            });
            console.log('Updated item')
            resolve("Updated item");
        });
    } else{
        return new Promise(function (resolve, reject) {
            const collection = db.collection('ingredients');
            collection.findOne({id: id}).then(item => {
                collection.updateOne({ id: id }, {$set: {isCompleted: !item.isCompleted}});
            });
            console.log('Updated item')
            resolve("Updated item");
        });
    }
}

// removes a user item matching the id provided
deleteItem = (item) => {
    return new Promise(function (resolve, reject) {
        const collection = db.collection('userItems');
        collection.deleteOne({ id: item });
        console.log('deleted item')
        resolve("Deleted item");
    });
}

module.exports = {
    groceryList,
    getIngredients,
    getUserItems,
    addNewUserItem,
    setIsCompleted,
    deleteItem
}