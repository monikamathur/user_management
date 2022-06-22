import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import * as moment from "moment";
import jwt_decode from 'jwt-decode';


const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    login(loginData: any): Observable<any> {
        console.log("sdfsdfsdf")
        return this.http.post(AUTH_API + 'login', loginData, httpOptions);
    }
    register(registerData: any): Observable<any> {
        return this.http.post(AUTH_API + 'register', registerData, httpOptions);
    }
    setSession(authResult: any) {
        const decoded: any = jwt_decode(authResult);
        const expiresAt = moment().add(decoded.exp, 'second');
        localStorage.setItem('id_token', authResult);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at") || '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}