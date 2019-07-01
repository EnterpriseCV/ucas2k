//console.log(2);
$('.ui.dropdown').dropdown();
worktype_click();
remove_author();
remove_outerauthor();
auto();
check();

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

// 测试数据
// '[{\"user\":\"Alice\", \"article\":\"文章1\", \"job\":\"图片\", \"fee\":\"10\"}, {\"user\":\"Bob\", \"article\":\"文章2\", \"job\":\"文章\", \"fee\":\"10\"}, {\"user\":\"Candy\", \"article\":\"文章3\", \"job\":\"编辑\", \"fee\":\"10\"}]'
function show_fee_user_info(res){
	let fee_user_info = document.getElementById('fee_user_container');
	$(fee_user_info).empty();
	res = eval('(' + res + ')');
	$.each(res, function(i, item) {
		let tr = $('<tr></tr>');
		let td1 = $('<td></td>');
		td1.text(item.user);
		tr.append(td1);
		let td2 = $('<td></td>');
		td2.text(item.article);
		tr.append(td2);
		let td3 = $('<td></td>');
		td3.text(item.job);
		tr.append(td3);
		let td4 = $('<td></td>');
		td4.text(item.fee);
		tr.append(td4);
		console.log(tr);
		$(fee_user_info).append(tr);
	});
}

function fee_article_show(){
	let fee_user_info = document.getElementById('fee_article_container');
	$(fee_user_info).empty();
	$.ajax({
	    url: '/fee_article_info',
	    type: 'GET',
	    cache: false,
	    processData: false,
	    contentType: false,
	    success:function(res){
			show_fee_article_info(res);
        }
	}).done(function(res) {
	}).fail(function(res) {
	});
	console.log('fee_user');
}

// 测试数据
// '[{\"article\":\"文章1\", \"info\":[{\"user\":\"作者1\", \"job\":\"图片\", \"fee\":\"10\"}, {\"user\":\"作者2\", \"job\":\"编辑\", \"fee\":\"9\"}]}, {\"article\":\"文章3\", \"info\":[{\"user\":\"Candy\", \"job\":\"文章\", \"fee\":\"8\"}]} ]'
function show_fee_article_info(res){
	let fee_article_info = document.getElementById('fee_article_container');
	$(fee_article_info).empty();
	res = eval('(' + res + ')');
	$.each(res, function(i, item) {
		let tr = $('<tr></tr>');
		let td = $('<td></td>');
		td.attr('rowspan', item.info.length);
		td.text(item.article);
		tr.append(td);

		$.each(item.info, function(i, item2){
			td = $('<td></td>');
			td.text(item2.user);
			tr.append(td);
			td = $('<td></td>');
			td.text(item2.job);
			tr.append(td);
			td = $('<td></td>');
			td.text(item2.fee);
			tr.append(td);
			$(fee_article_info).append(tr);
			tr = $('<tr></tr>');
		});
	});
}

function submit_fee(){
	let article_name = document.getElementById('article_name');
	article_name = $(article_name).children('input');
	article_name = article_name.val();

	let author_list = document.getElementsByClassName('fee_author_unit');
	author_total = new Array();
	for(let i = 0; i < author_list.length; i++){
		let author_unit = author_list[i];
		author_info = $(author_unit).children();

		let author_name = $(author_info[0]).children('input');
		author_name = author_name.val();
		let job = $(author_info[1]).children('input');
		job = job.val();
		let fee = $(author_info[2]).children('input');
		fee = fee.val();
		author = new Array(author_name, job, fee);
		author_total[i] = author;
	}

	console.log(article_name);
	console.log(author_total);
	let formdata = new FormData();
	formdata.append("article_name", article_name);
	formdata.append("author_list", author_total);

	$.ajax({
	    url: '/submit_fee',
	    type: 'POST',
	    cache: false,
	    data: formdata,
	    processData: false,
	    contentType: false
	}).done(function(res) {
		swal("完成", "上传成功","success");
	}).fail(function(res) {
		swal("失败", "上传失败，请重试", "error");
	});
}

