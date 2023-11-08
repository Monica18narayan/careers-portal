// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { faFilm } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faLock } from '@fortawesome/free-solid-svg-icons';
// import { Router } from '@angular/router';
// import { AuthguardService } from '../Auth/authguard.service';




// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   UserIcon = faUser; 
//   PassIcon = faLock; 


//   constructor(private formBuilder: FormBuilder,private router: Router,private authService:AuthguardService) {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
//       password: ['',  Validators.compose([Validators.required,Validators.minLength(6)])]
//     });
    

//   }

//   ngOnInit() {
//     // You can perform any additional initialization here.
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.setLoggedIn(true);
//       const username = this.loginForm.value.username;
//       const password = this.loginForm.value.password;
//       localStorage.setItem('token',Math.random().toString());
//       this.router.navigate(['/careers'])
//       alert("Logged In Successfully!!");
      
      
     
//     }
//     else{
//       alert("Log in failed!!");

//     }
//   }
// }
