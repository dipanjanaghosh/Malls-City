import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../../shared/services/logger.service';
import { passwordMatchValidator } from '../validators/passwordMatch.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private log: LoggerService, // injecting LoggerService to use in this component
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required, passwordMatchValidator()],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get getLoginForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.getLoginForm);
    console.log(this.loginForm.controls);
    this.log.info(`login.component.ts:onSubmit::${this.loginForm.controls}`);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this.getLoginForm['username'].value,
        this.getLoginForm['password'].value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  loginWithGoogle() {
    //write logic here
    this.log.info(`login.component.ts:loginWithGoogle clicked::`);
  }
}
