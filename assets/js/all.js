"use strict";
"use strict";

var bodyElement = document.querySelector('body');
var mainElement = document.querySelector('main');
var footerElement = document.querySelector('footer.fixed-bottom');
var burger = document.querySelector('.burger');
var bgCircle = document.querySelector('.bg-circle');
burger.classList.add('unToggled');
burger.addEventListener('click', function () {
  burger.classList.toggle('toggled');
  burger.classList.toggle('unToggled');
  bgCircle.classList.toggle('d-none');
  mainElement.classList.toggle('d-none');
  footerElement.classList.toggle('d-none');
});
"use strict";

// 搜尋欄取得縣市名稱
function getCity() {
  var endpoint = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON';
  axios.get(endpoint, {
    headers: getAuthorizationHeader()
  }).then(function (response) {
    var cityData = response.data;
    var selectCity = document.getElementById('select_city');
    var str = "<option selected>請先選擇縣市</option>";
    cityData.forEach(function (el) {
      str += "<option value=\"".concat(el.City, "\">").concat(el.CityName, "</option>");
    });
    selectCity.innerHTML = str;
    console.log(cityData);
  })["catch"](function (err) {
    return console.log(err);
  });
}

var routeData = null; // 搜尋欄取得路線名稱

function getRoute(city) {
  var endpoint = "https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/".concat(city, "?$format=JSON");
  axios.get(endpoint, {
    headers: getAuthorizationHeader()
  }).then(function (response) {
    routeData = response.data; //路線名稱首字排序

    function compareName(a, b) {
      if (a.RouteName.Zh_tw < b.RouteName.Zh_tw) {
        return -1;
      }

      if (a.RouteName.Zh_tw > b.RouteName.Zh_tw) {
        return 1;
      }

      return 0;
    }

    var sortData = routeData.sort(compareName);
    var selectRoute = document.getElementById('select_route');
    var str = "";
    sortData.forEach(function (el) {
      str += "<option value=\"".concat(el.RouteUID, "\">").concat(el.RouteName.Zh_tw, "</option>");
    });
    selectRoute.innerHTML = str;
    console.log(routeData);
    showRouteResult(sortData);
  })["catch"](function (err) {
    return console.log(err);
  });
} // 顯示搜尋路線結果


function showRouteResult(data) {
  var busSearchShow = document.querySelector('.bus_searchShow');
  var busSearching = document.querySelector('.bus_searching');
  var busSearchNone = document.querySelector('.bus_searchNone');
  var busRouteResult = document.querySelector('.bus_routeResult');

  if (!data) {
    busSearching.classList.add('d-none');
    busSearchNone.classList.remove('d-none');
  } else {
    var str = "";
    data.forEach(function (el) {
      str += "\n            <div class=\"w-100 rounded-4 shadow-sm | py-3 px-4 mb-4\">\n                <div class=\"d-flex jc-sb | mb-2\">\n                    <h4 class=\"text-warning\">".concat(el.RouteName.Zh_tw, "</h4>\n                    <span class=\"material-icons-outlined text-dark\">\n                        favorite_border\n                    </span>\n                    <span class=\"material-icons text-danger d-none\">\n                        favorite\n                    </span>\n                </div>\n                <div class=\"d-flex jc-sb\">\n                    <p class=\"d-flex ai-c text-fontDark fz-4\">\n                        <span class=\"bus_searchResult_routeStart\">\n                            ").concat(el.DepartureStopNameZh, "\n                        </span>\n                        <span class=\"material-icons mx-2\">\n                            sync_alt\n                        </span>\n                        <span class=\"bus_searchResult_routeEnd\">\n                            ").concat(el.DestinationStopNameZh, "\n                        </span>\n                    </p>\n                    <p class=\"text-dark\">\n                        ").concat(el.Operators[0].OperatorName.Zh_tw, "\n                    </p>\n                </div>\n            </div>");
    });
    busRouteResult.innerHTML = str;
    busSearching.classList.add('d-none');
    busSearchShow.classList.remove('d-none');
  }
}
"use strict";

// header 驗證
function getAuthorizationHeader() {
  var AppID = '9eeb30e3588740618367a446631cbc3f';
  var AppKey = 'CKTwBadJd3_0_EdqiXE0kEg8fTw';
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}
//# sourceMappingURL=all.js.map
