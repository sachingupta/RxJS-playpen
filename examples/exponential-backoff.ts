import { of, pipe, range, throwError, timer, zip } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, retryWhen } from 'rxjs/operators';

/**
 * Exponential backoff is a technique in which you retry an API after failure,
 * making the time in between retries longer after each consecutive failure,
 * with a maximum number of retries after which the request is considered to have failed.
 * This can be quite complex to implement with promises and other methods of tracking AJAX calls.
 * With observables, it is very easy:
 */

export function backoff(maxTries: number, delay: number) {
  return pipe(
    retryWhen((attempts) =>
      zip(range(1, maxTries + 1), attempts).pipe(
        mergeMap(([i, err]) => (i > maxTries ? throwError(err) : of(i))),
        map((i) => i * i),
        mergeMap((v) => timer(v * delay))
      )
    )
  );
}

ajax('/api/endpoint')
  .pipe(backoff(3, 250))
  .subscribe(function handleData(data) {
    /* ... */
  });
