import { fromEvent, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';

/**
 * 
 * Typically, a type-ahead has to do a series of separate tasks:

- Listen for data from an input
- Trim the value (remove whitespace) and make sure it's a minimum length
- Debounce (so as not to send off API requests for every keystroke, but instead wait for a break in keystrokes)
- Don't send a request if the value stays the same (rapidly hit a character, then backspace, for instance)
- Cancel ongoing AJAX requests if their results will be invalidated by the updated results
 */

const searchBox = document.getElementById('search-box') as HTMLInputElement;

const typeahead = fromEvent(searchBox, 'input').pipe(
  map((e) => (e.target as HTMLInputElement).value),
  filter((text) => text.length > 2),
  debounceTime(10),
  distinctUntilChanged(),
  switchMap((searchTerm) => ajax(`/api/endpoint?search=${searchTerm}`))
);

typeahead.subscribe((data) => {
  // Handle the data from the API
});
