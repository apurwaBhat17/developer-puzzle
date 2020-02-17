import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[],
  startDate: Date,
  endDate: Date
): PriceQuery[] {
  return map(
    response.filter(
      priceQueryResponse =>
        new Date(priceQueryResponse.date) >= startDate &&
        new Date(priceQueryResponse.date) <= endDate
    ),
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
