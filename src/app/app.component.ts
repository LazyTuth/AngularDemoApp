import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
  loadedFeature: string = "recipe";
  onNavigate(featureName: string) {
    this.loadedFeature = featureName;
  }
}
