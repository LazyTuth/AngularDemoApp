import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingListService } from "../shopping-list.service";
import { IngredientModel } from "src/app/shared/ingredient.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput") nameInputRef: ElementRef;
  // @ViewChild("amountInput") amountInputRef: ElementRef;
  shoppingEditForm: FormGroup;
  isEditMode = false;
  subscription: Subscription;
  ingredientIndex: number;
  editedIngredient: IngredientModel;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.min(1), Validators.required])
    });
    this.subscription = this.shoppingListService.readyToEditIngredient.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.ingredientIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.patchValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  onSubmit() {
    if (this.shoppingEditForm.valid) {
      const newIngredient = new IngredientModel(
        this.shoppingEditForm.value.name,
        this.shoppingEditForm.value.amount
      );
      if (this.isEditMode) {
        this.shoppingListService.updateIngredient(this.ingredientIndex, newIngredient);
      } else {
        this.shoppingListService.addIngredient(newIngredient);
      }
      this.resetForm();
    } else {
      console.log("Invalid form");
    }
  }

  resetForm() {
    this.shoppingEditForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
