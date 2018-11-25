import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filter;
  movieList;
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(private appservice: AppService) { }
  ngOnInit() {
    this.appservice.getMovieList().subscribe(response => {
      this.movieList = response;
      console.log(this.movieList);
      this.setPage(1);
    })
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.appservice.getPager(this.movieList.length, page);

    // get current page of items
    this.pagedItems = this.movieList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);

  }
}