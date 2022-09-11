import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  
  displayError = false;
  displayLoading = false;
  
  registerForm = this._lf.group({
    userName: [''],
    firstName: [''],
    lastName: [''],    
    mobilePhone:[''],
    password: [''],
    rePassword:[''],
  });

  constructor(
    private _lf: FormBuilder,
    private _backend: UserService,
    private _router: Router
  ) {}

  public isvalidPhone(n : string) {
    if(n.length ==10 ){
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
    return false;
  }
  public isvalidUsername(n : string) {
    if(n.length >0 ){
      return true;
    }
    return false;
  }
  public isvalidFirstname(n : string) {
    if(n.length >0 ){
      return true;
    }
    return false;
  }
  public isvalidLastname(n : string) {
    if(n.length >0 ){
      return true;
    }
    return false;
  }

  submit() {
    this.displayLoading = true;
    if(this.isvalidUsername(this.registerForm.value.userName))
    {
      if(this.isvalidFirstname(this.registerForm.value.firstName))
      {
        if(this.isvalidLastname(this.registerForm.value.lastName))
        {
          if(this.isvalidPhone(this.registerForm.value.mobilePhone)){
            if(this.registerForm.value.password == this.registerForm.value.rePassword){
              this._backend
              .register
                (
                this.registerForm.value.userName,
                this.registerForm.value.firstName,
                this.registerForm.value.lastName,          
                this.registerForm.value.mobilePhone,
                this.registerForm.value.password,
                ).subscribe(
                (result) => {
                  this._router.navigateByUrl('login');
                  this.displayLoading = false;
                  Swal.fire({
                    icon: 'success',
                    title: 'Great!',
                    text: 'Registration Successful'
                  });
                },
                (err) => {
                  this.displayError = true;
                  this.displayLoading = false;
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.error.error.description
                  });
                }
              );
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Enter a correct Password'
              });
              this.displayLoading = false;
            }
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please Enter a valid Phone Number (10 digits)'
            });
            this.displayLoading = false;
          }
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter a valid Last Name'
          });
          this.displayLoading = false;
        }
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Enter a valid First Name'
        });
        this.displayLoading = false;
      }
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter a valid User Name (Min 4 char)'
      });
        this.displayLoading = false;
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem('JwtToken') != null) {
      this._router.navigateByUrl('home');
    }
    
    this.registerForm.valueChanges.subscribe((value) => {
      this.displayError = false;
    });
  }
}
