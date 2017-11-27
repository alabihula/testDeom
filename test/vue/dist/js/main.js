require.config({
    paths: {
        vue:'vue.min',
        action:'action',
        vueax5:'vue-axios.es5',
        axios:'axios.min',
        promise:'promise.min'
    },
    shim:{
        axios:['promise']
    }
});

require(['promise'],function() {
    require(['action'])
});
