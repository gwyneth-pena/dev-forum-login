import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Meta, Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../shared/services/utils.service';
import { AlertComponent } from '../../shared/modals/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showPassword: boolean = false;
  isFormSubmitted: boolean = false;
  displayError = {
    title: '',
    message: '',
    isSuccess: true,
  };

  form = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private metaService: Meta,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Login | Dev Forum');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Login to Dev Forum to interact with other developers around the globe.',
    });
  }

  login(params: any) {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.userService.login(params).subscribe({
        next: (res: any) => {
          this.isFormSubmitted = false;
          this.spinner.hide();
          if (res.isSuccess) {
            localStorage.setItem('token', res.token);
            this.displayError = {
              title: 'Login',
              message: res.message,
              isSuccess: true,
            };
            this.utilsService.openModal(AlertComponent, this.displayError);
            this.form.reset();
            this.router.navigateByUrl('/dashboard');
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.displayError = {
            title: 'Login',
            message: err.error.message,
            isSuccess: false,
          };
          this.utilsService.openModal(AlertComponent, this.displayError);
        },
      });
    }
  }
}
