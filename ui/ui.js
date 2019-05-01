jQuery(document).ready(function() {
    if( ! window.location.hash || '#network_home' === window.location.hash) {
        show_network_home()
    }
    if('#sites' === window.location.hash) {
        show_sites_list()
    }
    if( '#mapping_view' === window.location.hash) {
        page_mapping_view()
    }
    if('#mapping_list' === window.location.hash) {
        page_mapping_list()
    }
})

/**
 * Home Page
 */
function show_network_home(){
    console.log(wpApiNetworkDashboard)
    "use strict";
    let page = wpApiNetworkDashboard
    let chartDiv = jQuery('#chart')
    chartDiv.empty().html(`
        <span class="section-header">`+ page.translations.sm_title +`</span>
        
        <hr style="max-width:100%;">
        <div id="home-map-div" style="width: 100%;max-height: 600px;height: 100vh;"></div>
        
        <hr style="max-width:100%;">
        
        <div class="grid-x grid-padding-x grid-padding-y">
            <div class="cell">
            <span class="section-header">Active Totals for All Sites </span><br>
                <div class="grid-x callout">
                    <div class="medium-3 cell center">
                    <h4>Contacts<br><span class="total_contacts">${page.global.contacts.total}</span></h4>
                    </div>
                    <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                    <h4>Groups<br><span class="total_groups">${page.global.groups.total}</span></h4>
                    </div>
                    <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                    <h4>Users<br><span id="total_users">${page.global.users.total}</span></h4>
                    </div>
                    <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                    <h4>Countries<br><span id="total_users">${page.global.locations.total_countries}</span></h4>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
            <div class="cell">
                <span class="section-header">New Contacts </span><br>
                <button class="button hollow new-contact-buttons" id="c-7-days" onclick="load_line_chart( 'global-contacts-chart-div', null, 'days', 7 );set_buttons('new-contact-buttons', 'c-7-days' )">Last 7 days</button> 
                <button class="button new-contact-buttons" id="c-30-days"  onclick="load_line_chart( 'global-contacts-chart-div', null, 'days', 30 );set_buttons('new-contact-buttons', 'c-30-days' )">Last 30 days</button> 
                <button class="button hollow new-contact-buttons" id="c-60-days"  onclick="load_line_chart( 'global-contacts-chart-div', null, 'days', 60 );set_buttons('new-contact-buttons', 'c-60-days' )">Last 60 days</button> 
                <button class="button hollow new-contact-buttons" id="c-12-months"  onclick="load_line_chart( 'global-contacts-chart-div', null, 'months', 12 );set_buttons('new-contact-buttons', 'c-12-months' )">Last 12 Months</button>
                <button class="button hollow new-contact-buttons" id="c-24-months"  onclick="load_line_chart( 'global-contacts-chart-div', null, 'months', 24 );set_buttons('new-contact-buttons', 'c-24-months' )">Last 24 Months</button>
                <div id="global-contacts-chart-div" style="height:500px;width:100%;"></div>
            </div>
        </div>
        
        <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
            <div class="cell">
                <span class="section-header">New Groups </span><br>
                <button class="button hollow new-group-buttons" id="g-7-days" onclick="load_line_chart( 'global-groups-chart-div', null, 'days', 7 );set_buttons('new-group-buttons', 'g-7-days' )">Last 7 days</button> 
                <button class="button new-group-buttons" id="g-30-days"  onclick="load_line_chart( 'global-groups-chart-div', null, 'days', 30 );set_buttons('new-group-buttons', 'g-30-days' )">Last 30 days</button> 
                <button class="button hollow new-group-buttons" id="g-60-days"  onclick="load_line_chart( 'global-groups-chart-div', null, 'days', 60 );set_buttons('new-group-buttons', 'g-60-days' )">Last 60 days</button> 
                <button class="button hollow new-group-buttons" id="g-12-months"  onclick="load_line_chart( 'global-groups-chart-div', null, 'months', 12 );set_buttons('new-group-buttons', 'g-12-months' )">Last 12 Months</button>
                <button class="button hollow new-group-buttons" id="g-24-months"  onclick="load_line_chart( 'global-groups-chart-div', null, 'months', 24 );set_buttons('new-group-buttons', 'g-24-months' )">Last 24 Months</button>
                <div id="global-groups-chart-div" style="height:500px;width:100%;"></div>
            </div>
        </div>
        
        `);

    load_points_map( 'home-map-div' )

    load_line_chart( 'global-contacts-chart-div', null, 'days', 30 )
    set_buttons('new-contact-buttons', 'c-30-days' )

    load_line_chart( 'global-groups-chart-div', null, 'days', 30 )
    set_buttons('new-group-buttons', 'g-30-days' )

}


