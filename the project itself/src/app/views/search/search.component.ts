import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Activity } from '../../types/activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  activitiesArr: Activity[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  getResults(event: Event, inputValue: string): void {
    event.preventDefault();
    this.activitiesArr = [];

    this.apiService.getCourses().subscribe((activities) => {
      for (const each of activities) {
        if (each.title.toLowerCase().includes(inputValue.toLowerCase())) {
          this.activitiesArr.push(each);
        }
      }
    });
  }

  goToDetails(id: string) {
    this.router.navigate([`courses/${id}`]);
  }
}