$('#fee_user_label').click(function(){
	$('#fee_article_label').removeClass('active');
	$('#fee_outeruser_label').removeClass('active');
	$('#fee_add_label').removeClass('active');
	$('#fee_outeradd_label').removeClass('active');
	$('#fee_user_label').addClass('active');
	let page = $('.fee_user_fee_show');
	page.removeAttr('hidden');
	page = $('.fee_user_article_show');
	page.attr('hidden', 'true');
	page = $('.fee_outeruser_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_fee_add');
	page.attr('hidden', 'true');
	page = $('.fee_outerfee_add');
	page.attr('hidden', 'true');
});

$('#fee_outeruser_label').click(function(){
	$('#fee_article_label').removeClass('active');
	$('#fee_user_label').removeClass('active');
	$('#fee_add_label').removeClass('active');
	$('#fee_outeradd_label').removeClass('active');
	$('#fee_outeruser_label').addClass('active');
	let page = $('.fee_outeruser_fee_show');
	page.removeAttr('hidden');
	page = $('.fee_user_article_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_fee_add');
	page.attr('hidden', 'true');
	page = $('.fee_outerfee_add');
	page.attr('hidden', 'true');
});

$('#fee_article_label').click(function(){
	$('#fee_outeruser_label').removeClass('active');
	$('#fee_user_label').removeClass('active');
	$('#fee_add_label').removeClass('active');
	$('#fee_outeradd_label').removeClass('active');
	$('#fee_article_label').addClass('active');
	let page = $('.fee_user_article_show');
	page.removeAttr('hidden');
	page = $('.fee_outeruser_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_fee_add');
	page.attr('hidden', 'true');
	page = $('.fee_outerfee_add');
	page.attr('hidden', 'true');
	// fee_article_show();
});

$('#fee_add_label').click(function(){
	$('#fee_outeruser_label').removeClass('active');
	$('#fee_user_label').removeClass('active');
	$('#fee_article_label').removeClass('active');
	$('#fee_outeradd_label').removeClass('active');
	$('#fee_add_label').addClass('active');
	let page = $('.fee_fee_add');
	page.removeAttr('hidden');
	page = $('.fee_outeruser_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_article_show');
	page.attr('hidden', 'true');
	page = $('.fee_outerfee_add');
	page.attr('hidden', 'true');
});

$('#fee_outeradd_label').click(function(){
	$('#fee_outeruser_label').removeClass('active');
	$('#fee_user_label').removeClass('active');
	$('#fee_article_label').removeClass('active');
	$('#fee_add_label').removeClass('active');
	$('#fee_outeradd_label').addClass('active');
	let page = $('.fee_outerfee_add');
	page.removeAttr('hidden');
	page = $('.fee_outeruser_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_fee_show');
	page.attr('hidden', 'true');
	page = $('.fee_user_article_show');
	page.attr('hidden', 'true');
	page = $('.fee_fee_add');
	page.attr('hidden', 'true');
});

$('#fee_author_add_button').click(function(){
	
  
	let author = document.getElementsByClassName('fee_author_hidden_unit');
	author = author[0];
	console.log(author);
	let author_show = document.getElementById('fee_author_show');
	console.log(author_show);
	author = $(author).clone();
	$(author).removeAttr("hidden");
	$(author_show).append($(author).clone());
	remove_author();
	worktype_click();
	$('.ui.dropdown').dropdown();
});

$('#fee_outerauthor_add_button').click(function(){
	let author = document.getElementsByClassName('fee_outerauthor_hidden_unit');
	author = author[0];
	console.log(author);
	let author_show = document.getElementById('fee_outerauthor_show');
	console.log(author_show);
	author = $(author).clone();
	$(author).removeAttr("hidden");
	$(author_show).append($(author).clone());
	remove_outerauthor()
	worktype_click();
	check();
	auto();
});

//$('.fee_submit').click(function(){
//	submit_fee();
//});

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
	
	
}

function remove_author(){
	$('.fee_author_unit_icon').click(function(){
		let author_unit = document.getElementsByClassName('fee_author_unit');
		if(author_unit.length > 1){
			let a = $(this).parent();
			a.remove();
		}
	});
};

function remove_outerauthor(){
	$('.fee_outerauthor_unit_icon').click(function(){
		let author_unit = document.getElementsByClassName('fee_outerauthor_unit');
		if(author_unit.length > 1){
			let a = $(this).parent();
			a.remove();
		}
	});
};

