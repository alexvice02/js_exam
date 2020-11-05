let prevEl = null
let currentRoute = 0

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
        <h4>Маршрут ${route_key}</h4>
        <h6>Тип: автобус</h6>
        <br>
        <h6 class="text-center">Список зупинок</h6>
        <div class="list-group"></div>
    `

    store.routes[route_key].waybill.forEach((item) => {
        markup += `<a href="#" class="list-group-item">${ store.stations[item[0]].name }
                    <span style="" class="badge badge-dark float-right">${item[1]}хв</span>
                   </a>`
    })


    markup += `<h6 class="text-center mt-2">Час виїзду</h6>`
    store.routes[route_key].startTime.forEach((item) => {
        markup += `<a href="#" class="badge badge-primary ml-2 route-departure-time">${item}</a>`
    })

    routeDetailsDiv.html(markup)
}

$("main").delegate(".route-link", "click", (event) => {
    event.preventDefault()
    showRouteDetails($(event.target).attr("data-route-key"))

    currentRoute = $(event.target).attr("data-route-key")

    if (prevEl !== null)
    {
        prevEl.removeClass("active")
        prevEl = $(event.target)
        $(event.target).toggleClass("active")
    }else
    {
        prevEl = $(event.target)
        $(event.target).toggleClass("active")
    }

})

function fixTime(time, add)
{
    let hours = Number(time.split(":")[0])
    let minutes = Number(time.split(":")[1])

    if ((minutes + add) > 59)
    {
        minutes = (minutes + add) % 60;
        hours++

        return `${hours}:${minutes}`
    }else
    {
        minutes = add + minutes;

        return `${hours}:${minutes}`
    }

}

$("main").delegate(".route-departure-time", "click", (event) => {
    event.preventDefault()

    let markup = ''

    let time = $(event.target).text()

    store.routes[currentRoute].waybill.forEach((item, index) => {
        markup += `<div class="list-group-item list-group-item-action">${store.stations[item[0]].name}
            <span class="badge badge-dark float-right">${fixTime(time, item[1])}</span>
        </div>`
    })

    $("#route-time-stations").html(markup)

})

showAllRoutes()
