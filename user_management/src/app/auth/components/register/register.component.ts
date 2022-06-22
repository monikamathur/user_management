import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage!: string | null;

  @Output() submitted = new EventEmitter<any>();

  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  form: FormGroup;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)]],
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      role: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // loading = false;
  // submitted = false;
  // form: FormGroup;
  // Roles: any = ['Admin', 'Author', 'Reader'];
  // constructor(private authService: AuthService,
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,) {
  //   this.form = this.fb.group({
  //     name: ['', [
  //       Validators.required,
  //       Validators.minLength(3)]],
  //     email: ['', [
  //       Validators.required,
  //       Validators.pattern("[^ @]*@[^ @]*")]],
  //     role: ['', [
  //       Validators.required
  //     ]],
  //     password: ['', [
  //       Validators.required,
  //       Validators.minLength(8)]],
  //   });
  // }

  // ngOnInit() {

  // }


  // // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

  // onSubmit(): void {
  //   console.log("this.form.value", this.form.value)
  //   console.log("this.form.invalid", this.form)

  //   this.submitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   console.log("this.form.value", this.form.value)
  //   this.loading = true;
  //   this.authService.register(this.form.value)
  //     .pipe(first())
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['../login'], { relativeTo: this.route });
  //       },
  //       error: error => {
  //         this.loading = false;
  //       }
  //     });
  // }
}