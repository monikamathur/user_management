import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/user';
import * as fromAuth from '../../reducers';
import * as authActions from '../../actions/auth.actions';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginContainer implements OnInit {
  pending$: any = this.store.select(fromAuth.selectLoginPagePending);
  error$: any = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store) { }

  ngOnInit() {

  }

  onSubmit(credentials: Credentials) {
    console.log(credentials)
    this.store.dispatch(authActions.login({ credentials }));
  }

}
