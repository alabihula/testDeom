import {bar} from './b.js';
console.log('a---1');
foo();
export function foo() {
  // 执行时第一行输出foo
  console.log('a---2');
  console.log('foo');
  // 到 b.js 执行 bar
  console.log('a---3');
  bar();
  console.log('执行完毕');
}
