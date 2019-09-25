import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginModel;
  recordarme = false;

  constructor(private auth: AuthService, private roter: Router) {
  }

  ngOnInit() {
    this.login = new LoginModel();

    if (localStorage.getItem('email')) {
      this.login.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }


  Submitlogin(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.auth.login(this.login)
      .subscribe(resp => {

        if (this.recordarme) {
          localStorage.setItem('email', this.login.email);
        }

        Swal.close();
        this.roter.navigateByUrl('/home');
      }, err => {

        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }
}
