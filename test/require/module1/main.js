require.config({
    paths: {
        jquery: '../commons/js/jquery-1.12.4.min',
        vue: '../commons/js/vue',
        m1Normal:'m1.normal',
        m1Sub:'m1.sub',
        m1Alert:'m1.alert'
    }
});
 
require(['m1Alert'],function(alert,normal) {

});


