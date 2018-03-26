import {bar} from './b.js';
console.log('a---1');
var k = 1;
foo();
export {k}
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}
