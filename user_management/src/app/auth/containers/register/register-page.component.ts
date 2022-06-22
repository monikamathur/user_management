import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import * as authActions from '../../actions/auth.actions';
import * as fromAuth from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterContainer implements OnInit {
  pending$: any = this.store.select(fromAuth.selectLoginPagePending);
  error$: any = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store) {}

  ngOnInit() {

  }

  onSubmit(credentials: any) {
    this.store.dispatch(authActions.login({ credentials }));
  }
}