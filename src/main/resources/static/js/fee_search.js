let userid = getCookie('userId');
let token = getCookie('token');
$.post("../userFee/getUserFeeWithUserId", {
	'userId':userid,
	'token': token
}, function(res){
	console.log(res);
	showfeeinfo(res);
});

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

            return year + '-' + month;
//            return year + '-' + month + '-' + day;
        }
    }
});

$('.SearchByUser').click(function(){
	let userid = $(this).siblings('.userid');
	userid = $(userid).children('input').val();
	console.log(userid);
	let token = getCookie('token');
	if(userid.length == 0){
		$.post("../userFee/getAllFee", {
			'token': token
		}, function(res){
			console.log(res);
			showfeeinfo(res);
		});
	}else{
		$.post("../userFee/getUserFeeWithUserId", {
			'userId':userid,
			'token': token
		}, function(res){
			console.log(res);
			showfeeinfo(res);
		});
	}
});

$('.SearchByTime').click(function(){
	let starttime = $(this).siblings('#starttime');
	starttime = $(starttime).children('input');
	starttime = $(starttime).val();
	starttime = new Date(starttime+'-01');
	console.log('starttime' + starttime);
	starttime.setMonth(starttime.getMonth()-1);
	let endtime = $(this).siblings('#endtime');
	endtime = $(endtime).children('input').val();
	endtime = new Date(endtime+'-01');
	endtime.setMonth(endtime.getMonth()+1);
	starttime = Date.parse(starttime);
	endtime = Date.parse(endtime);
	console.log(starttime);
	console.log(endtime);
	let token = getCookie('token');
	$.post("../userFee/getUserFeeWithMonth", {
		'startStamp': starttime,
		'endStamp': endtime,
		'token': token
	}, function(res){
		showfeeinfo(res);
	});
});

$('.SearchByNormal').click(function(){
//	let userid = $(this).siblings('.userid');
//	userid = $(userid).children('input').val();
//	console.log(userid);
	let userid = getCookie('userId');
	let token = getCookie('token');
	$.post("../userFee/getUserFeeWithUserId", {
		'userId':userid,
		'token': token
	}, function(res){
		console.log(res);
		showfeeinfo(res);
	});
});

