import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Activity } from '../../types/activity';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  activities: Activity[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCourses().subscribe((activities) => {
      this.activities = activities;
    });
  }
}
