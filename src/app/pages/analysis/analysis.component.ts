import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { AnalysisService } from '@shared/analysis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  ingredientsForm: FormGroup;
  isLoading: boolean;
  worngIngredients: boolean;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private AnalysisService: AnalysisService,
    private router: Router
  ) {
    this.isLoading = false;
    this.worngIngredients = false;
    this.ingredientsForm = this.fb.group({
      ingredients: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]( [a-zA-Z]+)? [a-zA-Z]+$/m),
      ]),
    });
  }

  ngOnInit(): void {}

  analyseIngredients() {
    this.isLoading = true;
    this.worngIngredients = false;
    const ingr = this.ingredientsForm.get('ingredients').value.split('\n');
    this.http
      .post(
        `${environment.baseURL}/nutrition-details?app_id=${environment.appId}&app_key=${environment.keys}`,
        { ingr }
      )
      .subscribe({
        next: (analysis: any) => {
          for (const ingredient of analysis.ingredients) {
            if (!ingredient.parsed) {
              this.worngIngredients = true;
              break;
            }
          }
          if (!this.worngIngredients) {
            this.AnalysisService.ingredientsAnalysis.next(analysis);
            this.router.navigateByUrl('/summary');
          }
          this.isLoading = false;
        },
      });
  }
}
