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

show20items();

function show20items(){
	$.post("../Article/getFirstPageArticleInfo", {
		'num': 20
	}, function(res){
		showarticleinfo(res);
	});
}

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

//            return year + '-' + month;
            return year + '-' + month + '-' + day;
        }
    }
});

$('.SearchByUser').click(function(){
	let userid = $(this).siblings('.userid');
	userid = $(userid).children('input').val();
	console.log(userid);
	let token = getCookie('token');
	if(userid.length == 0){
		$.post("../Article/getAllArticleInfo", {
			
		}, function(res){
			console.log(res);
			showarticleinfo(res);
		});
	}else{
		$.post("../Article/getArtcleInfoByUserId", {
			'userId': userid
		}, function(res){
			console.log(res);
			showarticleinfo(res);
		});
	}
});

$('.SearchByKey').click(function(){
	let keyword = $(this).siblings('.keyword');
	keyword = $(keyword).children('input').val();
	console.log(keyword);
	let token = getCookie('token');
	if(keyword.length == 0){
		$.post("../Article/getAllArticleInfo", {
			
		}, function(res){
			console.log(res);
			showarticleinfo(res);
		});
	}else{
		$.post("../Article/getArtcleInfoByKeyWord", {
			'keyWord':keyword
		}, function(res){
			console.log(res);
			showarticleinfo(res);
		});
	}
});

$('.SearchByTime').click(function(){
	let starttime = $(this).siblings('#starttime');
	starttime = $(starttime).children('input');
	starttime = $(starttime).val();
	starttime = new Date(starttime);
	starttime.setDate(starttime.getDate()-1);
	let endtime = $(this).siblings('#endtime');
	endtime = $(endtime).children('input').val();
	endtime = new Date(endtime);
	endtime.setDate(endtime.getDate()+1);
	starttime = Date.parse(starttime);
	endtime = Date.parse(endtime);
	let token = getCookie('token');
	$.post("../Article/getArtcleInfoByDate", {
		'startStamp': starttime,
		'endStamp': endtime
	}, function(res){
		console.log(res);
		showarticleinfo(res);
	});
});

function showarticleinfo(res){
	let article_user_container = $('.article_user_container');
	article_user_container.empty();
	$.each(res, function(i, item) {
//		let nametd = $("<td></td>");
//		nametd.addClass("name");
//		let userbutton=$('<button class="ui active button userbutton"></button>');
//		userbutton.attr('userid',item.id);
//		let I=$('<i class="file outline icon"></i>');
//		userbutton.append(I);
//		userbutton.append(item.title);
//		nametd.append(userbutton);
		
		let nametd = $('<td class="title"></td>').text(item.title);
		nametd.attr('articleid', item.id);
//		let numtd = $('<td class="num"></td>').text(item.num);
		let stamptd = $('<td class="stamp"></td>').text(item.date);
		let readtd = $('<td class="read"></td>').text(item.read);
//		let zantd = $('<td class="zan"></td>').text(item.zan);
		let detailtd = $("<td></td>");
		let detailbutton=$('<button class="ui active button detailbutton">详情</button>');
		detailtd.append(detailbutton);
//		let artdeltd = $("<td></td>");
//		let artdelbutton=$('<button class="ui active button artdelbutton">删除</button>');
//		artdeltd.append(artdelbutton);
		
		
		let article_tr = $('<tr></tr>');
		article_tr.append(nametd);
//		article_tr.append(numtd);
		article_tr.append(stamptd);
		article_tr.append(readtd);
//		article_tr.append(zantd);
		article_tr.append(detailtd);
//		article_tr.append(artdeltd);
		
		article_user_container.append(article_tr);
		
	});
	detailbutton();
//	artdelbutton();
}

function detailbutton(){
	$('.detailbutton').click(function(){
		let title = $(this).parent().siblings(".title").text();
		let read = $(this).parent().siblings(".read").text();
		let zan = $(this).parent().siblings(".zan").text();
		let articleid = $(this).parent().siblings(".title").attr('articleid');
		showdetailinfo(title, read, zan, articleid);
	});
}

function artdelbutton(){
	$('.artdelbutton').click(function(){
		let token = getCookie('token');
		let articleunit = $(this).parent().parent();
		let articleid = $(this).parent().siblings(".title").attr('articleid');
		$.post("../Article/deleteArticle", {
			'token':token,
			'articleId':articleid
		}, function(res){
			if(typeof(res.error) != "undefined"){
	    		swal('错误','删除失败','error');
	    		return;
	    	}else{
	    		swal('成功','删除成功','success');
	    		console.log()
	    		$(articleunit).remove();
	    	}
		});
	});
}

function showdetailinfo(title, read, zan, articleid){
	$('#infotitle').text(title);
	$('#infotitle').attr('articleid', articleid);
	$('#inforead').text(read);
	$('#infozan').text(zan);
	console.log(title, read, zan, articleid);
	
	$.post("../Article/getInsidersMessage", {
		'articleId':articleid
	}, function(res){
		showinsider(res);
	});
	$.post("../Article/getOutsidersMessage", {
		'articleId':articleid
	}, function(res){
		showousider(res);
	});
	
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
}

function showinsider(res){
	let inner_info_container = $('.inner_info_container');
	inner_info_container.empty();
	$.each(res, function(i, item) {
		let nametd = $('<td></td>').text(item.u_name);
		let work_nametd = $('<td></td>').text(item.work_name);
		let indeltd = $("<td></td>");
		let indelbutton=$('<button class="ui active button indelbutton">删除</button>');
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
		let articleid = $('#infotitle').attr('articleid');
		let tmp = $($(this).parent()).siblings();
		let userId = $(tmp[0]).attr('userid');
		let workId = $(tmp[0]).attr('workid');
		
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

//等待接口补充
function outdelbutton(){
	$('.outdelbutton').click(function(){
		
		
		swal({
			  title: "确定删除吗?",
			  text: "一旦删除将无法恢复",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			  outdelete(articleId, workId, userId);
		  } else {
			  swal("已取消");
		  }
		});
	});
}

// 等接口补充
function outdelete(articleId, workId, userId){
	$.post("../Article/deleteOutsiders", {	

	},function(res){
		if(typeof(res.error) != "undefined"){
    		swal('错误','删除外部人员出错','error');
    		return;
    	}
	});
}