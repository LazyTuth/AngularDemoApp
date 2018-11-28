import { RecipeModel } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { IngredientModel } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<RecipeModel>();
  private recipes: RecipeModel[] = [
    new RecipeModel(
      "Test Recipe",
      "This is a test",
      "https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg",
      [new IngredientModel("Meat", 1), new IngredientModel("French Fries", 20)]
    ),
    new RecipeModel(
      "Test Recipe 2",
      "This is a test number 2",
      "http://damakpidekebap.com/media/uploads/products/0015-1302019483901_20161028151843.jpg",
      [new IngredientModel("Buns", 2), new IngredientModel("Meat", 1)]
    )
  ];

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
