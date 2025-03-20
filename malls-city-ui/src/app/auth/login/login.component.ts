import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../../shared/services/logger.service';
import { passwordMatchValidator } from '../validators/passwordMatch.validator';
import { ToastrService } from 'ngx-toastr';
import { SingUpError } from '../modal/authInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSignup = false; // Initially show login form
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: SingUpError;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private log: LoggerService, // injecting LoggerService to use in this component
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm(): void {
    if (this.isSignup) {
      this.loginForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
      });
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
  }

  // convenience getter for easy access to form fields
  get getLoginForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.log.info(`login.component.ts:onSubmit::Form submitted`);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.log.info(`login.component.ts:onSubmit::Form is invalid`);
      return;
    }

    this.submitted = true;
    console.log(this.getLoginForm);
    console.log(this.loginForm.controls);

    if (this.isSignup) {
      this.loading = true;
      let formObj = {
        name: this.getLoginForm['name'].value,
        email: this.getLoginForm['email'].value,
        username: this.getLoginForm['username'].value,
        password: this.getLoginForm['password'].value,
        confirmPassword: this.getLoginForm['confirmPassword'].value,
      };
      this.log.info(
        `login.component.ts:Signup Form ::${JSON.stringify(formObj)}`
      );
      this.authService
        .signUp(formObj)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
            console.log('login.component.ts:Signup Form::data::', data);
            this.toaster.info(formObj.name, 'Signup successful');
            this.loading = false;
          },
          (error) => {
            this.error = error;
            console.log(
              'Error login.component.ts:Signup Form::',
              this.error.error
            );
            this.toaster.error(
              this.error.error.errorMsg,
              this.error.error.keyName.name
            );
            this.loading = false;
          }
        );
      return;
    } else {
      this.loading = true;
      let formObj = {
        email: this.getLoginForm['email'].value,
        password: this.getLoginForm['password'].value,
      };
      this.log.info(
        `login.component.ts:Signup Form ::${JSON.stringify(formObj)}`
      );
      this.authService
        .login(formObj)
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
  }

  loginWithGoogle() {
    //write logic here
    this.log.info(`login.component.ts:loginWithGoogle clicked::`);
  }

  toggleForm(): void {
    this.isSignup = !this.isSignup;
    this.createForm();
  }
}
