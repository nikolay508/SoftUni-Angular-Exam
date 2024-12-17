import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './core/navigation-bar/navigation-bar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { EditComponent } from './shared/edit/edit.component';
import { DetailsComponent } from './shared/details/details.component';
import { AuthenticateComponent } from './authenticate/authenticate/authenticate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
    FooterComponent,
    EditComponent,
    DetailsComponent,
    AuthenticateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project-app';
}
