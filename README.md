# rxjs-Playpen

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-edwhye)

## The evolution of async pattern in JavaScript

[Async Patterns in JS](./async_programming_evolution_in_JS.md)

## RxJS

|            |   Sync   |      Async |
| ---------- | :------: | ---------: |
| Single     | Variable |    Promise |
| Collection |  Array   | Observable |

- Reactive Extensions for JavaScript, or [RxJS](https://rxjs.dev/guide/overview), is a JavaScript library that uses observables for reactive programming.
- It can be used with other JavaScript libraries and frameworks, and it integrates well into Angular
- RxJS, is a reactive library used to implement reactive programming to deal with async implementation, callbacks, and event-based programs.
- It can be used in your browser or with Node.js.
- The RxJS library is great for handling async tasks. It has a large collection of operators in filtering, error handling, conditional, creation, multicasting, and more.
- It is supported by JavaScript and TypeScript, and it works well with Angular.

### RxJS has some core features that help handle async implementation:

#### **Observable**

- Observables are like arrays because they represent a collection of events but are also like promises as they’re asynchronous: each event in the collection arrives at some indeterminate point in the future.
- RxJS observables allow you to publish events.
- Observables have two methods: subscribe and unsubscribe.
- You execute an observable by subscribing to it. Observables model a stream of events.
- Observables are like functions with zero arguments, but generalize those to allow multiple values.
- Observables are able to deliver values either synchronously or asynchronously.
- One thing to note here is that observables under RxJS are lazy

```Javascript
import { Observable } from 'rxjs';

const observable$ = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

observable$.subscribe(x => {
  console.log(x);
});

observable$.subscribe(y => {
  console.log(y);
});
```

```Javascript
import { fromEvent } from 'rxjs';

let button = document.querySelector('#increase');
var clicks$ = fromEvent(button, 'click');

clicks$.subscribe(e => {
  console.log('button clicked');
});
```

- Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.

#### **Observer**

- An Observer is a consumer of values delivered by an Observable.
- Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver: next, error, and complete.
- They are the objects that subscribe to observables.
- Each subsciption create a new instance of observer.
- The following is an example of a typical Observer object

```Javascript
  const observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

observable$(observer)
```

#### **Subscription**

- A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A
- Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription.
- A subscription to the observable will trigger the observable to execute.
- A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.

```Javascript
import { interval } from 'rxjs';

const observable$ = interval(1000);
const subscription = observable$.subscribe(x => console.log(x));

subscription.unsubscribe();

```

- Subscriptions can also be put together, so that a call to an unsubscribe() of one Subscription may unsubscribe multiple Subscriptions. You can do this by "adding" one subscription into another:

```Javascript
  import { interval } from 'rxjs';
const observable1$ = interval(400);
const observable2$ = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
// Unsubscribes BOTH subscription and childSubscription
subscription.unsubscribe();
}, 1000);

```

#### **Subject**

https://rxjs.dev/guide/subject

- A subject is the same as an EventEmitter. It is an observable that multicasts information to observers.

```Javascript

mySubject$;
  ngOnInit() {
    this.mySubject$ = new Subject();
    this.mySubject$.subscribe((x) => console.log('first subscribe', x));
    this.mySubject$.next(1);
    this.mySubject$.next(2);

    this.mySubject$.subscribe((x) => console.log('second subscribe', x));
    this.mySubject$.next(3);

    this.mySubject$.complete();
    this.mySubject$.subscribe((x) => console.log('third subscribe', x));
    this.mySubject$.next(4);

  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }

```

**BehaviourSubject**

- same as subject just required a value.
- it will start with last value, hold most recent value for any new subscriber.

```Javascript
mySubject$;
  ngOnInit() {
    this.mySubject$ = new BehaviorSubject(0);
    this.mySubject$.subscribe((x) => console.log('first subscribe', x));
    this.mySubject$.next(1);
    this.mySubject$.next(2);

    this.mySubject$.subscribe((x) => console.log('second subscribe', x));
    this.mySubject$.next(3);

    this.mySubject$.complete();
    this.mySubject$.subscribe((x) => console.log('third subscribe', x));
    this.mySubject$.next(4);
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
```

**ReplaySubject**

- all subscriber get all values

```Javascript
mySubject$;
  ngOnInit() {
    this.mySubject$ = new ReplaySubject();
    this.mySubject$.subscribe((x) => console.log('first subscribe', x));
    this.mySubject$.next(1);
    this.mySubject$.next(2);

    this.mySubject$.subscribe((x) => console.log('second subscribe', x));
    this.mySubject$.next(3);

    this.mySubject$.complete();
    this.mySubject$.subscribe((x) => console.log('third subscribe', x));
    this.mySubject$.next(4);
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
```

#### **Operator**

- An operator is a function that allows us to perform certain actions on events executed by observables.
- You can import operators from 'rxjs/operators'. To use an operator, pass it into the .pipe method of an observable.
- interval(100), creates an observable that emits sequential numbers every specified interval (milliseconds by default) of time, starting from 0.
- takeUntil : is an operator that attaches itself to an observable stream and takes values from that stream until the observable that’s passed in as an argument emits a value.
- The of constructor allows for the easy creation of an observable out of a known data source. It takes any number of arguments and returns an observable containing each argument as a separate event.

```Javascript
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
```

#### Scheduler

- A scheduler handles the execution of subscriptions.

### Pros and cons of RxJS

#### Pros

- RxJS is a powerful and popular tool that continues to grow. It has over 2 million dependent repositories on GitHub and over 22 million weekly downloads from NPM. Let’s take a look at some of the reasons why it is so popular:

- **Flexibility**: It can be used with other JavaScript libraries and frameworks.

- **Great API**: With RxJS, you’re able to simplify your workflow with asynchronous dataflows and save time.

- **Optimized**: Many developers have tested and improved it.

- **Extensibility**: It is designed to allow new functionalities.

- **Self-sufficient**: RxJS doesn’t have any third-party dependencies.

- **Helpful community**: Members of the RxJS community help each other solve problems and answer questions.

#### Cons

- Like any other tool, RxJS has a few downsides. Let’s take a look at them:

- **Debugging**: Debugging code with observables isn’t always simple.

- **Data immutability**: Reactive programming works the best when combined with functional programming.

- **tslib dependency**: The only dependency RxJS has is tslib. Details of internal implementation are not always restricted, meaning that you can see some improper usage of access modifiers.
