import {Injectable} from '@angular/core';
import {IEmployee} from './IEmployee';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()

export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  baseURL = 'http://localhost:3000/employees';

  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.baseURL).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
  }

  getEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(`${this.baseURL}/${id}`).pipe(catchError(this.handleError));
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.baseURL, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseURL}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`).pipe(catchError(this.handleError));
  }
}
