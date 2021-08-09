import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs/dist/types/internal/Observable';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  private loading: boolean = false;
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;

  constructor(private itunes: SearchService) {}

  ngOnInit() {
    this.searchField = new FormControl();
    // this.results = this.searchField.valueChanges.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   tap(_ => (this.loading = true)),
    //   switchMap(term => this.itunes.search(term)),
    //   tap(_ => (this.loading = false))
    // );
    this.results = this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .map(term => this.itunes.search(term))
      .subscribe(value => {
        1;
        value.subscribe(other => console.log(other))(2);
      });
  }

  doSearch(term: string) {
    this.itunes.search(term);
  }
}
