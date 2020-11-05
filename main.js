

function showAllRoutes()
{
    let routes_markup = ""
    for (let key in store.routes)
    {
        routes_markup += `<a href="#" class="list-group-item list-group-item-action">${store.routes[key].name}<span style="float: right;">(Автобус)</span></a>`
    }

    $("#list-of-routes").html(routes_markup)
}

showAllRoutes()