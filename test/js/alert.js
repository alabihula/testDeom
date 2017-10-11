(function(window, undefined) {
 2     function JsClassName(cfg) {
 3         var config = cfg || {};
 4         this.get = function(n) {
 5             return config[n];
 6         }
 7         this.set = function(n, v) {
 8             config[n] = v;
 9         }
10         this.init();
11     }
12     JsClassName.prototype = {
13         init: function(){},
14         otherMethod: function(){}
15     };
16     window.JsClassName = window.JsClassName || JsClassName;
17 })(window);