/**
 * Single Snapshots Page
 */
function show_network_site( id, name ) {
    console.log(wpApiNetworkDashboard)
    "use strict";
    if ( id == undefined ) {
        show_network_home()
        return
    }

    let data = wpApiNetworkDashboard.sites[id]

    let chartDiv = jQuery('#chart')
    chartDiv.empty().html(`
                <span class="section-header">${name}</span>
                <span style="font-size:.5em;color:lightslategrey;float:right;" onclick="jQuery('#site-id').show()">show id<span id="site-id" style="display:none;"><br>${id}</span></span>
                <hr style="max-width:100%;">
                
                <br>
                <span class="section-header">Active Snapshot</span>
                <div class="grid-x grid-padding-x grid-padding-y">
                    <div class="cell">
                        <div class="grid-x callout">
                            <div class="medium-4 cell center">
                            <h4>Contacts<br><span class="total_contacts">${data.contacts.current_state.status.active}</span></h4>
                            </div>
                            <div class="medium-4 cell center" style="border-left: 1px solid #ccc">
                            <h4>Groups<br><span class="total_groups">${data.groups.current_state.all}</span></h4>
                            </div>
                            <div class="medium-4 cell center" style="border-left: 1px solid #ccc">
                            <h4>Users<br><span id="total_users">${data.users.current_state.total_users}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y">
                    <div class="cell medium-6">
                        Generations<br>
                        <button class="button generation-buttons" id="g-baptisms" onclick="load_gen_chart( 'generations-div', '${id}', 'g-baptisms' );set_buttons('generation-buttons', 'g-baptisms' )">Baptisms</button> 
                        <button class="button hollow generation-buttons" id="g-groups"  onclick="load_gen_chart( 'generations-div', '${id}', 'g-groups' );set_buttons('generation-buttons', 'g-groups' )">Groups</button> 
                        <button class="button hollow generation-buttons" id="g-churches"  onclick="load_gen_chart( 'generations-div', '${id}', 'g-churches' );set_buttons('generation-buttons', 'g-churches' )">Churches</button> 
                        <div id="generations-div" style="height:300px;width:100%;"></div>
                    </div>
                    <div class="cell medium-6">
                        Location<br>
                        <div id="site-map-div" style="height:300px;width:100%;"></div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        <br><br>
                        <hr>
                    </div>
                </div>
                
                <!-- CONTACTS -->
                <span class="section-header">Contacts</span>
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        
                        <div class="grid-x callout">
                            <div class="medium-3 cell center">
                            <h4>Active Contacts<br><span class="total_contacts">${data.contacts.current_state.status.active}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Paused Contacts<br><span class="total_groups">${data.contacts.current_state.status.paused}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Closed Contacts<br><span id="total_users">${data.contacts.current_state.status.closed}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Total Contacts<br><span id="total_users">${data.contacts.current_state.all_contacts}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        New Contacts <br>
                        <button class="button hollow new-contact-buttons" id="c-7-days" onclick="load_line_chart( 'line-chart-div', '${id}', 'days', 7 );set_buttons('new-contact-buttons', 'c-7-days' )">Last 7 days</button> 
                        <button class="button new-contact-buttons" id="c-30-days"  onclick="load_line_chart( 'line-chart-div', '${id}', 'days', 30 );set_buttons('new-contact-buttons', 'c-30-days' )">Last 30 days</button> 
                        <button class="button hollow new-contact-buttons" id="c-60-days"  onclick="load_line_chart( 'line-chart-div', '${id}', 'days', 60 );set_buttons('new-contact-buttons', 'c-60-days' )">Last 60 days</button> 
                        <button class="button hollow new-contact-buttons" id="c-12-months"  onclick="load_line_chart( 'line-chart-div', '${id}', 'months', 12 );set_buttons('new-contact-buttons', 'c-12-months' )">Last 12 Months</button>
                        <button class="button hollow new-contact-buttons" id="c-24-months"  onclick="load_line_chart( 'line-chart-div', '${id}', 'months', 24 );set_buttons('new-contact-buttons', 'c-24-months' )">Last 24 Months</button>
                        <div id="line-chart-div" style="height:500px;width:100%;"></div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell medium-10">
                        Follow-up Funnel
                        <div id="follow-up-funnel-chart-div" style="height:400px;width:100%;"></div>
                    </div>
                    <div class="cell medium-2 center" style="border-left: 1px solid #ccc">
                        <div class="grid-x grid-margin-y">
                            <div class="cell" style="padding-top:1.2em;"><h4>On-Going Meetings<br><span>${data.contacts.follow_up_funnel.ongoing_meetings}</span></h4></div>
                            <div class="cell" style="padding-top:1.2em;"><h4>Coaching<br><span>${data.contacts.follow_up_funnel.coaching}</span></h4></div>
                            <div class="cell" style="padding-top:1.2em;"><h4>Baptized<br><span>${data.contacts.baptisms.current_state.all_baptisms}</span></h4></div>
                        </div>
                    </div>
                </div>
                
               
                <div class="grid-x grid-padding-y grid-margin-y grid-margin-y">
                    <div class="cell">
                        <br><br>
                        <hr>
                    </div>
                </div>
                
                <!-- GROUPS -->
                <span class="section-header">Groups</span>
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        <div class="grid-x callout">
                            <div class="medium-3 cell center">
                            <h4>Active Groups<br><span class="total_contacts">${data.groups.current_state.all}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Pre-Group<br><span class="total_groups">${data.groups.current_state.active.pre_group}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Group<br><span id="total_users">${data.groups.current_state.active.group}</span></h4>
                            </div>
                            <div class="medium-3 cell center" style="border-left: 1px solid #ccc">
                            <h4>Church<br><span id="total_users">${data.groups.current_state.active.church}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        New Groups <br>
                        <button class="button hollow new-group-buttons" id="g-7-days" onclick="load_line_chart( 'group-line-chart-div', '${id}', 'days', 7 );set_buttons('new-group-buttons', 'g-7-days' )">Last 7 days</button> 
                        <button class="button new-group-buttons" id="g-30-days"  onclick="load_line_chart( 'group-line-chart-div', '${id}', 'days', 30 );set_buttons('new-group-buttons', 'g-30-days' )">Last 30 days</button> 
                        <button class="button hollow new-group-buttons" id="g-60-days"  onclick="load_line_chart( 'group-line-chart-div', '${id}', 'days', 60 );set_buttons('new-group-buttons', 'g-60-days' )">Last 60 days</button> 
                        <button class="button hollow new-group-buttons" id="g-12-months"  onclick="load_line_chart( 'group-line-chart-div', '${id}', 'months', 12 );set_buttons('new-group-buttons', 'g-12-months' )">Last 12 Months</button>
                        <button class="button hollow new-group-buttons" id="g-24-months"  onclick="load_line_chart( 'group-line-chart-div', '${id}', 'months', 24 );set_buttons('new-group-buttons', 'g-24-months' )">Last 24 Months</button>
                        <div id="group-line-chart-div" style="height:500px;width:100%;"></div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    
                    <div class="cell medium-6">
                        Health Metrics
                        <div id="health-bar-chart-div" style="height:500px;width:100%;"></div>
                    </div>
                    <div class="cell medium-6">
                        Chart Funnel
                        <div id="church-funnel-chart-div" style="height:500px;width:100%;"></div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        <br><br>
                        <hr>
                    </div>
                </div>
                
                <!-- USERS -->
                
                <span class="section-header">Users</span>
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        <div class="grid-x callout">
                            <div class="medium-3 cell center">
                            <h4>Total Users<br><span class="total_contacts">${data.users.current_state.total_users}</span></h4>
                            </div>
                            <div class="medium-2 cell center" style="border-left: 1px solid #ccc">
                            <h4>Responders<br><span id="total_users">${data.users.current_state.roles.responders}</span></h4>
                            </div>
                            <div class="medium-2 cell center" style="border-left: 1px solid #ccc">
                            <h4>Dispatchers<br><span id="total_users">${data.users.current_state.roles.dispatchers}</span></h4>
                            </div>
                            <div class="medium-2 cell center" style="border-left: 1px solid #ccc">
                            <h4>Multipliers<br><span class="total_groups">${data.users.current_state.roles.multipliers}</span></h4>
                            </div>
                            <div class="medium-2 cell center" style="border-left: 1px solid #ccc">
                            <h4>Admins<br><span id="total_users">${data.users.current_state.roles.admins}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell">
                        User Login Activity <br>
                        <button class="button hollow active-user-buttons" id="ua-7-days" onclick="load_line_chart( 'user-activity-chart-div', '${id}', 'days', 7 );set_buttons('active-user-buttons', 'ua-7-days' )">Last 7 days</button> 
                        <button class="button active-user-buttons" id="ua-30-days" onclick="load_line_chart( 'user-activity-chart-div', '${id}', 'days', 30 );set_buttons('active-user-buttons', 'ua-30-days' )">Last 30 days</button> 
                        <button class="button hollow active-user-buttons" id="ua-60-days" onclick="load_line_chart( 'user-activity-chart-div', '${id}', 'days', 60 );set_buttons('active-user-buttons', 'ua-60-days' )">Last 60 days</button> 
                        <button class="button hollow active-user-buttons" id="ua-12-months" onclick="load_line_chart( 'user-activity-chart-div', '${id}', 'months', 12 );set_buttons('active-user-buttons', 'ua-12-months' )">Last 12 Months</button>
                        <button class="button hollow active-user-buttons" id="ua-24-months" onclick="load_line_chart( 'user-activity-chart-div', '${id}', 'months', 24 );set_buttons('active-user-buttons', 'ua-24-months' )">Last 24 Months</button>
                        <div id="user-activity-chart-div" style="height:500px;width:100%;"></div>
                    </div>
                </div>
                
                <div class="grid-x grid-padding-x grid-padding-y grid-margin-y">
                    <div class="cell medium-6">
                        Users Active in the Last 30 Days
                        <div id="system-engagement-pie-chart-div" style="height:400px;width:100%;"></div>
                    </div>
                    <div class="cell medium-6">
                        
                    </div>
                </div>
                        
                `);

    load_line_chart( 'line-chart-div', id, 'days', 30 )
    set_buttons('new-contact-buttons', 'c-30-days' )

    load_points_map( 'site-map-div', id )
    load_gen_chart( 'generations-div', id, 'g-baptisms' )

    load_line_chart( 'group-line-chart-div', id, 'days', 30 )
    set_buttons('new-group-buttons', 'g-30-days' )
    load_funnel_chart( 'follow-up-funnel-chart-div', id )

    load_bar_chart( 'health-bar-chart-div', id )
    load_funnel_chart( 'church-funnel-chart-div', id )

    load_pie_chart( 'system-engagement-pie-chart-div', id )

    load_line_chart( 'user-activity-chart-div', id, 'days', 30 )
    set_buttons('active-user-buttons', 'ua-30-days' )

    jQuery('#metrics-sidemenu').foundation('down', jQuery('#sites-list'));
}

