import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// npm install --save export-to-csv
import { ExportToCsv } from 'export-to-csv';
import { User } from '../shared/api-auth/app.user-model';
import { ClienteApiAuthService } from '../shared/api-auth/cliente-api-auth.service';
import { TaiResult } from '../shared/api-tai/app.result-model';
import { Tai } from '../shared/api-tai/app.tai-model';
import { ClienteApiOrdersService } from '../shared/api-tai/cliente-api-tai.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:User[];
  tais: Array<Tai> = [];
  resultados: TaiResult[];
  idTai: number = 0;
  taiName:string = "";


  newTai = {
    id: 0,
    name: "",
    code: "",
    grupo: "",
    palabra1: "",
    palabra2: "",
    imagen1: "",
    imagen2: "",
    concepts: [],
    enable: false,
    groupEnable: false
  };
  tai = this.newTai as Tai;
  
  newUser = {
    id: 0,
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: true,
    createdAt: new Date,
    updatedAt: new Date
  };

  userAdd = this.newUser as User;  // Hay que darle valor inicial, si no salta una
  //userEdit = this.newUser as User;

  constructor(private router: Router, private clienteApiAuth: ClienteApiAuthService, private ruta: ActivatedRoute, 
    private clienteApiRest: ClienteApiOrdersService) { } 




  ngOnInit(): void {
    this.getUsers();
    this.getTais();
    this.getResults(this.idTai);
  }

  refresh(): void {
    window.location.reload();
  }

  getCSV(tai:Tai, resultados: TaiResult[]){
    //CSV OPTIONS
    var options = {
      filename: <string>tai.code+ "-"+ tai.grupo +"-"+ tai.name + "-b3+b4-" + tai.imagen1 + "-y-" + tai.palabra1 + "-vs-" + tai.imagen2 + "-y-" + tai.palabra2 + "-b6+b7-" + tai.imagen2 + "-y-" + tai.palabra1 + "-vs-" + tai.imagen1 + "-y-" + tai.palabra2,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: <string>tai.code+ "-"+ tai.grupo +"-"+ tai.name + "-b3+b4-" + tai.imagen1 + "-y-" + tai.palabra1 + "-vs-" + tai.imagen2 + "-y-" + tai.palabra2 + "-b6+b7-" + tai.imagen2 + "-y-" + tai.palabra1 + "-vs-" + tai.imagen1 + "-y-" + tai.palabra2,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    var csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(resultados);
  }

  // Obtiene la lista de users
  getUsers() {
    this.clienteApiAuth.getUsers().subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
        } 
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    )

  }

  getTais() {
    this.clienteApiRest.getTais().subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.tais = resp.body as Tai[]; // Se obtiene la lista de users desde la respuesta
        }
      },
      err => {
        console.log("Error al traer la lista de Tais: " + err.message);
        throw err;
      }
    )
  }

  getTai() {
    this.clienteApiRest.getTai(this.idTai).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.tai = resp.body as Tai; // Se obtiene la lista de users desde la respuesta
          
        }
      },
      err => {
        console.log("Error al traer la lista de Tais: " + err.message);
        throw err;
      }
    )
  }

  getResults(idTai: number) {
    this.idTai = idTai;
    this.clienteApiRest.getResults(this.idTai).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.resultados = resp.body as TaiResult[]; // Se obtiene la lista de users desde la respuesta
          this.getTai();
        }
      }
    );
  }

  downloadAllResults() {
    this.tais.forEach(tai => {
      this.clienteApiRest.getResults(tai.id).subscribe(
        resp => {
          if (resp.status < 400) { // Si no hay error en la respuesta
            var resultados: TaiResult[];
            resultados = resp.body as TaiResult[]; // Se obtiene la lista de users desde la respuesta
            this.getCSV(tai, resultados);
          }
        }
      );
    });
  }

  onSubmit(){
    if (this.userAdd == this.newUser){
      this.nuevo();
    }else{
      this.editar();
    }
  }

  editar() {
    this.clienteApiAuth.updateUser(this.userAdd.id,this.userAdd).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          //this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
          this.getUsers();
        }
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    );

  }


  nuevo() {
    this.clienteApiAuth.addUser(this.userAdd).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          //this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
          this.getUsers();
        }
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    );

  }

  deleteUser(id : Number) {
    this.clienteApiAuth.deleteUser(id).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          //this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
          this.getUsers();
        }
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    );
    
  }

  deleteTai(){
    this.clienteApiRest.deleteTai(this.idTai).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          //this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
          this.getTais();
          this.idTai=0;
        }
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    );
  }

  cloneTai(){
    this.clienteApiRest.cloneTai(this.idTai, this.taiName).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          //this.users = resp.body as User[]; // Se obtiene la lista de users desde la respuesta
          this.getTais();
          this.idTai=0;
        }
      },
      err => {
        console.log("Error al traer la lista de users: " + err.message);
        throw err;
      }
    );
  }


  sendEnable(tai:Tai){
    tai.enable = !tai.enable;
    console.log(tai.enable);
    this.clienteApiRest.sendEnable(tai.id, tai.enable).subscribe();
  }

  sendEnableGroups(tai:Tai) {
    tai.groupEnable = !tai.groupEnable;
    this.clienteApiRest.sendEnableGroups(tai.id, tai.groupEnable).subscribe();
  }

  clickLogout() {
    this.clienteApiAuth.logout();
    this.router.navigate(['inicio']);
  }
}