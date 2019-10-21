var address_prefecture="北海道";
var address_city="";
//市区町村取得APIのURL（この文字列のあとにエリア指定）
var city_url="http://www.land.mlit.go.jp/webland/api/CitySearch?area=";
//
var addresslist=[];
//住所から緯度経度取得APIのURL（この文字列のあとにエリア指定）
var latlng_url="https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPUc2STZsb0Vpa3JobSZzPWNvbnN1bWVyc2VjcmV0Jng9Nzk-&query=";

//都道府県セレクトが変更されたら
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#address')){
		ajax(city_url+"01","address_city","out","json");
		$("#add_prefecture").change(function(){
				var result=$("#add_prefecture").val().split(",");
				address_prefecture=result[0];
				ajax(city_url+result[1],"address_city","out","json");
		});
		$("#city").change(function(){
				var result=$("#city").val();
				address_city=result;
				console.log(address_prefecture+address_city);
		});
	}
});
$(document).on("click","#submit_address",function(){
	var addin=$("#in_address").val();
	console.log(addin);
	if(addin=="" || addin==null){
		alert("住所が入力されていません");
	}else{
		ajax(latlng_url+address_prefecture+address_city+addin,"address_lanlng","out","xml");
	}

});

//市区町村ajax通信の結果退避
function setResAC(data){
	address_city=data['data'][0]['name'];
	console.log(address_prefecture+address_city);
	addresslist=data['data'];
	viewAddress();
}

//市区町村をセレクトボックスに表示
function viewAddress(){
	var elem="";
	for(var i=0;i<addresslist.length;i++){
		elem+="<option value='"+addresslist[i]['name']+"'>"+addresslist[i]['name']+"</option>";
	}
	$("#city select").html(elem);
}

//緯度経度ajax通信の結果退避
function setResAL(data){
	var count=$(data).find("ResultInfo").find("Count").text();
	if(count==0){
		//検索結果が0件の場合
		alert("検索結果がありませんでした。");
	}else{
		//検索結果が1件以上の場合
		let work=$(data).find("Feature:first Geometry Coordinates").text().split(",");
		console.log($(data).find("Feature:first >Name").text());
		console.log("緯度:"+work[1]);
		console.log("経度:"+work[0]);
		lat=work[1];
		lng=work[0];
		departure_type="station";
		document.getElementById("main").pushPage("purpose.html");
	}
}
