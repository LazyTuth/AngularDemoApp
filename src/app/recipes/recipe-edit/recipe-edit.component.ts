import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { RecipeModel } from "../recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  formRecipe: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params["id"]);
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.formRecipe);
    const newRecipe = new RecipeModel(
      this.formRecipe.value.name,
      this.formRecipe.value.desc,
      this.formRecipe.value.imagePath,
      this.formRecipe.value.ingredients
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.formRecipe.get("ingredients")).removeAt(index);
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDesc = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipeInfo = this.recipeService.getRecipeById(this.id);
      recipeName = recipeInfo.name;
      recipeImagePath = recipeInfo.imagePath;
      recipeDesc = recipeInfo.description;
      if (recipeInfo.ingredients.length > 0) {
        recipeInfo.ingredients.forEach(element => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(element.name, Validators.required),
              amount: new FormControl(element.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
                Validators.min(1)
              ])
            })
          );
        });
      }
    }

    this.formRecipe = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      desc: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get recipeIngredientsData() {
    return (<FormArray>this.formRecipe.get("ingredients")).controls;
  }

  onAddIngredient() {
    (<FormArray>this.formRecipe.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
          Validators.min(1)
        ])
      })
    );
  }
}
