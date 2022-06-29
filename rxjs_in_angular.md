## RxJS/Observables in Angular

### Async pipe

- The AsyncPipe subscribes to an observable or promise and returns the latest value it has emitted.
- When a new value is emitted, the pipe marks the component to be checked for changes.

```Javascript
@Component({
  selector: 'async-observable-pipe',
  template: `<div><code>observable|async</code>:
       Time: {{ time | async }}</div>`
})
export class AsyncObservablePipeComponent {
  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
```

### HTTP

- Angular's HttpClient returns observables from HTTP method calls.
- For instance, http.get('/api') returns an observable.
- This provides several advantages over promise-based HTTP API

> - Observables do not mutate the server response (as can occur through chained .then() calls on promises). Instead, you can use a series of operators to transform values as needed.

> - HTTP requests are cancellable through the unsubscribe() method

> - Requests can be configured to get progress event updates

> - Failed requests can be retried easily

### Router

- Router.events provides events as observables.
- You can use the filter() operator from RxJS to look for events of interest, and subscribe to them in order to make decisions based on the sequence of events in the navigation process. Here's an example:

```Javascript
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-routable',
  template: 'Routable1Component template'
})
export class Routable1Component implements OnInit {

  navStart: Observable<NavigationStart>;

  constructor(router: Router) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.navStart.subscribe(() => console.log('Navigation Started!'));
  }
}
```

### Reactive forms

- Reactive forms have properties that use observables to monitor form control values.
- The FormControl properties valueChanges and statusChanges contain observables that raise change events.
- Subscribing to an observable form-control property is a way of triggering application logic within the component class. For example:

```Javascript
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'my-component',
  template: 'MyComponent Template'
})
export class MyComponent implements OnInit {
  nameChangeLog: string[] = [];
  heroForm!: FormGroup;

  ngOnInit() {
    this.logNameChange();
  }
  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl?.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}
```
