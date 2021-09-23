import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class commonService {
    cartScreen: boolean;
    userDetails: any;
    customerAccount: boolean;
    vendorAccount : boolean;
    constructor(private http: HttpClient) {
    }
}
