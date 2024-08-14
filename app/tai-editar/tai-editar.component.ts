import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tai } from '../shared/api-tai/app.tai-model';
import { Concept } from '../shared/api-tai/app.concept-model';

import { ClienteApiOrdersService } from '../shared/api-tai/cliente-api-tai.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ClienteApiAuthService } from '../shared/api-auth/cliente-api-auth.service';
import { enableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'app-tai-editar',
  templateUrl: './tai-editar.component.html',
  styleUrls: ['./tai-editar.component.css']
})
export class TaiEditarComponent implements OnInit {

  selectedFile:File;
  image:string;

  files: Array<File> =[];

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

  tai = this.newTai as Tai;  // Hay que darle valor inicial, si no salta una

  newConcept = {

    name: "",
    status: ""

  };

  concept = this.newConcept as Concept;  // Hay que darle valor inicial, si no salta una
  form:any
  valid: boolean = false;

  constructor(private ruta: ActivatedRoute, private router: Router,
    private clienteApiRest: ClienteApiOrdersService, private clienteApiAuth: ClienteApiAuthService) { }

  ngOnInit(): void {
    this.getCode();
  }

  //Se ejecuta al realizar en el template la acción de enviar el formulario
  onTaiSubmit() {
    this.addEncuesta(); 
  }

  clickCode(){
  }

  getCode(){
    this.clienteApiRest.getCode().subscribe(
      resp => {
       this.tai.code = resp.body?.code as String;
      }
    );
  }

  focus(){
    document.getElementById("palabra")!.focus();
  }

  // Agrega un nuevo pedido
  addEncuesta() {
    this.files.forEach(file => {
      this.clienteApiRest.upload(file, this.tai.code).subscribe();
    });
    
    this.clienteApiRest.addTai(this.tai).subscribe(
      resp => {
        this.router.navigate(['admin']);
      },
      err => {
        throw err;
      }
    )
  }

  haveConcept(): boolean{
    var aux: Array<String> = [];

    this.tai.concepts.forEach(concept => {
      var i = aux.indexOf(concept.status);
      if (i == -1) {
        aux.push(concept.status);
      }
    });
    return aux.length == 4;
  }


  onImagenSubmit() {


  }

  onPalabraSubmit() { 

    this.tai.concepts.push(this.concept);
    this.concept = <Concept>{
      name: "",
      status: ""
    };
    this.valid = this.haveConcept();
  }

  onChange(event:Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      Array.from(fileList).forEach(file => this.selectedFile = file);
    }
  }
/*
  selectFile(event: Event) {
    this.selectedFiles = event.target.files;
  }

*/

  upload() {
    this.files.push(this.selectedFile);
    this.concept.name = this.selectedFile.name;
    this.tai.concepts.push(this.concept);
    this.concept = <Concept>{
      name: "",
      status: ""
    };
    this.valid = this.haveConcept();
    //this.selectedFiles = undefined;
  }

  deleteConcept(i: number) {
    this.tai.concepts.splice(i, 1);
    this.valid = this.haveConcept();
  }

  clickLogout() {
    this.clienteApiAuth.logout();
    this.router.navigate(['inicio']);
  }

}
