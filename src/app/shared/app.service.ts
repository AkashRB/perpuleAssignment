import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { map, filter, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { movieList } from '../../assets/movieList.json';

@Injectable()
export class AppService {
    // endPoint="http://www.omdbapi.com/?i=tt3896198&apikey=837155e4"
    constructor(private http: Http) { }
    public getMovieList(): Observable<any> {
        return this.http.get('./assets/movieList.json').pipe(map((response: any) => { 
            return response.json();
        }));
    }
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
 
        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
         
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
