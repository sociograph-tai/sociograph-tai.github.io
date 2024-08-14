import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteApiAuthService } from '../shared/api-auth/cliente-api-auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router, private clienteApiAuth: ClienteApiAuthService,
  ) { }

  ngOnInit() {
  }

  // Al pulsar en el boton List Users
  clickLogout() {
    this.clienteApiAuth.logout();
    //this.router.navigate(['login']);
  }

}
