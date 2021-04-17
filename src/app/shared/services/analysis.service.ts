import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  ingredientsAnalysis: ReplaySubject<any> = new ReplaySubject();
  constructor() {}
}
