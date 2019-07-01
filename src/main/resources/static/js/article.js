$('.ui.dropdown').dropdown();
worktype_click();
remove_inner_author();
remove_outer_author();
auto();
console.log('1');

var workTypeNum = {'Project':9, 'H5':8, '视频':7, '图片':6, '漫画':5, '音频':4, '文字':3, '美术编辑':2, '责任编辑':1, '其他':0};

function getCookie(c_name){
	if (document.cookie.length>0){
		let c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			let c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

$('#fee_mng').click(function(){
	let token = getCookie('token');
	$.post("../userRole/isAdmin",{
		'token': token
	},function(res){
    	let result = res;
    	if(typeof(result.error) == "undefined"){
    		if(result.isAdmin){
    			window.location.href = "fee_outer.html";
    		}else{
    			window.location.href = "fee_normal.html";
    		}
    	}else{
    		swal('出错', '请登陆后再操作', 'error').then((value) => {
    			window.location.href = "login.html";
			});
    	}
	});
});

$('#user_mng').click(function(){
	let token = getCookie('token');
	$.post("../userRole/isAdmin",{
		'token': token
	},function(res){
    	let result = res;
    	if(typeof(result.error) == "undefined"){
    		if(result.isAdmin){
    			window.location.href = "fee_admin.html";
    		}else{
    			window.location.href = "fee_user.html";
    		}
    	}else{
    		swal('出错', '请登陆后再操作', 'error').then((value) => {
    			window.location.href = "login.html";
			});
    	}
	});
});

$(".shoottime").calendar({
	type: 'date',
	formatter: { // 自定义日期的格式
        date: function(date, settings) {
        	$(this).attr(date.getTime());
            if (!date) return '';

            var year  = date.getFullYear();
            var month = date.getMonth() + 1;
            var day   = date.getDate();

            month = month < 10 ? '0'+month : month;
            day   = day   < 10 ? '0'+day   : day;

            return year + '-' + month + '-' + day;
        }
    }
});

$('#article_key_label').click(function(){
	$('#article_key_label').addClass('active');
	$('#article_user_label').removeClass('active');
	$('#article_date_label').removeClass('active');
	$('#article_info_label').removeClass('active');
	$('#article_add_label').removeClass('active');
	$('.article_key_show').removeAttr('hidden');
	$('.article_user_show').attr('hidden', 'true');
	$('.article_date_show').attr('hidden', 'true');
	$('.article_info_show').attr('hidden', 'true');
	$('.article_add_show').attr('hidden', 'true');
});

$('#article_user_label').click(function(){
	$('#article_key_label').removeClass('active');
	$('#article_user_label').addClass('active');
	$('#article_date_label').removeClass('active');
	$('#article_info_label').removeClass('active');
	$('#article_add_label').removeClass('active');
	$('.article_key_show').attr('hidden', 'true');
	$('.article_user_show').removeAttr('hidden');
	$('.article_date_show').attr('hidden', 'true');
	$('.article_info_show').attr('hidden', 'true');
	$('.article_add_show').attr('hidden', 'true');
});

$('#article_date_label').click(function(){
	$('#article_key_label').removeClass('active');
	$('#article_user_label').removeClass('active');
	$('#article_date_label').addClass('active');
	$('#article_info_label').removeClass('active');
	$('#article_add_label').removeClass('active');
	$('.article_key_show').attr('hidden', 'true');
	$('.article_user_show').attr('hidden', 'true');
	$('.article_date_show').removeAttr('hidden');
	$('.article_info_show').attr('hidden', 'true');
	$('.article_add_show').attr('hidden', 'true');
});

$('#article_info_label').click(function(){
	$('#article_key_label').removeClass('active');
	$('#article_user_label').removeClass('active');
	$('#article_date_label').removeClass('active');
	$('#article_info_label').addClass('active');
	$('#article_add_label').removeClass('active');
	$('.article_key_show').attr('hidden', 'true');
	$('.article_user_show').attr('hidden', 'true');
	$('.article_date_show').attr('hidden', 'true');
	$('.article_info_show').removeAttr('hidden');
	$('.article_add_show').attr('hidden', 'true');
});

$('#article_add_label').click(function(){
	$('#article_key_label').removeClass('active');
	$('#article_user_label').removeClass('active');
	$('#article_date_label').removeClass('active');
	$('#article_info_label').removeClass('active');
	$('#article_add_label').addClass('active');
	$('.article_key_show').attr('hidden', 'true');
	$('.article_user_show').attr('hidden', 'true');
	$('.article_date_show').attr('hidden', 'true');
	$('.article_info_show').attr('hidden', 'true');
	$('.article_add_show').removeAttr('hidden');
});

function remove_inner_author(){
	$('.inner_unit_icon').click(function(){
		let author_unit = document.getElementsByClassName('inner_unit');
		if(author_unit.length > 1){
			let a = $(this).parent();
			a.remove();
		}
	});
};

function remove_outer_author(){
	$('.outer_unit_icon').click(function(){
		let author_unit = document.getElementsByClassName('outer_unit');
		if(author_unit.length > 1){
			let a = $(this).parent();
			a.remove();
		}
	});
};

function worktype_click(){
	$('.worktype').click(function(){
		let workttype = $(this).children(".text").text();
		if(workttype == "其他"){
			let other = $(this).parent().siblings()[1];
			other = $(other).children('input');
			$(other).removeAttr('hidden');
		}else{
			let other = $(this).parent().siblings()[1];
			other = $(other).children('input');
			$(other).attr('hidden', 'true');
		}
	});
	$('.outer_work').blur(function(){
		let outer_work = $(this).val();
		console.log(outer_work.split('|').length);
		if(outer_work.split('|').length < 2){
			for(let i = 1; i <= 3; i++){
				let outer_work_id = $(this).parent().siblings()[i];
				outer_work_id = $(outer_work_id).children('input');
				$(outer_work_id).removeAttr('hidden');
			}
		}else{
			for(let i = 1; i <= 3; i++){
				let outer_work_id = $(this).parent().siblings()[i];
				outer_work_id = $(outer_work_id).children('input');
				$(outer_work_id).attr('hidden', 'true');
			}
		}
	});
}

$('#inner_add_button').click(function(){
	let author = document.getElementsByClassName('inner_hidden_unit');
	author = author[0];
	console.log(author);
	let author_show = document.getElementById('inner_show');
	console.log(author_show);
	author = $(author).clone();
	$(author).removeAttr("hidden");
	$(author_show).append(author);
	remove_inner_author();
	worktype_click();
	auto();
	$('.ui.dropdown').dropdown();
});

$('#outer_add_button').click(function(){
	let author = document.getElementsByClassName('outer_hidden_unit');
	author = author[0];
	console.log(author);
	let author_show = document.getElementById('outer_show');
	console.log(author_show);
	author = $(author).clone();
	$(author).removeAttr("hidden");
	$(author_show).append(author);
	remove_outer_author();
	worktype_click();
	auto();
});

//$(function () {
//	$('.inner_work').autocompleter({ source: a });
//});

function auto() {
	$.get("../infoList/getOutsiderList", {
	},function(res){
		console.log(res);
		outer = [];
		$.each(res, function(i, item) {
			outer.push(item.u_name+'|'+item.u_id_card);
		});
		$(".outer_work").autocomplete({ source: outer });
	});
	$.get("../userInfo/getBriefUserInfo", {
	},function(res){
		console.log(res);
		inner = [];
		$.each(res, function(i, item) {
			inner.push(item.u_name+'|'+item.u_student_id+'|'+item.id);
		});
		$(".inner_work").autocomplete({ source: inner });
	});
}

$('.article_change').click(function(){
	console.log('change');
	let articleid = $('#infotitle').attr('articleid');
	let insider_list = document.getElementsByClassName('inner_unit');
	for(let i = 1; i < insider_list.length; i++){
		let inner_unit = insider_list[i];
		let fields = $(inner_unit).children('.field');
		let work_select = fields[0];
		work_select = $($(work_select).children()[0]).children('.menu');
		work_select = $(work_select).children('.selected');
		work_type = work_select.attr('data-value');
		let work_id = $(fields[1]).children('input').val();
		work_id = work_id.split('|')[2];
		if(typeof(work_id) == "undefined"){
			continue;
		}
		let work_info = '';
//		console.log('work_type' + work_type);
		if(work_type == 0){
			work_info = $(fields[2]).children('input').val();
			other_info.push(work_info);
		}
		$.post("../Article/addInsiders", {
			'articleId':articleid,
			'workId': work_type, 
			'userId': work_id,
			'info': work_info
		}, function(res){
			if(typeof(res.error) != "undefined"){
	    		swal('错误','添加内部用户失败','error');
	    		return;
	    	}else{
	    		swal('成功','添加内部用户成功','success');
	    		$.post("../Article/getInsidersMessage", {
	    			'articleId':articleid
	    		}, function(res){
	    			showinsider(res);
	    		});
	    	}
		});
	}
	let outer_list = document.getElementsByClassName('outer_unit');
	for(let i = 1; i < outer_list.length; i++){
		let outer_unit = outer_list[i];
		let fields = $(outer_unit).children('.field');
		let work = fields[0];
		work = $(work).children('input').val();
		let idcard = fields[1];
		idcard = $(idcard).children('input').val();
		if(idcard.split('|').length >= 2){
			idcard = idcard.split('|')[1];
		}else{
			name = idcard;
			idcard = fields[2];
			idcard = $(idcard).children('input').val();
			bank = fields[3];
			bank = $(bank).children('input').val();
			phone = fields[4];
			phone = $(phone).children('input').val();
			if(name.length == 0){
				continue;
			}
			if(name.length != 0 || idcard.length != 0 || phone.length != 0 || bank != 0){
				let token = getCookie('token');
				$.post("../infoList/addOutsider", {
					"token": token,
					"name": name,
					"phone": phone,
					"bankCard": bank,
					"idCard": idcard
				},function(res){
					console.log(typeof(res.error));
					if(typeof(res.error) != "undefined"){
			    		swal('错误', '外部人员添加出错','error');
			    		return;
			    	}
				});
			}
		}
		$.post("../Article/addOutsiders", {
			'articleId':articleid,
			'idCard': idcard, 
			'info': work
		}, function(res){
			if(typeof(res.error) != "undefined"){
	    		swal('错误','添加外部用户失败','error');
	    		return;
	    	}else{
	    		swal('成功','添加外部用户成功','success');
	    		$.post("../Article/getOutsidersMessage", {
	    			'articleId':articleid
	    		}, function(res){
	    			showousider(res);
	    		});
	    	}
		});
	}
	clear_add();
});

//$('.article_submit').click(function(){
//	let title = $('#article_name').val();
//	console.log(title);
//	let time = $('#time');
//	time = $(time).children('input').val();
//	let timeStamp = Date.parse(time);
//	console.log(timeStamp);
//	let num = $('#article_num').val();
//	let zan = $('#article_zan').val();
//	let read = $('#article_read').val();
//	let insiders = [];
//	let other_info = [];
//	let insider_list = document.getElementsByClassName('inner_unit');
//	for(let i = 1; i < insider_list.length; i++){
//		let inner_unit = insider_list[i];
//		let fields = $(inner_unit).children('.field');
//		let work_select = fields[0];
//		work_select = $($(work_select).children()[0]).children('.menu');
//		work_select = $(work_select).children('.selected');
//		work_type = work_select.attr('data-value');
//		let work_id = $(fields[1]).children('input').val();
//		work_id = work_id.split('|')[2];
//		if(work_id.length == 0){
//			continue;
//		}
//		let work_info = '';
//		console.log('work_type' + work_type);
//		if(work_type == 0){
//			work_info = $(fields[2]).children('input').val();
//			other_info.push(work_info);
//		}
//		if(work_type in insiders){
//			insiders[work_type].push(work_id);
//		}else{
//			let tmp = [];
//			tmp.push(work_id);
//			insiders[work_type] = tmp;
//		}
//		console.log('insiders'+i);
//		console.log(insiders);
//	}
//	let insider_json = []
//	console.log('insiders');
//	console.log(insiders);
//	for(let i in insiders){
//		let inner_unit = {};
//		inner_unit['workId'] = i;
//		inner_unit['workers'] = insiders[i];
//		if(i == "0"){
//			inner_unit['info'] = other_info;
//		}
//		insider_json.push(inner_unit);
//	}
//	
//	let outsiders = [];
//	let outer_list = document.getElementsByClassName('outer_unit');
//	for(let i = 1; i < outer_list.length; i++){
//		let outer_unit = outer_list[i];
//		let fields = $(outer_unit).children('.field');
//		let work = fields[0];
//		work = $(work).children('input').val();
//		let idcard = fields[1];
//		idcard = $(idcard).children('input').val();
//		if(idcard.split('|').length >= 2){
//			idcard = idcard.split('|')[1];
//			outer_unit = {"idCard":idcard, "work":work};
//			outsiders.push(outer_unit);
//		}else{
//			name = idcard;
//			idcard = fields[2];
//			idcard = $(idcard).children('input').val();
//			bank = fields[3];
//			bank = $(bank).children('input').val();
//			phone = fields[4];
//			phone = $(phone).children('input').val();
//			if(name.length != 0 || idcard.length != 0 || phone.length != 0 || bank != 0){
//				let token = getCookie('token');
//				$.post("../infoList/addOutsider", {
//					"token": token,
//					"name": name,
//					"phone": phone,
//					"bankCard": bank,
//					"idCard": idcard
//				},function(res){
//					console.log(typeof(res.error));
//					if(typeof(res.error) != "undefined"){
//			    		swal('错误', '外部人员添加出错','error');
//			    		return;
//			    	}
//				});
//				outer_unit = {"idCard":idcard, "work":work};
//				outsiders.push(outer_unit);
//			}
//		}
//	}
//	$.ajax({
//	    type: "POST",
//	    url: "../Article/addArticleInfo",
//	    contentType: "application/json", //必须有
//	    data: JSON.stringify({
//	    	"timeStamp":timeStamp,
//	    	"num":num,
//	    	"title":title,
//	    	"zan":zan,
//	    	"read":read,
//	    	"insiders":insider_json,
//	    	"outsiders":outsiders
//	    }),  //相当于 //data: "{'str1':'foovalue', 'str2':'barvalue'}",
//	    success: function(res){
//	    	if(typeof(res.error) == "undefined"){
//	    		swal('成功','添加成功','success').then((value) => {
//	    			clear_add();
//				});
//	    	}else{
//	    		swal('错误','添加出错','error');
//	    	}
//	    }
//	});
//});

function clear_add(){
	let author = document.getElementsByClassName('inner_unit');
	author = $(author[0]).clone();
	let author_show = document.getElementById('inner_show');
	$(author_show).empty();
	$(author_show).append(author);
	
	author = document.getElementsByClassName('outer_unit');
	author = $(author[0]).clone();
	author_show = document.getElementById('outer_show');
	$(author_show).empty();
	$(author_show).append($(author).clone());
	
	remove_inner_author();
	worktype_click();
	auto();
	$('.ui.dropdown').dropdown();
}

$('.changeinfo').click(function(){
	let articleid = $('#infotitle').attr('articleid');
	let infozan = $('#infozan').val();
	$.post("../Article/updateZan", {	
		"zan": infozan,
		"articleId": articleid
	},function(res){
		if(typeof(res.error) != "undefined"){
    		swal('错误','修改赞数出错','error');
    		return;
    	}
	});
	let inforead = $('#inforead').val();
	$.post("../Article/updateRead", {	
		"read": inforead,
		"articleId": articleid
	},function(res){
		if(typeof(res.error) != "undefined"){
    		swal('错误','修改阅读出错','error');
    		return;
    	}
	});
});

function showinsider(res){
	let inner_info_container = $('.inner_info_container');
	inner_info_container.empty();
	$.each(res, function(i, item) {
		let nametd = $('<td></td>').text(item.u_name);
		let work_nametd = $('<td></td>').text(item.work_name);
		let indeltd = $("<td></td>");
		let indelbutton=$('<button class="ui active button indelbutton">删除</button>');
		indelbutton.attr('user_id', item.user_id);
		indelbutton.attr('work_id', item.work_id);
		indeltd.append(indelbutton);
		
		let inner_tr = $('<tr></tr>');
		inner_tr.append(nametd);
		inner_tr.append(work_nametd);
		inner_tr.append(indeltd);
		
		inner_info_container.append(inner_tr);
	});
	indelbutton();
}

function indelbutton(){
	$('.indelbutton').click(function(){
		let articleId = $('#infotitle').attr('articleid');
		let tmp = $($(this).parent()).siblings();
		let userId = $(this).attr('user_id');
		let workId = $(this).attr('work_id');
		
		swal({
			  title: "确定删除吗?",
			  text: "一旦删除将无法恢复",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			  indelete(articleId, workId, userId);
		  } else {
			  swal("已取消");
		  }
		});
		
	});
}

function indelete(articleId, workId, userId){
	$.post("../Article/deleteInsiders", {	
			'articleId': articleId,
			'workId': workId,
			'userId': userId
	},function(res){
		if(typeof(res.error) != "undefined"){
    		swal('错误','删除内部人员出错','error');
    		return;
    	}else{
    		$.post("../Article/getInsidersMessage", {
    			'articleId':articleId
    		}, function(res){
    			showinsider(res);
    		});
    		swal('成功', '删除内部人员成功','success');
    	}
	});
}

function showousider(res){
	let outer_info_container = $('.outer_info_container');
	outer_info_container.empty();
	$.each(res, function(i, item) {
		let nametd = $('<td></td>').text(item.u_name);
		let bank_cardtd = $('<td></td>').text(item.u_bank_card);
		let u_phonetd = $('<td></td>').text(item.u_phone);
		let u_infotd = $('<td></td>').text(item.u_info);
		let outdeltd = $("<td></td>");
		let outdelbutton=$('<button class="ui active button outdelbutton">删除</button>');
		outdelbutton.attr('delid', item.id);
		outdeltd.append(outdelbutton);
		
		let outer_tr = $('<tr></tr>');
		outer_tr.append(nametd);
		outer_tr.append(bank_cardtd);
		outer_tr.append(u_phonetd);
		outer_tr.append(u_infotd);
		outer_tr.append(outdeltd);
		
		outer_info_container.append(outer_tr);
	});
	outdelbutton();
}

function outdelbutton(){
	$('.outdelbutton').click(function(){
		let delid = $(this).attr('delid');
		swal({
			  title: "确定删除吗?",
			  text: "一旦删除将无法恢复",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			  outdelete(delid);
		  } else {
			  swal("已取消");
		  }
		});
	});
}

function outdelete(id){
	let articleid = $('#infotitle').attr('articleid');
	$.post("../Article/deleteOutsiders", {	
		'id': id
	},function(res){
		if(typeof(res.error) != "undefined"){
    		swal('错误','删除外部人员出错','error');
    		return;
    	}else{
    		swal('成功','删除外部人员成功','success');
    		$.post("../Article/getOutsidersMessage", {
    			'articleId':articleid
    		}, function(res){
    			showousider(res);
    		});
    	}
	});
}