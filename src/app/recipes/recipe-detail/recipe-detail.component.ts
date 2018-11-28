import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelected: RecipeModel;
  recipeId: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = parseInt(param["id"]);
      this.recipeSelected = this.recipeService.getRecipeById(this.recipeId);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeSelected.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
    // this.router.navigate(["../", this.recipeId, "edit"], {relativeTo: this.route}); //new way to create complex path
  }
}
