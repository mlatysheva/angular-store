import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxLength: number = 16, elipsis: string = '...'): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + elipsis;
    } else {
      return value;
    }
  }
}
