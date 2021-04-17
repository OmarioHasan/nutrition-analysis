import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  { path: '', component: AnalysisComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
