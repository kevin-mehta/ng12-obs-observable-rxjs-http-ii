import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { SearchItem } from './search.item';

@Injectable()
export class SearchService {
  // apiRoot: string = 'https://itunes.apple.com/search';
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchItem[]> {
    console.log('Search term: ', term);
    let apiURL = 'https://fakestoreapi.com/products';
    return this.http.get(apiURL).pipe(
      map((res: any) => {
        return res.map((item: any) => {
          return new SearchItem(
            item.id,
            item.title,
            item.price,
            item.category,
            item.description,
            item.image
          );
        });
      })
    );
  }
}
