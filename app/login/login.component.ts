import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/api-auth/app.auth-model';
import { ClienteApiAuthService } from '../shared/api-auth/cliente-api-auth.service';
//import { DataAuthService } from '../shared/api-auth/data-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAuth = {
    email: "",
    password: "",
    token: ""
  };

  auth = this.newAuth as Auth;

  mensaje: String;

  constructor(private router: Router, private clienteApiAuth: ClienteApiAuthService,
  ) { } //private datosAuth: DataAuthService

  ngOnInit() {
    this.clienteApiAuth.logout();
    this.mensaje = '';
    console.log("INIT: " + this.auth.email);
  }

  // Se ejecuta al realizar en el template la acción de enviar el formulario
  // al pulsar en el boton login
  onSubmit() {
    console.log("SUBMIT: " + this.auth.email);
    if (this.auth.email && this.auth.password) {
      console.log("LOGIN: " + this.auth.token);
      this.login();
    }
  }

  // LLama a la api de autorizacion para enviar la peticion de login al servidor
  // Si la respuesta es correcta almacena el token jwt en el navegador
  // y redirigimos haceia users
  // En caso de ser incorrecto mostramos el error
  login() {
    this.clienteApiAuth.login(this.auth).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la operacion por parte del servicio
          this.auth = resp.body;
          this.clienteApiAuth.setSession(this.auth);
          this.auth = resp.body;
          console.log("Token: " + this.auth.token);
          console.log("Token : " + localStorage.getItem("jwt_token"));
          this.router.navigate(['admin']);
        }
        else if (resp.status == 403) {
          this.mensaje = 'Credenciales incorrectas';
        }
        else {
          this.mensaje = 'Error al procesar el login';
        }
      },
      err => {
        console.log("Error al hacer login: " + err.message);
        throw err;
      }
    );
  }


  // Al pulsar en el boton List Users
  clickLogout() {
    this.clienteApiAuth.logout();
    this.router.navigate(['inicio']);
  }

  // Al pulsar en el boton List Users
  clickAdmin() {
    //this.clienteApiAuth.logout();
    this.router.navigate(['admin']);
  }
}
