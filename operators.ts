import {
  fromEvent,
  throttleTime,
  scan,
  Observable,
  interval,
  take,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';

// 3 This is how you would allow at most one click per second, with plain JavaScript:
/**
 * 
 let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});

 */

export function OperatorsExample() {
  filterExample();
}

export function ThrottleExample() {
  fromEvent(document, 'click')
    .pipe(
      throttleTime(1000),
      scan((count) => count + 1, 0)
    )
    .subscribe((count) => console.log(`Clicked ${count} times`));
}

export function TakeExmplae() {
  const numbers$ = interval(1000);

  const takeFourNumbers$ = numbers$.pipe(take(4));

  takeFourNumbers$.subscribe((x) => console.log('Next: ', x));
}

export function MapExample() {
  const numbers$ = interval(1000);

  const takeFourNumbers$ = numbers$.pipe(
    take(4),
    map((x) => x * 10)
  );

  takeFourNumbers$.subscribe((x) => console.log('map: ', x));
}

export function filterExample() {
  const numbers$ = interval(1000);

  const takeFourNumbers$ = numbers$.pipe(
    take(15),
    filter((x) => x % 2 == 0),
    map((x) => x * 10),
    filter((x) => x > 20)
  );

  takeFourNumbers$.subscribe((x) => console.log('filter: ', x));
}
