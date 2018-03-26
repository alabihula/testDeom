import {foo,k} from './a.js';
console.log('b---1');

export function bar() {
  console.log('bar',k);
  if (Math.random() > 0.5) {
    foo();
  }
}