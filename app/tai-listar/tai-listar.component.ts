import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tai } from '../shared/api-tai/app.tai-model';
import { Concept } from '../shared/api-tai/app.concept-model';

import { ClienteApiOrdersService } from '../shared/api-tai/cliente-api-tai.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ClienteApiAuthService } from '../shared/api-auth/cliente-api-auth.service';

@Component({
  selector: 'app-tai-listar',
  templateUrl: './tai-listar.component.html',
  styleUrls: ['./tai-listar.component.css']
})


export class TaiListarComponent implements OnInit {

  tais: Array<Tai> = [];
  inGroups = true;
  group: String;
  groups: Array<String> = [];

  //constructor() { }
  constructor(private ruta: ActivatedRoute, private router: Router,
    private clienteApiRest: ClienteApiOrdersService, private clienteApiAuth: ClienteApiAuthService) { }


  ngOnInit() {
    this.clienteApiAuth.logout();
    this.getTais()
  }

  getTais() {
    this.clienteApiRest.getTais().subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.tais = resp.body as Tai[]; // Se obtiene la lista de users desde la respuesta
          this.getGroups();
        }
      },
      err => {
        console.log("Error al traer la lista de Tais: " + err.message);
        throw err;
      }
    )
  }

  getGroups() {
    this.tais.forEach(element => {
      if(!this.groups.includes(element.grupo) && element.enable){
        this.groups.push(element.grupo);
      }
    });
  }

  click(group: String){
    this.inGroups = false;
    this.group = group
  }

}
