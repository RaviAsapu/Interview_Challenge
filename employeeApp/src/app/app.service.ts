import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable()
export class AppService {

    constructor(private http: Http) {
    }

    getAllEmployees(): Observable<Array<Employee>> {
        return this.http.get('http://localhost:3000/apicrud/employee').pipe(
            map(res => res.json())
        );
    }

    getEmployeeById(id: number): Observable<any> {
        return this.http.get('http://localhost:3000/apicrud/employee/' + id).pipe(
            map(res => res.json())
        );
    }

    addEmployee(emp: Employee) {
        return this.http.post('http://localhost:3000/apicrud/employee/', emp).pipe(
            map(res => res.json())
        );
    }

    deleteEmployee(id: number): Observable<any> {
        return this.http.delete('http://localhost:3000/apicrud/employee/' + id).pipe(
            map(res => res.json())
        );
    }

    updateEmpllyee(id: number, emp: Employee): Observable<any> {
        return this.http.put('http://localhost:3000/apicrud/employee/' + id, emp).pipe(
            map(res => res.json())
        );
    }
}
