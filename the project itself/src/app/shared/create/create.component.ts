import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMsgComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form = new FormGroup({
    courseTitle: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    startDate: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  hasError: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private errorService: ErrorMsgService) {
    this.errorService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
   }   

  createCourse() {
    console.log('hey');
    
    if (this.form.invalid) {
      return;
    }

    const { courseTitle, description, startDate, imageUrl, price } = this.form.value;
    this.apiService.createCourse(courseTitle!, startDate!, price!, imageUrl!, description!).subscribe({
      next: () => {
        this.hasError = false;
        this.errorService.clearError();
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.hasError = true;
      },
    });
  }
}
