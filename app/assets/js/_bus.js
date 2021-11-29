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
            let str = "<option selected>請選擇縣市</option>";
            cityData.forEach(el=>{
                str+=`<option value="${el.City}">${el.CityName}</option>`
            });
            selectCity.innerHTML=str;
            console.log(cityData);
        })
    .catch(err => console.log(err));

}