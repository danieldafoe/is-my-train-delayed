import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRefreshTime'
})
export class FormatRefreshTimePipe implements PipeTransform {

  transform(value: string): string {
    const timeStart = value.indexOf('T') + 1;
    return value.substr(timeStart, 8);
  }

}