$('.fee_submit').click(function(){
	let token = getCookie('token');
	let userId = '';
	let timeStamp = '';
	let wenZi = '0';
	let tuPian = '0';
	let shiPin = '0';
	let sheJi = '0';
	let zeRenbianJi = '0';
	let meiShuBianJi = '0';
	let gongChengJishu = '0';
	let guDingLaoWu = '0';
	let baoXiao = '0';
	let other = '0';
	let otherInfo = '0';
	fee_units = document.getElementsByClassName('fee_author_unit');
	for(let i = 1; i < fee_units.length; i++){
		let fee_unit = fee_units[i];
		let worktype=$(fee_unit).children(".field")[0];
		let fee=$($(fee_unit).children(".field")[1]).children('input').val();
//		console.log(fee);
//		console.log(worktype);
		worktype = $($(worktype).children()).children('.text').text();
//		console.log(worktype);
		if(worktype == '文字'){
			if(wenZi != '0'){
				swal('出错', '文字类型请勿重复提交', 'error');
				return;
			}
			wenZi = fee;
		}else if(worktype == '图片'){
			if(tuPian != '0'){
				swal('出错', '图片类型请勿重复提交', 'error');
				return;
			}
			tuPian = fee;
		}else if(worktype == '视频'){
			if(shiPin != '0'){
				swal('出错', '视频类型请勿重复提交', 'error');
				return;
			}
			shiPin = fee;
		}else if(worktype == '设计'){
			if(sheJi != '0'){
				swal('出错', '设计类型请勿重复提交', 'error');
				return;
			}
			sheJi = fee;
		}else if(worktype == '责任编辑'){
			if(zeRenbianJi != '0'){
				swal('出错', '责任编辑类型请勿重复提交', 'error');
				return;
			}
			zeRenbianJi = fee;
		}else if(worktype == '美术编辑'){
			if(meiShuBianJi != '0'){
				swal('出错', '美术编辑类型请勿重复提交', 'error');
				return;
			}
			meiShuBianJi = fee;
		}else if(worktype == '工程技术'){
			if(gongChengJishu != '0'){
				swal('出错', '工程技术类型请勿重复提交', 'error');
				return;
			}
			gongChengJishu = fee;
		}else if(worktype == '固定劳务'){
			if(guDingLaoWu != '0'){
				swal('出错', '固定劳务类型请勿重复提交', 'error');
				return;
			}
			guDingLaoWu = fee;
		}else if(worktype == '报销'){
			if(baoXiao != '0'){
				swal('出错', '报销类型请勿重复提交', 'error');
				return;
			}
			baoXiao = fee;
		}else if(worktype == '其他'){
			if(other != '0'){
				swal('出错', '其他类型请勿重复提交，请作为一条提交', 'error');
				return;
			}
			other = fee;
			let info=$($(fee_unit).children(".field")[2]).children('input').val();
//			console.log(info);
			otherInfo = info;
		}
	}
	let time = $('#time');
	time = $(time).children('input').val();
	timeStamp = Date.parse(time);
//	console.log(timeStamp);
	let userid = $('#adduserid');
	userId = $(userid).children('input').val();
	userId = userId.split('|')[0];
//	console.log(userId);
	$.post("../userFee/addUserFee", {
		'token': token,
		'userId': userId,
		'timeStamp': timeStamp,
		'wenZi': wenZi,
		'tuPian': tuPian,
		'shiPin': shiPin,
		'sheJi': sheJi,
		'zeRenbianJi': zeRenbianJi,
		'meiShuBianJi': meiShuBianJi,
		'gongChengJishu': gongChengJishu,
		'guDingLaoWu': guDingLaoWu,
		'baoXiao': baoXiao,
		'other': other,
		'otherInfo': otherInfo
	}, function(res){
//		console.log(res);
		if(typeof(res.error) != "undefined"){
			swal('失败', '提交失败', 'error');
		}else{
			swal('成功', '提交成功', 'success').then((value) => {
				cleanpage();
			});;
		}
	});
});


