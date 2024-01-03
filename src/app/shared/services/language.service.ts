import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LanguagesList } from '../interfaces/languages.interface';
import { mapToNamesArray } from '../mappers/language.mapper';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private http: HttpClient = inject(HttpClient);
  private url = 'assets/data/languages.json';
  getLanguages(): Observable<string[]> {
    return this.http.get<LanguagesList>(this.url)
      .pipe(
        map(mapToNamesArray)
      )
  }
}