/**
 * List of Sites Page
 */
function show_sites_list() {
    "use strict";
    let page = wpApiNetworkDashboard
    let chartDiv = jQuery('#chart')
    chartDiv.empty().html(`
        <span class="section-header">`+ page.translations.sm_title +`</span>
        
        <hr style="max-width:100%;">
        
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <div id="list-sites"></div>
            </div>
        </div>
        
        `);

    jQuery(document).ready(function() {
        load_site_lists( 'list-sites' )
    })
}

function load_line_chart( div, id, type, numberOfElements ) {
    if ( 'group-line-chart-div' === div ) {
        switch ( type ) {
            case 'days':
                line_chart( div, wpApiNetworkDashboard.sites[id].groups.added.sixty_days, numberOfElements )
                break;
            case 'months':
                line_chart( div, wpApiNetworkDashboard.sites[id].groups.added.twenty_four_months, numberOfElements, 'month' )
                break;
        }
    } else if ( 'line-chart-div' === div ) {
        switch ( type ) {
            case 'days':
                line_chart( div, wpApiNetworkDashboard.sites[id].contacts.added.sixty_days, numberOfElements )
                break;
            case 'months':
                line_chart( div, wpApiNetworkDashboard.sites[id].contacts.added.twenty_four_months, numberOfElements, 'month' )
                break;
        }
    } else if ( 'user-activity-chart-div' === div ) {
        switch ( type ) {
            case 'days':
                line_chart( div, wpApiNetworkDashboard.sites[id].users.login_activity.sixty_days, numberOfElements )
                break;
            case 'months':
                line_chart( div, wpApiNetworkDashboard.sites[id].users.login_activity.twenty_four_months, numberOfElements, 'month')
                break;
        }
    } else if ( 'global-contacts-chart-div' === div ) {
        switch ( type ) {
            case 'days':
                line_chart( div, wpApiNetworkDashboard.global.contacts.added.sixty_days, numberOfElements )
                break;
            case 'months':
                line_chart( div, wpApiNetworkDashboard.global.contacts.added.twenty_four_months, numberOfElements, 'month' )
                break;
        }
    } else if ( 'global-groups-chart-div' === div ) {
        switch ( type ) {
            case 'days':
                line_chart( div, wpApiNetworkDashboard.global.groups.added.sixty_days, numberOfElements )
                break;
            case 'months':
                line_chart( div, wpApiNetworkDashboard.global.groups.added.twenty_four_months, numberOfElements, 'month' )
                break;
        }
    }
}

