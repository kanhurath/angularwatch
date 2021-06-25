import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})

export class FormatPricePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return parseFloat(value).toFixed(2);
  }

}
