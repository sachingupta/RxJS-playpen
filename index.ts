import './style.css';

import { of, map, Observable, fromEvent } from 'rxjs';
import {
  ObservableCreation,
  ObservableCreationFromEvent,
  ObservableCreationOf,
} from './creations';
import { ThrottleExample, OperatorsExample } from './operators';

function executer(id: number) {
  switch (id) {
    case 1:
      ObservableCreation();
    case 2:
      ObservableCreationFromEvent();
    case 3:
      ObservableCreationOf();
    case 4:
      ThrottleExample();
    case 100:
      OperatorsExample();
  }
}

executer(100);

// Open the console in the bottom right to see results.
