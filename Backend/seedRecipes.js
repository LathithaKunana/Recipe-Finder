// seedRecipes.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

// Load environment variables
dotenv.config();

// Connect to MongoDB using the same URI as in server.js
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const recipes = [
  {
    name: 'Tomato Rice',
    ingredients: ['tomato', 'rice', 'onion', 'pepper'],
    instructions: 'Cook the rice. Saute onions, tomatoes, and peppers. Mix together.'
  },
  {
    name: 'Pepper Onion Stir-fry',
    ingredients: ['onion', 'pepper', 'soy sauce', 'garlic'],
    instructions: 'Saute onions and peppers. Add soy sauce and garlic. Stir-fry until cooked.'
  },
  // Add more recipes as needed
];

async function seedDatabase() {
  try {
    for (const recipeData of recipes) {
      const recipe = new Recipe(recipeData);
      await recipe.save();
      console.log(`Recipe ${recipe.name} added to the database.`);
    }
    console.log('All recipes added to the database.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
}
