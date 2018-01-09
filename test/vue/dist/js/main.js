require.config({
    paths: {
        vue:'vue.min',
        action:'action',
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
