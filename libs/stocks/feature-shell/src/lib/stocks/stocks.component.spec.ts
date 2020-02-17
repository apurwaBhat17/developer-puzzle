import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksComponent } from './stocks.component';
import { Subscription } from 'rxjs';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';
import { StoreModule } from '@ngrx/store';
import { PriceQueryFacade } from '../../../../data-access-price-query/src';
import { FormBuilder, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StocksFeatureShellModule,
        StoreModule.forRoot({})
      ],
      providers: [
        PriceQueryFacade,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  describe('fetchQuote()', () => {
    beforeEach(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: ['ABC', Validators.required],
        period: ['Two months', Validators.required]
      });
    });
    it('should invoke fetchQuote', async(() => {
      spyOn(priceQuery, 'fetchQuote').and.stub();
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
      expect(priceQuery.fetchQuote).toHaveBeenCalledWith('ABC', 'Two months');
    }));
    it('should not invoke fetchQuote if form is invalid', async(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: [null, Validators.required],
        period: [null, Validators.required]
      });
      spyOn(priceQuery, 'fetchQuote').and.stub();
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    }));
  });
});
