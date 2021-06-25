import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export PricePipe implements PipeTransform {

  transform(value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  }

}
