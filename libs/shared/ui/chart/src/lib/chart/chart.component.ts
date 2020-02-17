import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IChartData } from './interfaces/chart-data.interface';
import { CHART_MOCK_DATA } from './mocks/chart-data-mock.spec';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<(string | number)[][]>;
  public chartData: IChartData;
  private chartDataSubscription: Subscription;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartData = CHART_MOCK_DATA;
    this.chartDataSubscription = this.data$.subscribe(newData => (this.chartData.data = newData));
  }

  ngOnDestroy() {
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
    }
  }
}