function auto() {
	$.get("../infoList/getOutsiderList", {
	},function(res){
//		console.log(res);
		outer = [];
		$.each(res, function(i, item) {
			outer.push(item.u_id_card+'|'+item.u_name);
		});
//		console.log(outer);
		$(".outer_id_card").autocomplete({ source: outer});
	});
	
	$.get("../userInfo/getBriefUserInfo", {
	},function(res){
//		console.log(res);
		userid = [];
		$.each(res, function(i, item) {
			userid.push(item.id+'|'+item.u_name);
		});
//		console.log(userid);
		$(".adduserid").autocomplete({ source: userid});
	});
};


function check(){
	$('.outer_id_card').blur(function(){
		let outer = $(this).val();
//		console.log(outer.split('|').length);
		if(outer.split('|').length < 2){
			for(let i = 0; i <= 2; i++){
				let outer_work_id = $(this).parent().siblings()[i];
				outer_work_id = $(outer_work_id).children('input');
				$(outer_work_id).removeAttr('hidden');
			}
		}else{
			for(let i = 0; i <= 2; i++){
				let outer_work_id = $(this).parent().siblings()[i];
				outer_work_id = $(outer_work_id).children('input');
				$(outer_work_id).attr('hidden', 'true');
			}
		}
	});
};

$('.outerfee_submit').click(function(){
	let token = getCookie('token');
	let time = $('#outertime');
	time = $(time).children('input').val();
	console.log(time);
	let timeStamp = Date.parse(time);
	console.log(timeStamp);
	fee_units = document.getElementsByClassName('fee_outerauthor_unit');
	for(let i = 1; i < fee_units.length; i++){
		let fee_unit = fee_units[i];
		let idcard=$($(fee_unit).children(".field")[0]).children('input').val();
		let name=$($(fee_unit).children(".field")[1]).children('input').val();
		let phone=$($(fee_unit).children(".field")[2]).children('input').val();
		let bankcard=$($(fee_unit).children(".field")[3]).children('input').val();
		let fee=$($(fee_unit).children(".field")[4]).children('input').val();
//		console.log(idcard.split('|').length);
		if(idcard.split('|').length == 2){
			let info=idcard.split("|");
			idcard=info[0];
			$.post("../userFee/addOutsiderFee", {
				'token': token,
				'idCard': idcard,
				'timeStamp': timeStamp,
				'totalFee':fee
			}, function(res){
//				console.log(res);
				if(typeof(res.error) != "undefined"){
					swal('失败', '提交失败', 'error');
				}else{
					swal('成功', '提交成功', 'success').then((value) => {
						//cleanpage();
					});;
				}
			});
			

		}else{
			
			$.post("../infoList/addOutsider", {
				'name':name,
				'token': token,
				'idCard': idcard,
				'phone':phone,
				'bankCard':bankcard
			}, function(res){
//				console.log(res);
				if(typeof(res.error) != "undefined"){
					swal('失败', '提交失败', 'error');
				}else{
					swal('成功', '提交成功', 'success').then((value) => {
						//cleanpage();
					});;
				}
			});
			
			$.post("../userFee/addOutsiderFee", {
				'token': token,
				'idCard': idcard,
				'timeStamp': timeStamp,
				'totalFee':fee
			}, function(res){
//				console.log(res);
				if(typeof(res.error) != "undefined"){
					swal('失败', '提交失败', 'error');
				}else{
					swal('成功', '提交成功', 'success').then((value) => {
						//cleanpage();
					});;
				}
			});
			
			
		}
		
//		console.log(idcard);
//		console.log(fee);
		if(idcard.length ==0||fee.length==0||timeStamp==0){
			swal('出错', '不能存在空项', 'error');
			return;
		}
		
	}
	
});

function cleanpage(){
	let time = $('#time');
	time = $(time).children('input');
	$(time).val('');
	let userid = $('#adduserid');
	userId = $(userid).children('input');
	$(userId).val('');
	let author = document.getElementsByClassName('fee_author_unit');
	author = author[0];
	author = $(author).clone();
//	console.log(author);
	let author_show = document.getElementById('fee_author_show');
//	console.log(author_show);
	$(author_show).empty();
	$(author_show).append(author);
	remove_author();
	worktype_click();
	$('.ui.dropdown').dropdown();
}

