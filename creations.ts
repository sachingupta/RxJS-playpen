import {
  fromEvent,
  ReplaySubject,
  map,
  Observable,
  of,
  Subject,
  BehaviorSubject,
} from 'rxjs';

export function ObservableCreation() {
  // 1. creating an observable and observer using subscribe
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log('just before subscribe');
  observable.subscribe({
    next(x) {
      console.log('got value ' + x);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    },
  });
  console.log('just after subscribe');
}

// 2. Event listner
export function ObservableCreationFromEvent() {
  document.addEventListener('click', () =>
    console.log('using add eventListner: Clicked!')
  );

  fromEvent(document, 'click').subscribe(() =>
    console.log('using rxJs: Clicked!')
  );
}

export function ObservableCreationOf() {
  of('World')
    .pipe(map((name) => `Hello, ${name}!`))
    .subscribe(console.log);
}

export function subjectExample() {
  const subject = new BehaviorSubject(0);

  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);

  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });

  subject.next(5);
}
