import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CHART_MOCK_DATA } from './mocks/chart-data-mock.spec';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GoogleChartsModule.forRoot()
      ],
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set chart data when "data$" is empty', () => {
      component.data$ = of([]);
      component.ngOnInit();
      expect(component.chartData).toEqual(CHART_MOCK_DATA);
    });
    it('should set chart data when "data$" is not empty', () => {
      component.data$ = of([['AAPL', 'One Month']]);
      component.ngOnInit();
      expect(component.chartData.data).toEqual([['AAPL', 'One Month']]);
    });
  });
  
  describe('ngOnDestroy()', () => {
    it('should unsubscribe from stocks data', () => {
      (component as any).chartDataSubscription = new Subscription();
      const unsubscribeSpy: jasmine.Spy = spyOn((component as any).chartDataSubscription, 'unsubscribe').and.stub();
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });

});
