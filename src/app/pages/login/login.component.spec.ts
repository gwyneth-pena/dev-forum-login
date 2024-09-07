import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UserService } from '../../shared/services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';
import { AlertComponent } from '../../shared/modals/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButton: HTMLElement;
  let userService: UserService;
  let utilsService: UtilsService;
  let ngbModal: NgbModal;
  let username: string;
  let password: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    username = 'username@test.com';
    password = 'password';
    userService = TestBed.inject(UserService);
    utilsService = TestBed.inject(UtilsService);
    ngbModal = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validations if fields are empty', () => {
    component.form.controls['emailAddress'].setValue('');
    component.form.controls['password'].setValue('');

    submitButton.click();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.error'));
    errors.forEach((error) => {
      expect(error.nativeElement.innerText.toLowerCase()).toContain('required');
    });

    expect(component.form.valid).toBe(false);
  });

  it('should show validation if email is invalid', () => {
    component.form.controls['emailAddress'].setValue('test');
    submitButton.click();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error.innerHTML.toLowerCase()).toContain(
      'must be a valid email address'
    );
  });

  it('should show a "login successfully" message if the credentials are wrong', fakeAsync(() => {
    spyOn(userService, 'login').and.returnValue(
      throwError(() => {
        return {
          error: {
            isSuccess: false,
            message: 'Invalid credentials.',
          },
        };
      })
    );

    spyOn(utilsService, 'openModal');

    component.form.controls['emailAddress'].setValue(username);
    component.form.controls['password'].setValue(password);
    submitButton.click();
    fixture.detectChanges();

    tick(500);
    expect(utilsService.openModal).toHaveBeenCalled();
    expect(component.displayError.message.toLowerCase()).toContain(
      'invalid credentials'
    );
    flush();
  }));

  it('should show an "invalid credentials" message if the credentials are correct', fakeAsync(() => {
    spyOn(userService, 'login').and.returnValue(
      of({
        isSuccess: true,
        message: 'Login successfully!',
      })
    );

    spyOn(utilsService, 'openModal');

    component.form.controls['emailAddress'].setValue(username);
    component.form.controls['password'].setValue(password);
    submitButton.click();
    fixture.detectChanges();

    tick(500);
    expect(utilsService.openModal).toHaveBeenCalled();
    expect(component.displayError.message.toLowerCase()).toContain(
      'login success'
    );
    flush();
  }));
});
