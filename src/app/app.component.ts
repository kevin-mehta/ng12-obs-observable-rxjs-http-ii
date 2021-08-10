import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { SearchItem } from './search.item';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  loading: boolean = false;
  results: Observable<SearchItem[]>;
  searchField: FormControl;
  toShowTileView: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchField = new FormControl();

    this.results = this.searchField.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap((term: any) => this.searchService.search(term)),
      tap(_ => (this.loading = false))
    );
    console.log('this.results: ', this.results);

    // this.results = this.searchField.valueChanges
    //   .debounceTime(400)
    //   .distinctUntilChanged()
    //   .map(term => this.searchService.search(term))
    //   .subscribe(value => {
    //     1;
    //     value.subscribe(other => console.log(other))(2);
    //   });
  }

  doSearch(term: string) {
    // this.searchService.search(term);

    // this.searchService.search(term).subscribe((data: any) => {
    //   this.loading = false;
    //   this.results = data;
    //   console.log('this.results: ', this.results);
    // });

    this.results = this.searchService.search(term);
  }
}
