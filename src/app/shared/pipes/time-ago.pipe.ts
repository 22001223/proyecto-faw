import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, parse } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    return formatDistanceToNow( parse(value, 'MM/dd/yyyy HH:mm:ss', new Date()) );
  }

}
