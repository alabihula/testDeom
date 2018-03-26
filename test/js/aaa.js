//1
function A() {
    this.name = 'a';
    this.color = ['red','green'];
}
function B() {

}
B.prototype = new A();

var b1 = new B();
var b2 = new B();
console.log(b1.name);
console.log(b2.name);
console.log(b1.color);
console.log(b2.color);
b1.name = 'b';
b1.color.push('black');
console.log(JSON.stringify(b1));
console.log(JSON.stringify(b2));
console.log(b2.name);
console.log(b1.color);
console.log(b2.color);

//2
for(var i = 0; i< 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

//3
var obj = {
    _name:'Joy',
    getName:function() {
        return this._name;
    }
}
var getName = obj.getName;
console.log(getName());
console.log(obj.getName());

//4

//a.js
import {bar} from './b.js';
console.log('ajs');
var k = 1;
foo();
export {k}
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}


//b.js
import {foo,k} from './a.js';
console.log('bjs');

export function bar() {
  console.log('bar',k);
  if (Math.random() > 0.5) {
    foo();
  }
}

//babel a.js
//输出结果