jQuery(document).ready(function(){
    console.log('network-home.js file loaded')

    makeRequest('POST', 'network/home',{'id': 'test'} )
        .done(function(data) {

            "use strict";
            let obj = dt_network_home
            let chartDiv = jQuery('#chart')
            chartDiv.empty().html(`Home`)

            console.log( data )
            console.log(obj)
        })
})