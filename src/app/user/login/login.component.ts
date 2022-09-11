import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this._lf.group({
    userName: [''],
    password: [''],
  });

  displayError = false;
  displayLoading = false;
  userservice : UserService;

  constructor(
    private _lf: FormBuilder,
    public _userserivce: UserService,
    private _router: Router
  ) {
    this.userservice = _userserivce;
  }

  submit() {
    this.displayLoading = true;
    this._userserivce
      .login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
        (result:any) => {
          this._router.navigateByUrl('home');
          localStorage.setItem('JwtToken', result.jwtToken);
          localStorage.setItem('name', result.name);
          localStorage.setItem('userName', result.userName);          
          this.displayLoading = false;
          this._userserivce.updateIsLoggedIn(true);
          Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: 'Successfully Logged In'
          });
        },
        (error: any) => {
          this.displayError = true;
          if(this.displayError == true)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Wrong Credentials'
            });
          }
          this.displayLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error.description

          });
        }
      );
  }

  ngOnInit(): void {
    if (localStorage.getItem('JwtToken') != null) {
      this._router.navigateByUrl('home');
    }
    else{
      this.userservice.updateIsLoggedIn(false);
    }
    this.loginForm.valueChanges.subscribe((value) => {
      this.displayError = false;
    });
  }
}

