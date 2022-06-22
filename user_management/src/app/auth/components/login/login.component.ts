import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage!: string | null;
  @Output() submitted = new EventEmitter<Credentials>();
  @Output() onSort = new EventEmitter();

  loading = false;
  // submitted = false;
  form: FormGroup;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  ngOnInit() {

  }

  submit() {
    console.log("this.form.valid", this.form.valid)
    if (this.form.valid) {
      console.log("this.form.value", this.form.value)
      this.submitted.emit(this.form.value);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // onSubmit(): void {
  //   this.submitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   // console.log("reskjkhkhkjhkj")

  //   this.loading = true;
  //   this.authService.login(this.form.value)
  //   .pipe(first())
  //   .subscribe({
  //     next: (res) => {
  //       console.log("res", res)
  //       this.authService.setSession(res.token)
  //       this.router.navigate(['../user'], { relativeTo: this.route });
  //     },
  //     error: error => {
  //       console.log(error)
  //       this.loading = false;
  //     }
  //   });
  // }
  
}
