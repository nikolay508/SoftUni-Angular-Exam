import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import { emailValidator } from "../../utils/email.validator";
import { DOMAINS } from "../../constants";
import { UserService } from "../user.service";
import { ErrorMsgComponent } from "../../core/error-msg/error-msg.component";
import { ErrorMsgService } from "../../core/error-msg/error-msg.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorMsgComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      }
    )
  });

  hasError: boolean = false;

  constructor(private userService: UserService, private router: Router, private errorService: ErrorMsgService) {
    this.errorService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }
  
    const { email, passGroup: { password } = {} } = this.form.value;
    
    this.userService
    .login(email!, password!) // They will be there for sure.
    .subscribe({
      next: () => {
        this.hasError = false;
        this.errorService.clearError();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.hasError = true;
      },
    });
  }

  
}
