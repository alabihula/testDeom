import {foo} from './a.js';
console.log('b---1');

export function bar() {
  // 执行时，第二行输出bar
  console.log('b---2');
  console.log('bar');
  // 递归执行foo，一旦随机数
  // 小于等于0.5，就停止执行
  if (Math.random() > 0.5) {
    foo();
  }
}