function set_buttons( buttonClassName, id ) {
    jQuery('.'+buttonClassName+'').addClass('hollow')
    jQuery('#'+id+'').removeClass('hollow')
}

function line_chart( div, dates, numberOfElements, type  ) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create( div , am4charts.XYChart);

    chart.paddingRight = 30;
    chart.paddingBottom = 50;

    chart.data = dates.slice(0, numberOfElements);

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    if ( 'month' === type ) {
        dateAxis.tooltipDateFormat = "MMM YYYY";
    }


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";

    series.tooltip.pointerOrientation = "vertical";
    series.strokeWidth = 6;
    series.fillOpacity = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

}

function load_gen_chart( div, id, type ) {
    if ( 'generations-div' === div ) {
        switch ( type ) {
            case 'g-baptisms':
                bar_chart( 'generations-div', wpApiNetworkDashboard.sites[id].contacts.baptisms.generations )
                break;
            case 'g-coaching':
                bar_chart( 'generations-div', wpApiNetworkDashboard.sites[id].contacts.coaching.generations )
                break;
            case 'g-groups':
                bar_chart( 'generations-div', wpApiNetworkDashboard.sites[id].groups.group_generations )
                break;
            case 'g-churches':
                bar_chart( 'generations-div', wpApiNetworkDashboard.sites[id].groups.church_generations )
                break;
        }

    }
}

