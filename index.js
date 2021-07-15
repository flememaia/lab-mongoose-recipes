const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany() // comentei essa linha para parar de deletar
    // outro jeito de deletar tudo seria =>  return db.connection.dropDatabase();
  })
  .then(async() => {
    // // INTERACTION 2 - Criando um novo registro de receita na coleção, usando o modelo pré-definido
    // (ok Mongoo Compass)
    const result = await Recipe.create({
      "title": "Fried Seafood Laksa Noodles",
      "level": "Amateur Chef",
      "ingredients": [
        "1 tablespoon vegetable oil",
        "2 red onions, minced",
        "3 green chile peppers, sliced",
        "3 cloves garlic, minced",
        "1 teaspoon crushed ginger",
        "1 tablespoon light soy sauce",
        "1 tablespoon ground white pepper, or to taste salt to taste",
        "7 ounces fresh prawns",
        "1 squid, cleaned and sliced into rings, or more to taste",
        "4 ounces fresh spinach, finely chopped",
        "1 carrot, sliced",
        "18 ounces fresh rice noodles, rinsed and drained"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "svc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3662782.jpg&w=596&h=399&c=sc&poi=face&q=85",
      "duration": 40,
      "creator": "Chef Djenna-all recipes"
    });
    console.log(result, result.title);

    // //INTERACTION 3 - Inserindo vários registros de uma vez a partir de uma array 
    // (ok Mongoo Compass)
    const resultManyRecipes = await Recipe.insertMany(data)

    console.log(resultManyRecipes);
    
    // APENAS PARA ESTUDO = Consultar todos os registros
    //(ok Mongoo Compass)
    // const allRecipes = await Recipe.find();

    // console.log("ALL RECIPES => ", allRecipes);

    // // INTERACTION 4 - Update Recipe 
    // (ok Mongoo Compass)
    const rigatoniUpdated = await Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"}, 
      {$set: {duration: 100}},
      {new: true}
    );
    console.log("RECIPE UPDATED=>", rigatoniUpdated);

    // INTERACTION 5 - Remove a Recipe 
    // (ok Mongoo Compass)
    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake"
    });

    console.log("DELETED RECIPE => ", deletedRecipe);

  }).catch(error => {
    console.error('Error connecting to the database', error);
  });

  //INTERACTION 6 - CLOSE THE DATABASE 
  // process.on('SIGINT', function (){
  //   mongoose.connect.close(MONGODB_URI, {
  //     useCreateIndex: true,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //   })
  // .then(self => {
  //   console.log(`Disconnected to the database: "${self.connection.name}"`);
  //   process.exit(0);
  // }).catch(error => {
  //   console.error('Error disconnecting to the database', error);
  // });
  mongoose.disconnect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Disconnected to the database: "${self.connection.name}"`);
  }).catch(error => {
  console.error('Error trying to disconnect to the database', error);
  });