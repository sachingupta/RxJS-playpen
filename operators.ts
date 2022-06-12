import { fromEvent, throttleTime, scan } from 'rxjs';

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

export function ThrottleExample() {
  fromEvent(document, 'click')
    .pipe(
      throttleTime(1000),
      scan((count) => count + 1, 0)
    )
    .subscribe((count) => console.log(`Clicked ${count} times`));
}
