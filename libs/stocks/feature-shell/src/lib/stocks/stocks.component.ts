import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { EStocksPlaceholders } from './enums/stocks-placeholders.enum';
import { EStocksLabels } from './enums/stocks-labels.enum';
import { EStocksErrors } from './enums/stocks-errors.enum';
import { EStocksPeriod } from './enums/stocks-period.enum';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public today = new Date();
  public quotes$ = this.priceQuery.priceQueries$;
  public stocksPlaceholders = EStocksPlaceholders;
  public stocksLabels = EStocksLabels;
  public stocksErrors = EStocksErrors;
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  public ngOnInit() {}

  public fetchQuote() {
    const startDate = this.stockPickerForm.value.startDate;
    const endDate = this.stockPickerForm.value.endDate;
    const period = EStocksPeriod.MAX;
    if (this.stockPickerForm.valid) {
      this.updateDateOnError(this.stockPickerForm)
      const { symbol } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
      this.priceQuery.fetchFilterQuote(startDate, endDate);
    }
  }

  public dateValidation(stockPickerForm: FormGroup): boolean {
    if(stockPickerForm.value.startDate && stockPickerForm.value.endDate) {
      const fromDate = Date.parse(stockPickerForm.value.startDate);
      const toDate = Date.parse(stockPickerForm.value.endDate);
      if (fromDate > toDate) {
      return true
      }
    }
  }

  public updateDateOnError(stockPickerForm: FormGroup): void {
    if (this.dateValidation(stockPickerForm)) {
      this.stockPickerForm.value.startDate = stockPickerForm.value.endDate;
      this.stockPickerForm.controls['startDate'].setValue(stockPickerForm.value.endDate);
    }
  }
}
