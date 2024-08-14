import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tai } from './app.tai-model';
import { TaiResponse } from './app.response-model';
import { TaiResult } from './app.result-model';
import { enableDebugTools } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ClienteApiOrdersService {

    private static readonly BASE_URI = 'http://'+location.hostname+':8082/tai';

    constructor(private http: HttpClient) { }

    /**
     * Obtiene una respuesta http con la lista de tais
     * de la peticion get http
     * @returns Respuesta http con la lista de tais
     */
    getTais(): Observable<HttpResponse<Tai[]>> {
        let url = ClienteApiOrdersService.BASE_URI;
        return this.http.get<Tai[]>(url, { observe: 'response' });
    }

    /**
     * Obtiene el tai con el id especificado
     * @param id 
     * @returns 
     */
    getTai(id:number): Observable<HttpResponse<Tai>> {
        let url = ClienteApiOrdersService.BASE_URI + "/" + id;
        return this.http.get<Tai>(url, { observe: 'response' });
    }


    /**
     * Devuelve un código que no esta en uso 
     * @returns
     */
    getCode(): Observable<HttpResponse<Tai>> {
        let url = ClienteApiOrdersService.BASE_URI + "/code";
        return this.http.get<Tai>(url, { observe: 'response' });
    }

    /**
     * Añade un Tai
     * @param tai tai a añadir
     * @returns Respuesta http
     */
    addTai(tai: Tai): Observable<HttpResponse<any>> {
        let url = ClienteApiOrdersService.BASE_URI;
        return this.http.post(url, tai, { observe: 'response', responseType: 'text' });
    }

    /**
     * Envia la respuesta de un usuario que realiza un tai al servidor
     * @param id 
     * @param resp 
     * @returns 
     */
    sendResponse(id: number, resp: TaiResponse,){
        let url = ClienteApiOrdersService.BASE_URI + "/" +  id;
        return this.http.post(url, resp, { observe: 'response', responseType: 'text' });
    }

    /**
    updateTai(id: String, order: Tai): Observable<HttpResponse<any>> {
        let url = ClienteApiOrdersService.BASE_URI + id;
        return this.http.put(url, order, { observe: 'response', responseType: 'text' });
    }*/
    

    /**
     * Envia las imagenes del tai al servidor
     * @param file 
     * @param code 
     * @returns 
     */
    upload(file: File, code: String): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', ClienteApiOrdersService.BASE_URI + "/upload/" + code, formData, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    /*getFiles(): Observable<any> {
        return this.http.get(ClienteApiOrdersService.BASE_URI + "/files");
    }*/

    getResult(idTai:number, idResp: number){
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai + "/resultados/" + idResp;
        return this.http.get<TaiResult>(url, { observe: 'response'});
    }

    /**
     * Devuelve todos los resulltados de un tai
     * @param idTai 
     * @returns 
     */
    getResults(idTai: number) {
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai + "/resultados";
        return this.http.get<TaiResult[]>(url, { observe: 'response' });
    }

    /**
     * Borra un tai a partir de su identificador
     * @param id Identificador de un tai
     * @returns Respuesta http
     */
    deleteTai(idTai: number): Observable<HttpResponse<any>> {
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai;
        return this.http.delete(url, { observe: 'response', responseType: 'text' });
    }

    cloneTai(idTai: number, name: string): Observable<HttpResponse<any>> {
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai + "/clone";
        return this.http.post(url, name, { observe: 'response', responseType: 'text' });
    }

    /**
     * Envia el estados de activacion de un tai
     * @param idTai
     * @param enable 
     * @returns 
     */
    sendEnable(idTai: number, enable: Boolean): Observable<HttpResponse<String>>{
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai + "/enable";
        return this.http.put(url, enable, { observe: 'response', responseType: 'text' });
    }

    /**
     * Envia el estados de activacion de un tai
     * @param idTai
     * @param enable
     * @returns
     */
    sendEnableGroups(idTai: number, enable: Boolean): Observable<HttpResponse<String>>{
        let url = ClienteApiOrdersService.BASE_URI + "/" + idTai + "/enableGroups";
        return this.http.put(url, enable, { observe: 'response', responseType: 'text' });
    }
}
