import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class commonService {
    cartScreen: boolean;
    constructor(private http: HttpClient) {
    }
}
