

function showAllRoutes()
{
    let routes_markup = ""
    for (let key in store.routes)
    {
        routes_markup += `<a href="#" data-route-key="${key}" class="list-group-item list-group-item-action route-link">${store.routes[key].name}<span style="float: right;">(Автобус)</span></a>`
    }

    $("#list-of-routes").html(routes_markup)
}

function showRouteDetails(route_key)
{
    let routeDetailsDiv = $("#route-details")

    let markup = `
        <h4 class="text-center">Маршрут ${route_key}</h4>
        <h6>Тип: автобус</h6>
        <br>
        <h6 class="text-center">Список зупинок</h6>
        <div class="list-group"></div>
    `
    store.routes[route_key].waybill.forEach(item => {
        markup += `<a href="#" class="list-group-item">${ store.stations[item[0]].name }</a>`
    })


    markup += `<h6 class="text-center mt-2">Час виїзду</h6>`
    store.routes[route_key].startTime.forEach((item) => {
        markup += `<a href="#" class="badge badge-dark ml-2 route-departure-time">${item}</a>`
    })

    routeDetailsDiv.html(markup)
}

$("main").delegate(".route-link", "click", (event) => {
    event.preventDefault()
    showRouteDetails($(event.target).attr("data-route-key"))
})

$("main").delegate(".route-departure-time", "click", (event) => {
    event.preventDefault()
    showRouteDetails($(event.target).attr("data-route-key"))
})

showAllRoutes()
