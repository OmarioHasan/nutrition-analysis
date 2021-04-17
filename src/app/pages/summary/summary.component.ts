import { Component, OnInit } from '@angular/core';

import { AnalysisService } from '@shared/analysis.service';
import { ListAnimation } from '@shared/list-animation';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [ListAnimation],
})
export class SummaryComponent implements OnInit {
  analysis;
  showFacts = false;
  constructor(private AnalysisService: AnalysisService) {
    setTimeout(() => {
      if (!this.analysis) {
        window.location.href = '../';
      }
    }, 100);
  }

  ngOnInit(): void {
    this.AnalysisService.ingredientsAnalysis.subscribe({
      next: (analysis) => {
        this.analysis = analysis;
      },
    });
  }
}
