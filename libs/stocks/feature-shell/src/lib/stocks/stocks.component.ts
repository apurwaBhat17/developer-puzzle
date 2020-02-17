import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query'
import { Subscription } from 'rxjs';
import { EStocksLabels } from './enums/stocks-labels.enum';
import { EStocksPlaceholders } from './enums/stocks-placeholders.enum';
import { TIME_PERIODS_MOCK } from './mocks/stocks-mock.spec';
import { EStocksErrors } from './enums/stocks-errors.enum';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public quotes$ = this.priceQuery.priceQueries$;
  public timePeriods = TIME_PERIODS_MOCK.timePeriods;
  public stockLabels = EStocksLabels;
  public stockPlaceholders = EStocksPlaceholders;
  public stockErrors = EStocksErrors;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit() {}

  public fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
