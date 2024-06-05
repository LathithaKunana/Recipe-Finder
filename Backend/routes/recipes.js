// routes/recipes.js
const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Add a new recipe
router.post('/add', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).send(newRecipe);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Fetch recipes based on ingredients
router.post('/find', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const recipes = await Recipe.find({ ingredients: { $all: ingredients } });
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
