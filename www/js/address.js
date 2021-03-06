var address_prefecture = "北海道";
var address_city = "";
//市区町村取得APIのURL（この文字列のあとにエリア指定）
var city_url = "https://www.land.mlit.go.jp/webland/api/CitySearch?area=";
//市区町村取得結果を入れる配列
var address_list = [];
//住所から緯度経度取得APIのURL（この文字列のあとにエリア指定）
var latlng_url = "https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPUc2STZsb0Vpa3JobSZzPWNvbnN1bWVyc2VjcmV0Jng9Nzk-&query=";

//都道府県セレクトが変更されたら
document.addEventListener('init', function (event) {
	var page = event.target;
	//住所ページの時のみ処理
	if (page.matches('#address')) {
		address_prefecture = "北海道";
		ajax(city_url + "01", "address_city", "out", "json");
		$("#add_prefecture").change(function () {
			$('#modal').show();
			var result = $("#add_prefecture").val().split(",");
			address_prefecture = result[0];
			ajax(city_url + result[1], "address_city", "out", "json");
		});
		$("#add_prefecture").selModal();
	}
});

//市区町村の選択処理
$(document).on("change","#city",function () {
	var result = $("#city").val();
	address_city = result;
	//アドレスを合体させた結果を出すコンソール
	//console.log("住所:" + address_prefecture + address_city);
});

//決定ボタンタップ時処理
$(document).on("click", "#submit_address", function () {
	var addin = htmlspecialchars($("#in_address").val());
	//住所入力欄のvalue値を出すコンソール
	//console.log("address::::"+addin);
	if (addin == "" || addin == null) {
		viewAlertADD(0);
	} else {
		//console.log(latlng_url + address_prefecture + address_city + addin);
		//住所の緯度経度を取得するajax通信
		ajax(latlng_url + address_prefecture + address_city + addin, "address_lanlng", "out", "xml");
	}
});

//市区町村ajax通信の結果退避
function setResAC(data) {
	address_city = data['data'][0]['name'];
	//アドレスを合体させた結果をだすコンソール
	//console.log(address_prefecture + address_city);
	address_list = data['data'];
	viewAddress();
}

//市区町村をセレクトボックスに表示
function viewAddress() {
	$("#city_box").empty();
	//$("#city_box").html('<ons-select id="city" modifier="material"><select class="select-input"></select ></ons-select>');
	var elem = '<select id="city" name="city_name">';
	for (var i = 0; i < address_list.length; i++) {
		elem += "<option value='" + address_list[i]['name'] + "'>" + address_list[i]['name'] + "</option>";
	}
	elem +="</select>";
	$("#city_box").html(elem);
	$("#city").selModal();
	$('#modal').hide();
}

//緯度経度ajax通信の結果退避
function setResAL(data) {
	var count = $(data).find("ResultInfo").find("Count").text();
	if (count == 0) {
		//検索結果が0件の場合
		viewAlertADD(1);
	} else {
		//検索結果が1件以上の場合
		let work = $(data).find("Feature:first Geometry Coordinates").text().split(",");
		//緯度、経度、住所名をだすコンソール
		//console.log("住所名:"+$(data).find("Feature:first >Name").text());
		//console.log("緯度:" + work[1]);
		//console.log("経度:" + work[0]);
		lat = work[1];
		lng = work[0];
		departure_type = $(data).find("Feature:first >Name").text();
		document.getElementById("main").pushPage("purpose.html");
	}
}