function showfeeinfo(res){
	let fee_user_container = $('.fee_user_container');
	fee_user_container.empty();
	wenZiT = 0;
	tuPianT = 0;
	shiPinT = 0;
	sheJiT = 0;
	zeRenbianJiT = 0;
	meiShuBianJiT = 0;
	gongChengJiShuT = 0;
	guDingLaoWuT = 0;
	baoXiaoT = 0;
	otherT = 0;
	$.each(res, function(i, item) {
		let idtd = $('<td></td>').text(item.id);
		let nametd = $('<td></td>').text(item.name);
		let time = new Date(item.timeStamp);
		let month_stamptd = $('<td></td>').text(time.getFullYear()+'-'+(time.getMonth()+1));
		let wenZitd = $('<td></td>').text(item.wenZi);
		let tuPiantd = $('<td></td>').text(item.tuPian);
		let shiPintd = $('<td></td>').text(item.shiPin);
		let sheJitd = $('<td></td>').text(item.sheJi);
		let zeRenbianJitd = $('<td></td>').text(item.zeRenbianJi);
		let meiShuBianJitd = $('<td></td>').text(item.meiShuBianJi);
		let gongChengJishutd = $('<td></td>').text(item.gongChengJiShu);
		let guDingLaoWutd = $('<td></td>').text(item.guDingLaoWu);
		let baoXiaotd = $('<td></td>').text(item.baoXiao);
		let othertd = $('<td></td>').text(item.other);
		wenZiT = wenZiT+parseInt(item.wenZi);
		tuPianT = tuPianT+parseInt(item.tuPian);
		shiPinT = shiPinT+parseInt(item.shiPin);
		sheJiT = sheJiT+parseInt(item.sheJi);
		zeRenbianJiT = zeRenbianJiT+parseInt(item.zeRenbianJi);
		meiShuBianJiT = meiShuBianJiT+parseInt(item.meiShuBianJi);
		gongChengJiShuT = gongChengJiShuT+parseInt(item.gongChengJiShu);
		guDingLaoWuT = guDingLaoWuT+parseInt(item.guDingLaoWu);
		baoXiaoT = baoXiaoT+parseInt(item.baoXiao);
		otherT = otherT+parseInt(item.other);
//		console.log(parseInt(item.wenZi));
//		console.log(parseInt(item.tuPian));
//		console.log(parseInt(item.shiPin));
//		console.log(parseInt(item.sheJi));
//		console.log(parseInt(item.zeRenbianJi));
//		console.log(parseInt(item.meiShuBianJi));
//		console.log(item.gongChengJiShu);
//		console.log(parseInt(item.gongChengJiShu));
//		console.log(parseInt(item.guDingLaoWu));
//		console.log(parseInt(item.baoXiao));
//		console.log(parseInt(item.other));
		let total = parseInt(item.wenZi)+parseInt(item.tuPian)+parseInt(item.shiPin)+
					parseInt(item.sheJi)+parseInt(item.zeRenbianJi)+parseInt(item.meiShuBianJi)+
					parseInt(item.gongChengJiShu)+parseInt(item.guDingLaoWu)+parseInt(item.baoXiao)+
					parseInt(item.other);
		console.log(total);
		let totaltd = $('<td></td>').text(total);
		
		let fee_tr = $('<tr></tr>');
		fee_tr.append(idtd);
		fee_tr.append(nametd);
		fee_tr.append(month_stamptd);
		fee_tr.append(wenZitd);
		fee_tr.append(tuPiantd);
		fee_tr.append(shiPintd);
		fee_tr.append(sheJitd);
		fee_tr.append(zeRenbianJitd);
		fee_tr.append(meiShuBianJitd);
		fee_tr.append(gongChengJishutd);
		fee_tr.append(guDingLaoWutd);
		fee_tr.append(baoXiaotd);
		fee_tr.append(othertd);
		fee_tr.append(totaltd);
		
		fee_user_container.append(fee_tr);
	});
	let idtd = $('<td></td>').text('总计');
	let nametd = $('<td></td>').text('');
	let month_stamptd = $('<td></td>').text('');
	let wenZitd = $('<td></td>').text(wenZiT);
	let tuPiantd = $('<td></td>').text(tuPianT);
	let shiPintd = $('<td></td>').text(shiPinT);
	let sheJitd = $('<td></td>').text(sheJiT);
	let zeRenbianJitd = $('<td></td>').text(zeRenbianJiT);
	let meiShuBianJitd = $('<td></td>').text(meiShuBianJiT);
	let gongChengJishutd = $('<td></td>').text(gongChengJiShuT);
	let guDingLaoWutd = $('<td></td>').text(guDingLaoWuT);
	let baoXiaotd = $('<td></td>').text(baoXiaoT);
	let othertd = $('<td></td>').text(otherT);
	let total = parseInt(wenZiT)+parseInt(tuPianT)+parseInt(shiPinT)+
				parseInt(sheJiT)+parseInt(zeRenbianJiT)+parseInt(meiShuBianJiT)+
				parseInt(gongChengJiShuT)+parseInt(guDingLaoWuT)+parseInt(baoXiaoT)+
				parseInt(otherT);
	console.log(total);
	let totaltd = $('<td></td>').text(total);
	let fee_tr = $('<tr></tr>');
	fee_tr.append(idtd);
	fee_tr.append(nametd);
	fee_tr.append(month_stamptd);
	fee_tr.append(wenZitd);
	fee_tr.append(tuPiantd);
	fee_tr.append(shiPintd);
	fee_tr.append(sheJitd);
	fee_tr.append(zeRenbianJitd);
	fee_tr.append(meiShuBianJitd);
	fee_tr.append(gongChengJishutd);
	fee_tr.append(guDingLaoWutd);
	fee_tr.append(baoXiaotd);
	fee_tr.append(othertd);
	fee_tr.append(totaltd);
	
	fee_user_container.append(fee_tr);
}