function load_bar_chart( div, id ) {
    if ( 'health-bar-chart-div' ) {
        health_stacked_bar_chart( 'health-bar-chart-div', wpApiNetworkDashboard.sites[id].groups.health )
    }
}

function health_stacked_bar_chart( div, values ) {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create( div, am4charts.XYChart);

    chart.data = values;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {

        // Set up series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "category";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{categoryX}[/]\n[font-size:14px]{name}: {valueY}";

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.5;

        return series;
    }
    createSeries('practicing', 'Practicing')
    createSeries('not_practicing', 'Not Practicing')


    // Legend
    chart.legend = new am4charts.Legend();
}

function bar_chart( div, values ) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create( div, am4charts.XYChart);

    // Add data
    chart.data = values;

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "label";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
}

function load_pie_chart( div, id ) {
    if ( 'types-pie-chart-div' === div ) {
        pie_chart( 'types-pie-chart-div', wpApiNetworkDashboard.sites[id].groups.by_types )
    } else if ( 'system-engagement-pie-chart-div' === div ) {
        pie_chart( 'system-engagement-pie-chart-div', wpApiNetworkDashboard.sites[id].users.last_thirty_day_engagement )
    }
}

function pie_chart( div, values ) {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create( div, am4charts.PieChart);

    chart.data = values

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "label";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.stroke = am4core.color("#ffffff");
    pieSeries.slices.template.strokeWidth = 1;

    chart.innerRadius = am4core.percent(25);

    chart.legend = new am4charts.Legend();
}

