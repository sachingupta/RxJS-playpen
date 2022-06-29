## Asynchronous

Asynchronous means that things can happen independently of the main program flow.

## Javascript

JavaScript is **synchronous** by default and is **single threaded**. This means that code cannot create new threads and run in parallel.

But JavaScript was born inside the browser, its main job, in the beginning, was to respond to user actions, like onClick, onMouseOver, onChange, onSubmit and so on. How could it do this with a synchronous programming model?

The answer was in its environment. The browser provides a way to do it by providing a set of APIs that can handle this kind of functionality.

## callbacks

- You can't know when a user is going to click a button.
- So, you define an event handler for the click event.
- This event handler accepts a function, which will be called when the event is triggered:

```Javascript
document.getElementById('button').addEventListener('click', () => {
  // item clicked
});

```

- Callbacks are used everywhere, not just in DOM events.

```Javascript
setTimeout(() => {
  // runs after 2 seconds
}, 2000);

```

## The Evolution of async programming pattern in JavaScript:

There are the following patterns and data structures currently used in JavaScript:

1. Callback
2. Promise
3. Observer

- Each of them is an extension of the previous one. Let’s review them more in detail.

### Callback - Stay in the line or we will Call you Back

```Javascript
function success(res){
    console.log("API call successful");
}
function fail(err){
    console.log("API call failed");
}
function callApiFoo(success, fail){
    fetch(url)
      .then(res => success(res))
      .catch(err => fail(err));
};

callApiFoo(success, fail);

```

- There is a downside of this approach when one API call depends on the other.
- It will force us to nest these calls. It may be OK if there are only a few such calls, but what happens when we have plenty of them.
- We will have a spaghetti code by nesting each of the callbacks: **callback hell**

```Javascript

callApiFooA((resA)=>{
    callApiFooB((resB)=>{
        callApiFooC((resC)=>{
            console.log(resC);
        }), fail);
    }), fail);
}), fail);

```

- It looks like a disaster, but there is a workaround.

### Promise - I Promise to Call you

- instead of nesting the calls, we can chain them. This is where Promises come to play.
- They are the data structures that can return the result as another Promise

```Javascript
function callApiFooA(){
    return fetch(url); // JS fetch method returns a Promise
}

function callApiFooB(resA){
    return fetch(url+'/'+resA.id);
}

function callApiFooC(resB){
    return fetch(url+'/'+resB.id);
}

callApiFooA()
    .then(callApiFooB)
    .then(callApiFooC)
    .catch(fail)

```

- This is much better and provides a more scalable solution. We can chain into the Promise as many times as we need.
- What happens if one call depends on two or multiple other API calls? Then we want to merge multiple Promises in a single call and post-process them in another call.

```Javascript

function callApiFooA(){
    return fetch(urlA);
}
function callApiFooB(){
    return fetch(urlB);
}
function callApiFooC([resA, resB]){
    return fetch(url+'/'+resA.id+'/'+resB.id);
}
function callApiFooD(resC){
    return fetch(url+'/'+resC.id);
}
Promise.all([callApiFooA(), callApiFooB()])
    .then(callApiFooC)
    .then(callApiFooD)
    .catch(fail)

```

#### async/await

- The keyword async before a function makes the function return a promise:

```Javascript
async function myFunction() {
  return "Hello";
}

```

- The keyword await before a function makes the function wait for a promise:

```Javascript
let value = await promise;
```

- The await keyword can only be used inside an async function.

```Javascript
async function getFile() {
  let myPromise = new Promise(function(resolve) {
    let req = new XMLHttpRequest();
    req.open('GET', "mycar.html");
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        resolve("File not Found");
      }
    };
    req.send();
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

getFile();
```

**Next Opportunity:**

- Promise only ever yield a single value. That makes them useless for handling recurrent events such as mouse clicks or streams of data coming from the server, because we would have to create a promise for each separate event, instead of creating a promise that handles the stream of events as it comes.
- What if may want to mutate the data steam that we pass from one promise call to another.
- For example, we filter one promise response to only get the data with a specific type and then map the filtered data to only retrieve the ids.

### Observer - I will Observe and Call you when something changes

- The observer creates a stream of data changes,
- and other consumers can subscribe to that stream in order to listen and retrieve the latest changes

```Javascript
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/users?per_page=2`;

const users = ajax(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res)
);

```


## Observables compared to promises
Observables are often compared to promises. Here are some key differences:

- Observables are declarative; computation does not start until subscription. Promises execute immediately on creation. This makes observables useful for defining recipes that can be run whenever you need the result.

- Observables provide many values. Promises provide one. This makes observables useful for getting multiple values over time.

- Observables differentiate between chaining and subscription. Promises only have .then() clauses. This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

- Observables subscribe() is responsible for handling errors. Promises push errors to the child promises. This makes observables useful for centralized and predictable error handling.