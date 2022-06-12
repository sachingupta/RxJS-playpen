# rxjs-edwhye

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-edwhye)

**Observable**

- Observables are like functions with zero arguments, but generalize those to allow multiple values.
- Observables are able to deliver values either synchronously or asynchronously.
-

```Javascript
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe(x => {
  console.log(x);
});
foo.subscribe(y => {
  console.log(y);
});
```

- Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.

**What is an Observer?**

- An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete. The following is an example of a typical Observer object:

- ```Javascript
  const observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  ```

**Subscription**

- A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription. In previous versions of RxJS, Subscription was called "Disposable".
- A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.
-

```Javascript
  import { interval } from 'rxjs';
const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
// Unsubscribes BOTH subscription and childSubscription
subscription.unsubscribe();
}, 1000);

```