function load_funnel_chart( div, id ) {
    if ( 'church-funnel-chart-div' === div ) {
        funnel_chart( div, wpApiNetworkDashboard.sites[id].groups.by_types, "vertical", true )
    } else if ( 'follow-up-funnel-chart-div' === div ) {
        funnel_chart( div, wpApiNetworkDashboard.sites[id].contacts.follow_up_funnel.funnel, "horizontal" )
    }
}

function funnel_chart( div, chartData, direction, labels ) {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create( div, am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = chartData

    var series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = "value";
    series.dataFields.category = "name";

    if ( true === labels ) {
        series.alignLabels = true;
        series.labelsContainer.paddingLeft = 15;
        series.labelsContainer.width = 200;
    } else {
        series.labels.template.disabled = true;
        series.ticks.template.disabled = true;
    }

    series.orientation = direction;
    //series.bottomRatio = 1;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "center";
    chart.legend.valign = "bottom";
    chart.legend.margin(5,5,20,5);
}

function load_points_map( div, id ) {
    if ( 'site-map-div' === div ) {
        // used on the single site page

        let locations = []
        jQuery.each( wpApiNetworkDashboard.locations_list.list, function(i, v) {
            if ( v.level === 'country' && v[id] ) {
                locations.push( v )
            }
        } )

        points_map_chart( div, locations )

    } else if ( 'home-map-div' === div ) {
        //build locations list
        let locations = []
        jQuery.each( wpApiNetworkDashboard.locations_list.list, function(i, v) {
            if ( v.level === 'country' ) {
                locations.push( v )
            }
        } )

        points_map_chart( div, locations )
    }
}

function points_map_chart( div, values ) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Create map instance
    let chart = am4core.create( div, am4maps.MapChart);

    // Create map polygon series
    chart.geodata = am4geodata_worldLow;

    chart.projection = new am4maps.projections.Miller();
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;


    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = values;

    let imageSeriesTemplate = imageSeries.mapImages.template;
    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 13;
    circle.fill = am4core.color("#8bc34a");
    circle.stroke = am4core.color("#8bc34a");
    circle.strokeWidth = 2;
    circle.nonScaling = true;

    if ( 'site-map-div' === div ) {
        circle.tooltipText = "[bold]{name}[/] ";
    } else if ( 'home-map-div' === div ) {
        circle.tooltipText = "[bold]{name}[/] \n {sites}";
    }

    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";
    imageSeriesTemplate.nonScaling = true;

}


/**
 * Site Lists Page
 * @param div
 */
function load_site_lists( div ) {
    let list = jQuery('#'+div+'')
    list.empty().html(`
            <table id="site-table" class="display" data-order='[[ 1, "asc" ]]' data-page-length='25'>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contacts</th>
                    <th>Groups</th>
                    <th>Users</th>
                    <th>Timestamp</th>
                    <th>Visit</th>
                </thead>
                </table>
        `)


    let table = jQuery('#site-table').DataTable( {
        data: wpApiNetworkDashboard.sites_list,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'contacts' },
            { data: 'groups' },
            { data: 'users' },
            { data: 'date' },
            { data: null,"defaultContent":"<button class='button small' style='margin:0' >View</button>"}
        ],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ]
    });

    jQuery('#site-table tbody').on( 'click', "button", function ( event ) {
        jQuery(this).parent().append( wpApiNetworkDashboard.spinner_large )
        var data = table.row( jQuery(this).parents('tr') ).data();
        show_network_site( data['id'], data['name'] )
        window.scrollTo(0, 0);
    })
}

