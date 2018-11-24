import { RecipeModel } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>();
  private recipes: RecipeModel[] = [
    new RecipeModel(
      "Test Recipe",
      "This is a test",
      "https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg"
    ),
    new RecipeModel(
      "Test Recipe 2",
      "This is a test number 2",
      "http://damakpidekebap.com/media/uploads/products/0015-1302019483901_20161028151843.jpg"
    )
  ];

  getRecipe() {
    return this.recipes.slice();
  }
}
