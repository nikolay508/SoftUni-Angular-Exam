import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
  standalone: true,
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return true;
  }
}