function page_mapping_view() {
    console.log(DRILLDOWNDATA)
    "use strict";
    let chartDiv = jQuery('#chart')
    chartDiv.empty().html(`
        
        <div class="grid-x grid-margin-y">
            <div class="cell medium-6" id=""></div>
            <div class="cell medium-6" style="text-align:right;">
               <strong id="section-title" style="font-size:2em;"></strong><br>
                
            </div>
        </div>
        
        <hr style="max-width:100%;">
        
        
        
       <!-- Map -->
       <div class="grid-x grid-margin-x">
            <div class="cell medium-10">
                <div id="map" style="width: 100%;max-height: 700px;height: 100vh;vertical-align: text-top;"></div>
            </div>
            <div class="cell medium-2 left-border-grey">
                <div class="grid-y">
                    <div class="cell" style="overflow-y: scroll; height:700px; padding:0 .4em;" id="child-list-container">
                        <div id="minimap"></div><br><br>
                        <div class="button-group expanded stacked" id="data-type-list">
                         </div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr style="max-width:100%;">
        
        <span style="float:right;font-size:.8em;"><a onclick="DRILLDOWN.get_drill_down('map_chart_drilldown')" >return to top level</a></span>
        
        <br>
        `);


    // mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNjaGFzbSIsImEiOiJjajZyc2poNmEwZTdqMnFuenB0ODI5dWduIn0.6wKrDTf2exQJY-MY7Q1kRQ';
    // let map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v9'
    // });
    // mapboxgl.workerUrl = "https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl-csp-worker.js"

    // mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNjaGFzbSIsImEiOiJjanNsczFtdDQwM3djNDRuMG56eXJvcDRmIn0.vdBOPuShPP3WS4oEbCcDjA';
    // let map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/light',
    //     center: [10,36.3333], // starting position [lng, lat]
    //     zoom: 5 // starting zoom
    // });


}



function page_mapping_list( geonameid ) {
    "use strict";
    let chartDiv = jQuery('#chart')
    chartDiv.empty().html(`
        <div class="grid-x grid-margin-x">
            <div class="cell auto" id="level_up"></div>
            <div class="cell small-1">
                <span id="spinner" style="display:none;" class="float-right"></span>
            </div>
        </div>
        
        <hr style="max-width:100%; margin: .4em auto;">
        
        <div id="page-header" style="float:left;">
            <strong id="section-title" style="font-size:1.5em;"></strong><br>
            <span id="current_level"></span>
        </div>
        
        <div id="location_list"></div>
        
        <hr style="max-width:100%;">
        
        <br>
        <style> /* @todo move these definitions to site style sheet. */
            #page-header {
                position:absolute;
            }
            @media screen and (max-width : 640px){
                #page-header {
                    position:relative;
                    text-align: center;
                    width: 100%;
                }
            }
           
        </style>
        `);

    if ( geonameid ) {
        network_geoname_list( geonameid )
    } else {
        network_location_list()
    }
}

function network_location_list() {
    DRILLDOWN.show_spinner()

    let map_data = wpApiNetworkDashboard.locations_list.list

    // Place Title
    let title = jQuery('#section-title')
    title.empty().html(`Network Locations`)

    // Build List
    let locations = jQuery('#location_list')
    locations.empty()

    let html = `<table id="country-list-table" class="display">`

    // Header Section
    html += `<thead><tr><th>Name</th><th>Population</th><th>Contacts</th><th>Groups</th><th>Users</th>`
    html += `</tr></thead>`
    // End Header Section

    // Children List Section

    let sorted_children =  _.sortBy(map_data, [function(o) { return o.name; }]);

    html += `<tbody>`

    jQuery.each( sorted_children, function(i, v) {
        if ( v.level === 'country' ) {
            let population = v.population_formatted

            html += `<tr>
                    <td><strong><a onclick="network_geoname_list(${v.geonameid})">${v.name}</a></strong></td>
                    <td>${population}</td>`

            if ( v.contacts > 0 ) {
                html += `<td><strong>${v.contacts}</strong></td>`
            } else {
                html += `<td class="grey">0</td>`
            }

            if ( v.groups > 0 ) {
                html += `<td><strong>${v.groups}</strong></td>`
            } else {
                html += `<td class="grey">0</td>`
            }

            if ( v.users > 0 ) {
                html += `<td><strong>${v.users}</strong></td>`
            } else {
                html += `<td class="grey">0</td>`
            }

            html += `</tr>`
        }
    })
    html += `</tbody>`
    // end Child section

    html += `</table>`
    locations.append(html)

    jQuery('#country-list-table').DataTable({
        "paging":   false
    });

    DRILLDOWN.hide_spinner()
}

