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
    var str = "<option selected>請選擇縣市</option>";
    cityData.forEach(function (el) {
      str += "<option value=\"".concat(el.City, "\">").concat(el.CityName, "</option>");
    });
    selectCity.innerHTML = str;
    console.log(cityData);
  })["catch"](function (err) {
    return console.log(err);
  });
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
