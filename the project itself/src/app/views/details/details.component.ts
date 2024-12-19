import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Activity } from '../../types/activity';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  course = {} as Activity;
  isOwner = false;
  isSignedOut = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['courseId'];

    this.apiService.getSingleCourse(id).subscribe((course) => {
      this.course = course;

      if (
        this.course.signedOut.find((id) => id === this.userService.user?._id)
      ) {
        this.isSignedOut = true;
      }

      this.checkOwnership(course._ownerId);
    });
  }

  checkOwnership(ownerId: string): void {
    this.isOwner = this.userService.isOwner(ownerId);
  }

  deleteCourse(): void {
    if (!this.isOwner) {
      alert('You are not authorized to delete this course!');
      return;
    }

    const id = this.route.snapshot.params['courseId'];

    if (confirm('Are you sure you want to delete this course?')) {
      this.apiService.deleteCourse(id).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.router.navigate(['/courses']);
    }
  }

  signOutForCourse(): void {
    if (this.isOwner) {
      alert('You are not able to sign out of this course!');
      return;
    }
    const courseId = this.route.snapshot.params['courseId'];
    const userId = this.userService.user?._id;

    if (!userId) {
      alert('You must be logged in to sign out of a course.');
      return;
    }

    this.apiService.signOutCourse(courseId, userId).subscribe({
      next: () => {
        this.router.navigate([`/courses/${courseId}`]);
      },
      error: (err) => {
        console.error(err);
        alert('An error occurred while signing out of the course.');
      },
    });
  }
}