function network_geoname_list( geonameid ) {
    DRILLDOWN.show_spinner()

    // Find data source before build
    if ( DRILLDOWNDATA.data[geonameid] === undefined ) {
        let rest = DRILLDOWNDATA.settings.endpoints.get_map_by_geonameid_endpoint

        jQuery.ajax({
            type: rest.method,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { 'geonameid': geonameid } ),
            dataType: "json",
            url: DRILLDOWNDATA.settings.root + rest.namespace + rest.route,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', rest.nonce );
            },
        })
            .done( function( response ) {
                DRILLDOWNDATA.data[geonameid] = response
                build_geoname_list( DRILLDOWNDATA.data[geonameid] )
            })
            .fail(function (err) {
                console.log("error")
                console.log(err)
                DRILLDOWN.hide_spinner()
            })

    } else {
        build_geoname_list( DRILLDOWNDATA.data[geonameid] )
    }

    // build list
    function build_geoname_list( map_data ) {
        let network_data = wpApiNetworkDashboard.locations_list.list

        // Level Up
        let level_up = jQuery('#level_up')
        if ( map_data.self.level === 'country' ) {
            level_up.empty().html(`<button class="button small" onclick="network_location_list()">Level Up</button>`)
        } else {
            level_up.empty().html(`<button class="button small" onclick="network_geoname_list(${map_data.parent.geonameid})">Level Up</button>`)
        }


        // Place Title
        let title = jQuery('#section-title')
        title.empty().html(map_data.self.name)

        // Population Division and Check for Custom Division
        let pd_settings = DRILLDOWNDATA.settings.population_division
        let population_division = pd_settings.base
        if ( ! DRILLDOWN.isEmpty( pd_settings.custom ) ) {
            jQuery.each( pd_settings.custom, function(i,v) {
                if ( map_data.self.geonameid === i ) {
                    population_division = v
                }
            })
        }

        // Self Data
        let self_population = map_data.self.population_formatted
        jQuery('#current_level').empty().html(`Population: ${self_population}`)

        // Build List
        let locations = jQuery('#location_list')
        locations.empty()

        let html = `<table id="country-list-table" class="display">`

        // Header Section
        html += `<thead><tr><th>Name</th><th>Population</th>`

        /* Additional Columns */
        if ( DRILLDOWNDATA.data.custom_column_labels ) {
            jQuery.each( DRILLDOWNDATA.data.custom_column_labels, function(i,v) {
                html += `<th>${v.label}</th>`
            })
        }
        /* End Additional Columns */

        html += `</tr></thead>`
        // End Header Section

        // Children List Section
        let sorted_children =  _.sortBy(map_data.children, [function(o) { return o.name; }]);

        html += `<tbody>`

        jQuery.each( sorted_children, function(i, v) {
            let population = v.population_formatted

            html += `<tr><td><strong><a onclick="network_geoname_list(${v.geonameid})">${v.name}</a></strong></td>
                        <td>${population}</td>`

            if ( network_data[v.geonameid] ) {
                /* contacts*/
                if ( network_data[v.geonameid].contacts > 0 ) {
                    html += `<td><strong>${network_data[v.geonameid].contacts}</strong></td>`
                } else {
                    html += `<td class="grey">0</td>`
                }
                /* groups */
                if ( network_data[v.geonameid].groups > 0 ) {
                    html += `<td><strong>${network_data[v.geonameid].groups}</strong></td>`
                } else {
                    html += `<td class="grey">0</td>`
                }
                /* users */
                if ( network_data[v.geonameid].users > 0 ) {
                    html += `<td><strong>${network_data[v.geonameid].users}</strong></td>`
                } else {
                    html += `<td class="grey">0</td>`
                }
            } else {
                html += `<td class="grey">0</td>`
                html += `<td class="grey">0</td>`
                html += `<td class="grey">0</td>`
            }

            html += `</tr>`

        })
        html += `</tbody>`
        // end Child section

        html += `</table>`
        locations.append(html)

        jQuery('#country-list-table').DataTable({
            "paging":   false
        });

        DRILLDOWN.hide_spinner()
    }

}
