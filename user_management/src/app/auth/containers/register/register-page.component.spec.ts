import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContainer } from './register-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegisterContainer', () => {
  let component: RegisterContainer;
  let fixture: ComponentFixture<RegisterContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterContainer ] ,
      providers: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



});
