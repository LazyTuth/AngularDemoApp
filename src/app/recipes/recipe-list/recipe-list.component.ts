import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel("Test Recipe", "This is a test", "https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg"),
    new RecipeModel("Test Recipe 2", "This is a test number 2", "http://damakpidekebap.com/media/uploads/products/0015-1302019483901_20161028151843.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
