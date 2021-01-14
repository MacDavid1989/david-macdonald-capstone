// fetches all meals from db
getMeals = () => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("meals");
        collection.find({}).toArray((err, data) => {
          if(err){
            reject(err);
          }
          resolve(data);
        });
    });
}

// deletes the meal matching the passed id
deleteMeals = (meal) => {
    return new Promise(function (resolve, reject) {
        const collection = db.collection('meals');
        collection.deleteOne({ id: meal });
        console.log('deleted meal')
        resolve("Deleted meal");
    });
}

// deletes all ingredients matching the mealId passed
deleteIngredients = (meal) => {
    return new Promise(function (resolve, reject) {
        const collection = db.collection('ingredients');
        collection.deleteMany({ mealId: meal });
        console.log('Deleted ingredients')
        resolve("Deleted ingredients");
    });
}

// inserts one document(object) to the meals collection of the db
addNewMeal = (newMeal) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("meals");
        collection.insertOne(newMeal, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log("New Meal Added!")
            resolve("Meal added");
        });
    });
}

// inserts an array of documents(objects) to the ingredients collection of the db
addNewIngredients = (newIngredients) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("ingredients");
        collection.insertMany(newIngredients, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log("New Ingredients Added!")
            resolve("Ingredients added");
        });
    });
}

module.exports = { 
    getMeals, 
    deleteMeals, 
    deleteIngredients, 
    addNewMeal, 
    addNewIngredients 
}

// // fetches the recipe items data
// getIngredients = () => {
//     return new Promise((resolve, reject) => {
//         const collection = db.collection("ingredients");
//         collection.find({}).toArray((err, data) => {
//           if(err){
//             reject(err);
//           }
//           resolve(data);
//         });
//       });
// }