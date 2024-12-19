import { Component } from '@angular/core';
import { Activity } from '../../types/activity';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class LatestCourseComponent {
  latestCourses: Activity[] = [];

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getCourses().subscribe((courses) => {
      for (let i = courses.length - 1; i >= courses.length - 3 && i >= 0; i--) {
        if (courses[i] === undefined) {
          return;
        } else {
          this.latestCourses.push(courses[i]);
        }
      }
    });
  }
}
