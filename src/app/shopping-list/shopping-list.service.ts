import { IngredientModel } from "../shared/ingredient.model";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<IngredientModel[]>();
  private ingredients: IngredientModel[] = [
    new IngredientModel("Apple", 5),
    new IngredientModel("Tomatoes", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();

  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
