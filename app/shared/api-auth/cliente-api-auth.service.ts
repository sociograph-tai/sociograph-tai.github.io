import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './app.auth-model';
import { User } from './app.user-model';

@Injectable({
    providedIn: 'root'
})
export class ClienteApiAuthService {

    private static readonly BASE_URI = 'http://'+location.hostname+':8082/login';
    private static readonly BASE_URI_USERS = 'http://'+location.hostname+':8082/users';
    private static readonly UPDATE_ENABLE_URI = ClienteApiAuthService.BASE_URI_USERS + '/enable';

    constructor(private http: HttpClient) { } // inyectamos el servicio HttpClient

    // Hace un post, con una solicitud de logins
    login(auth: Auth): Observable<HttpResponse<any>> {
        let url = ClienteApiAuthService.BASE_URI;
        return this.http.post(url, auth, { observe: 'response' });
    }

    // Guarda en el navegador el token jwt
    setSession(auth: Auth) {
        localStorage.setItem('jwt_token', auth.token);
    }

    // Comprueba el usuario esta loggeado mirando
    // si existe el token jwt
    isLoggedIn() {
        let isLoggedIn = false;
        const expiration = localStorage.getItem('jwt_token');
        if (expiration) isLoggedIn = true;
        return isLoggedIn;
    }

    // Cierra la sesión, eliminando el token jwt
    // del navegador
    logout() {
        localStorage.removeItem('jwt_token');
    }


    /**
     * Obtiene una respuesta http con la lista de usuarios
     * de la peticion get http
     * @returns Respuesta http con la lista de usuarios
     */
    getUsers(): Observable<HttpResponse<User[]>> {
        let url = ClienteApiAuthService.BASE_URI_USERS;
        return this.http.get<User[]>(url, { observe: 'response' });
    }

    /**
     * Obtiene una respuesta http con un usuario por su identificador
     * @param id Identificador de un usuario
     * @returns Respuesta http con un usuario
     */
    getUser(id: Number): Observable<HttpResponse<User>> {
        let url = ClienteApiAuthService.BASE_URI_USERS + id;
        return this.http.get<User>(url, { observe: 'response' });
    }

    /**
     * Añade un usuario
     * @param user Usuaria a añadir
     * @returns Respuesta http
     */
    addUser(user: User): Observable<HttpResponse<any>> {
        let url = ClienteApiAuthService.BASE_URI_USERS;
        return this.http.post(url, user, { observe: 'response', responseType: 'text' });
    }

    /**
     * Actualiza los datos de un usuario
     * @param id Identificador de un usuario
     * @param user Usuario modificado
     * @returns Respuesta http 
     */
    updateUser(id: Number, user: User): Observable<HttpResponse<any>> {
        let url = ClienteApiAuthService.BASE_URI_USERS + "/" + id;
        return this.http.put(url, user, { observe: 'response', responseType: 'text' });
    }

    /**
     * Borra un usuario a partir de su identificador
     * @param id Identificador de un usuario
     * @returns Respuesta http
     */
    deleteUser(id: Number): Observable<HttpResponse<any>> {
        let url = ClienteApiAuthService.BASE_URI_USERS + "/" + id;
        return this.http.delete(url, { observe: 'response', responseType: 'text' });
    }

    /**
     * Obtienes todos los usuarios que esten habilitados
     * o desabilitados dependiendo del valor del parametro enable
     * @param enable Si los usuarios estan habilitados
     * @returns Respuesta http con una lista de usuarios
     */
    getAllUsersByEnable(enable: Boolean): Observable<HttpResponse<User[]>> {
        let url = ClienteApiAuthService.UPDATE_ENABLE_URI;
        let httpParams = new HttpParams();
        httpParams = httpParams.set('enable', enable.toString());
        return this.http.get<User[]>(url, { params: httpParams, observe: 'response' });
    }

    /**
     * Habilita a todos los usuarios a partir de una
     * lista de identificadores
     * @param ids Identifacadores de los usuarios
     * @returns Respuesta http
     */
    updateUserToEnabled(ids: Set<Number>): Observable<HttpResponse<any>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('user_id', Array.from(ids).sort().join(','));
        let url = ClienteApiAuthService.UPDATE_ENABLE_URI;
        return this.http.put(url, {}, { params: httpParams, observe: 'response', responseType: 'text' });
    }
}

