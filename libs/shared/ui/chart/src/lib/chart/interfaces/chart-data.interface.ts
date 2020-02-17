import { IChartOptions } from '../interfaces/chart-options.inteface'

/**
 * chart interface
 */
export interface IChartData {
  title: string,
  type: string,
  data: any[],
  columnNames: string[],
  options: IChartOptions
}
