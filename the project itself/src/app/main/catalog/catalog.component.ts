import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Course } from '../../types/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  courses: Course[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void   {
    this.apiService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
