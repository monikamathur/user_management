import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginContainer } from './login-page.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('LoginContainer', () => {
  let component: LoginContainer;
  let fixture: ComponentFixture<LoginContainer>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginContainer],
      providers: [HttpClientTestingModule, RouterTestingModule, AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginContainer);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  

  // it('should login', () => {

  //   const spy = spyOn(component, 'onSubmit');  

  //   let email = component.form.controls['email']
  //   let password = component.form.controls['email']
  //   email.setValue("monika@gmail.com");
  //   password.setValue("Monika@123");
  //    let form = fixture.debugElement.query(By.css('form'));
  //   component.onSubmit();
  //   const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
  //   expect(navArgs).toEqual("/user")
  // });
});
