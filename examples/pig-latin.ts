import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

/**
 * Pig Latin is a silly pseudo language based on English. Translating an English sentence into Pig Latin is simple. 
 * Split each sentence into words and put each word through the following modifications:

1. Remove the first letter of each word: “Pig Latin” becomes “ig atin” (exception: ignore single-letter words)

2. Add the first letter removed in the previous step plus “ay” to the end of the word: "ig-pay atin-lay"
 */

function pigLatinify(word) {
  // Handle single-letter case and empty strings
  if (word.length < 2) {
    return word;
  }
  return word.slice(1) + '-' + word[0].toLowerCase() + 'ay';
}

export function pigLating() {
  let input = document.querySelector<HTMLElement>('#pig-latin-input');
  let output = document.querySelector<HTMLElement>('#pig-latin-output');
  let keyUp$ = fromEvent(input, 'keyup')
    .pipe(
      map((event: any) => event.target.value),
      map((wordString) => wordString.split(/\s+/)),
      map((wordArray) => wordArray.map(pigLatinify))
    )
    .subscribe((translated) => {
      console.log(translated);
      output.innerText = translated;
    });
}
