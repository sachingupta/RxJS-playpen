import {
  fromEvent,
  throttleTime,
  scan,
  Observable,
  interval,
  take,
} from 'rxjs';

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
  TakeExmplae();
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
