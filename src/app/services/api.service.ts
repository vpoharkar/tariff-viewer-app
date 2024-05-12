import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Region, RegionalTariff, country } from '../models/tariff.model';

@Injectable({providedIn: 'root'})
export class ApiService {
    private baseURI = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<country[]> {
        return this.httpClient.get(`${this.baseURI}/api/countries`).pipe(
            map(res => res as country[]),
            catchError(this.handleError)
        );
    }

    getRegionDetails(): Observable<Region[]> {
        return this.httpClient.get(`${this.baseURI}/api/regions`).pipe(
            map(res => res as Region[]),
            catchError(this.handleError)
        );
    }

    getAllRegionalTariffs(regionReferenceId: string): Observable<RegionalTariff[]> {
        return this.httpClient.get(`${this.baseURI}/tariffs?regionReferenceId=${regionReferenceId}`).pipe(
            map(res => res as RegionalTariff[]),
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error(error);
        return throwError(() => new Error(error));
    }
    
}