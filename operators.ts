import {
  fromEvent,
  throttleTime,
  scan,
  Observable,
  interval,
  take,
  of,
} from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

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
  SwitchMapExample();
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

export function MergeMapExample() {
  const numbers$ = interval(1000);
  const letters$ = of('a', 'b', 'c', 'd', 'e');
  const mergedNumberLetters$ = letters$.pipe(
    mergeMap((x) =>
      numbers$.pipe(
        take(5),
        map((i) => i + x)
      )
    )
  );

  mergedNumberLetters$.subscribe((x) => console.log('margeMap: ' + x));
}

export function SwitchMapExample() {
  const numbers$ = interval(1000);
  const letters$ = of('a', 'b', 'c', 'd', 'e');
  const mergedNumberLetters$ = letters$.pipe(
    switchMap((x) =>
      numbers$.pipe(
        take(5),
        map((i) => i + x)
      )
    )
  );

  mergedNumberLetters$.subscribe((x) => console.log('switchMap: ' + x));
}
