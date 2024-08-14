import { Component, VERSION, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { TaiResult } from '../shared/api-tai/app.result-model';

import { ClienteApiOrdersService } from '../shared/api-tai/cliente-api-tai.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import * as Highcharts from 'highcharts'; //npm install highcharts


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
import { Tai } from '../shared/api-tai/app.tai-model';
Histogram(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
//import * as newdata from './data';



@Component({
  selector: 'app-tai-resultados',
  templateUrl: './tai-resultados.component.html',
  styleUrls: ['./tai-resultados.component.css']
})
export class TaiResultadosComponent implements OnInit {

  idTai = 0;
  idResp = 0;

  resultado: TaiResult;
  resultados: TaiResult[];

  tai: Tai;

  media: number;

  public activity: any;
  public xData: any;
  public label: any;
  options: any;
  res: any;

  constructor(private ruta: ActivatedRoute, private router: Router,
    private clienteApiRest: ClienteApiOrdersService) { }

  createHistogram(data:number[]){

    //var data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];

    this.options = {
      title: {
        text: 'Histograma de la diferencia de tiempos de respuesta'
      },

      xAxis: [{
        title: { text: 'Numero de usuarios' },
        alignTicks: false,
        opposite: true
        
      }, {
        title: { text: 'Diferencia tiempo de respuesta' },
        alignTicks: false,
      }],

      yAxis: [{
        title: { text: 'Diferencia tiempo de respuesta' }
      }, {
        title: { text: 'Numero de usuarios' },
        opposite: true
      }],
      

      plotOptions: {
        histogram: {
          accessibility: {
            pointDescriptionFormatter: function (point: { index: number; x: number; x2: number; y: any; }) {
              var ix = point.index + 1,
                x1 = point.x.toFixed(3),
                x2 = point.x2.toFixed(3),
                val = point.y;
              return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
            }
          }
        }
      },

      series: [{
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1
      }, {
        name: 'Data',
        type: 'scatter',
        data: data,
        id: 's1',
        marker: {
          radius: 1
        }
      }]
    };

    Highcharts.chart('container', this.options);

  }
    

  ngOnInit(): void {

    let obj = this.ruta.snapshot.paramMap.get('id');
    this.idTai = parseInt((obj == null) ? "null" : obj.toString());

    obj = this.ruta.snapshot.paramMap.get('id2');
    this.idResp = parseInt((obj == null) ? "null" : obj.toString());

    this.getTai();
    this.getResult();
    this.getResults();
    
  }

  getTai() {
    this.clienteApiRest.getTai(this.idTai).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.tai = resp.body as Tai; // Se obtiene la lista de users desde la respuesta
        }
      }
    );
  }

  getResult(){
    this.clienteApiRest.getResult(this.idTai, this.idResp).subscribe(
      resp =>{
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.resultado = resp.body as TaiResult; // Se obtiene la lista de users desde la respuesta
        } 
      }
    );
  }

  getResults() {
    this.clienteApiRest.getResults(this.idTai).subscribe(
      resp => {
        if (resp.status < 400) { // Si no hay error en la respuesta
          this.resultados = resp.body as TaiResult[]; // Se obtiene la lista de users desde la respuesta
          console.log(this.resultados.length);
          var data: number[] = [];
          var sum: number = 0;
          this.resultados.forEach(element => {
            data.push(element.diff74);
            sum += element.diff74;
          });
          this.media = sum / data.length
          this.createHistogram(data);
        }
      }
    );
  }

}
