﻿//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var objectiveList =new Array();
var objectiveAboutList=new Array();

//画面ロード直後の処理
document.addEventListener('init', function(event) {
	var page= event.target;
	//目的入力ページの時のみ処理
	if(page.matches('#purpose_input')){
		viewPurpose();
	}
});

//目的セレクトボックスを表示
function viewPurpose(){
	$("#purpose_input_box").empty();
	let elem = '<select id="purpose_select" name="purpose_input_name">';
	for(i = 0; i <= idlist.length -1;i++){
		elem += "\t\t<option value='" + idlist[i] + "'>" + objectiveAboutList[idlist[i]] +"</option>\n";
	}
	elem+="</select>";
	$("#purpose_input_box").html(elem);
	$("#purpose_select").selModal();
	$("#modal").hide();
}

//目的決定ボタンクリック処理
$(document).on("click","#submit_purpose",function(){
	purpose=parseInt($("#purpose_select").val());

	//目的が決定した際の目的を出すコンソール
	//console.log("目的:"+purpose);
	$('#modal').show();
	document.getElementById("main").pushPage("generation.html");
});
