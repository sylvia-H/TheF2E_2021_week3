// 搜尋欄取得縣市名稱
function getCity(){
    const endpoint = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON';

    axios.get(endpoint,
        {
            headers: getAuthorizationHeader()
        })
    .then(response => {
            const cityData = response.data;
            const selectCity = document.getElementById('select_city');
            let str = "<option selected>請先選擇縣市</option>";
            cityData.forEach(el=>{
                str+=`<option value="${el.City}">${el.CityName}</option>`
            });
            selectCity.innerHTML=str;
            console.log(cityData);
        })
    .catch(err => console.log(err));

}

let routeData = null;
// 搜尋欄取得路線名稱
function getRoute(city){
    const endpoint = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$format=JSON`;

    axios.get(endpoint,
        {
            headers: getAuthorizationHeader()
        })
    .then(response => {
            routeData = response.data;

            //路線名稱首字排序
            function compareName( a, b ) {
                if ( a.RouteName.Zh_tw < b.RouteName.Zh_tw ){
                    return -1;
                }
                if ( a.RouteName.Zh_tw > b.RouteName.Zh_tw ){
                    return 1;
                }
                return 0;
            }

            const sortData = routeData.sort(compareName);

            // const selectRoute = document.getElementById('select_route');
            // let str = "";
            // sortData.forEach(el=>{
            //     str+=`<option value="${el.RouteUID}">${el.RouteName.Zh_tw}</option>`
            // });
            // selectRoute.innerHTML=str;
            // console.log(routeData);
            
            showRouteResult(sortData);
        })
    .catch(err => console.log(err));

}

// 顯示搜尋路線結果
function showRouteResult(data){
    const busSearchShow = document.querySelector('.bus_searchShow');
    const busSearching = document.querySelector('.bus_searching');
    const busSearchNone = document.querySelector('.bus_searchNone');
    const busRouteResult = document.querySelector('.bus_routeResult');
    
    if(!data || data.length === 0) {
        busSearching.classList.add('d-none');
        busSearchNone.classList.remove('d-none');
    } else {

        let str = "";
    
        data.forEach(el=>{
            str+=`
            <div class="w-100 rounded-4 shadow-sm | py-3 px-4 mb-4">
                <div class="d-flex jc-sb | mb-2">
                    <h4 class="text-warning">${el.RouteName.Zh_tw}</h4>
                    <span class="material-icons-outlined text-dark">
                        favorite_border
                    </span>
                    <span class="material-icons text-danger d-none">
                        favorite
                    </span>
                </div>
                <div class="d-flex jc-sb">
                    <p class="d-flex ai-c text-fontDark fz-4">
                        <span class="bus_searchResult_routeStart">
                            ${el.DepartureStopNameZh}
                        </span>
                        <span class="material-icons mx-2">
                            sync_alt
                        </span>
                        <span class="bus_searchResult_routeEnd">
                            ${el.DestinationStopNameZh}
                        </span>
                    </p>
                    <p class="text-dark">
                        ${el.Operators[0].OperatorName.Zh_tw}
                    </p>
                </div>
            </div>`
        });
    
        busRouteResult.innerHTML = str;

        busSearching.classList.add('d-none');
        busSearchShow.classList.remove('d-none');
    }

}

// 關鍵字比對 search_route
function findMatch(keyword){
    const regExp = new RegExp(keyword,'gi');
    console.log(regExp);
    return routeData.filter(el=>el.RouteName.Zh_tw.match(regExp) || el.DepartureStopNameZh.match(regExp) || el.DestinationStopNameZh.match(regExp));
}

// 渲染出比對結果
function renderRoute(keyword){
    const busSearchShow = document.querySelector('.bus_searchShow');
    const busSearching = document.querySelector('.bus_searching');
    const busSearchNone = document.querySelector('.bus_searchNone');
    const busRouteResult = document.querySelector('.bus_routeResult');

    const cacheData = findMatch(keyword);

    let str = "";

    if(!cacheData || cacheData.length === 0) {
        console.log('NoData');
        busSearching.classList.add('d-none');
        busSearchShow.classList.add('d-none');
        busSearchNone.classList.remove('d-none');
    } else {
        cacheData.forEach(el=>{
            str+=`
            <div class="w-100 rounded-4 shadow-sm | py-3 px-4 mb-4">
                <div class="d-flex jc-sb | mb-2">
                    <h4 class="text-warning">${el.RouteName.Zh_tw}</h4>
                    <span class="material-icons-outlined text-dark">
                        favorite_border
                    </span>
                    <span class="material-icons text-danger d-none">
                        favorite
                    </span>
                </div>
                <div class="d-flex jc-sb">
                    <p class="d-flex ai-c text-fontDark fz-4">
                        <span class="bus_searchResult_routeStart">
                            ${el.DepartureStopNameZh}
                        </span>
                        <span class="material-icons mx-2">
                            sync_alt
                        </span>
                        <span class="bus_searchResult_routeEnd">
                            ${el.DestinationStopNameZh}
                        </span>
                    </p>
                    <p class="text-dark">
                        ${el.Operators[0].OperatorName.Zh_tw}
                    </p>
                </div>
            </div>`
        });
    
        busRouteResult.innerHTML = str;

        busSearching.classList.add('d-none');
        busSearchNone.classList.add('d-none');
        busSearchShow.classList.remove('d-none');
    }
}