//ローカルストレージから取得したプラン履歴
var history_array = new Array();
//削除する配列の添字
var history_remove_num;
//plan_checkに送る配列と添え字
var history_type;
var his_work;
document.addEventListener('show', function (event) {
	var page = event.target;
	//プラン履歴ページの時のみ処理
	if (page.matches('#plan_history')) {
		//ローカルストレージにプランが保存されているかどうか
		if (getLocalStorage("generation") != null) {
			//ローカルストレージから生成済みプラン一覧の取得
			history_array = getLocalStorage("generation");
			//ローカルストレージに保存されている配列を出すコンソール
			//console.log(history_array);
			//履歴出力
			viewHistory(0);
		} else {
			$("#plan_history_error").html("<div class='sub_title'>履歴がないよ<br>新しく作ろう！</div>");
		}
	}
});

//プランのどれかをタップ時
$(document).on("click", ".history_item", function () {
	history_type = $(this).attr("value");
	//plan_checkに送る配列
	his_work = history_array[history_type];
	//プラン確認ページに選択したプラン情報を送信し表示
	document.getElementById('main').pushPage("plan_check.html", { data: { his_work, history_type } });
});

//ツールバーの削除ボタンクリックしたときの処理
$(document).on("click", "#remove_plan", function () {
	viewHistory(1);
	$('#history_remove').html('<ons-button id="release_plan">解除</ons-button>');
});

//解除ボタンクリックしたときの処理
$(document).on("click", "#release_plan", function () {
	viewHistory(0);
	$('#history_remove').html('<ons-button id="remove_plan">削除</ons-button>');
});

//リストの削除ボタンを押したときの削除処理
$(document).on("click", ".romove_submit", function () {
	history_remove_num = $(this).attr("remove_num");
	viewAlertHIS();
});

/**リストを表示するメソッド
 * param  {int} type : 表示するタイプ
 * 		0：削除しない表示、1：削除する表示
 * 表示するのは生成した日にち、時間
 */
function viewHistory(type) {
	if (history_array.length > 0) {
		let elem = "";
		for (let i = history_array.length - 1; i >= 0; i--) {
			if (type == 0) {
				//プラン削除しない画面表示
				elem += "<ons-list-item class='history_item' modifier='chevron' value='" + i + "' tappable>"
					+ type_image(history_array[i]["create_purpose"])
					+ "<p class='history_plan_title'>" + history_array[i]["title"] + "</p>"
			} else {
				//プラン削除する画面表示
				elem += '<ons-list-item>'
					+ type_image(history_array[i]["create_purpose"])
					+ "<p class='history_plan_title'>" + history_array[i]["title"] + "</p>"
					+ '<ons-button class="romove_submit" remove_num="' + i + '">'
					+ check_image("trash")
					+ '</ons-button>';
			}

			elem += "</ons-list-item>";
		}
		$("#plan_history_list").html(elem);
	} else {
		$("#plan_history_error").html("<div class='sub_title'>履歴がないよ<br>新しく作ろう！</div>");
		$("#plan_history_list").html("");
	}
}
