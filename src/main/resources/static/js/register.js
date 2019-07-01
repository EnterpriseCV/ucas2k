$.get("../infoList/getWorkClass", {
  	  	
	},function(res){
		console.log(res);
 		showworklist(res);
 		
	});
$.get("../infoList/getCollegeList", {
	  	
},function(res){
	console.log(res);
		showcollegelist(res);
		
});
function showworklist(res){
	let work_containtr=$('#userworklist');
	work_containtr.empty();
	$.each(res, function(i, item) {
		let userworkdiv = $('<div class="item"></div>').text(item.work_class);
		work_containtr.append(userworkdiv);
	});
}
function showcollegelist(res){
	let college_containtr=$('#usercollegelist');
	college_containtr.empty();
	$.each(res, function(i, item) {
		let usercollegediv = $('<div class="item"></div>').text(item.college_name);
		college_containtr.append(usercollegediv);
	});
}

$('.userchangebutton').click(function(){
    let username = $("#username");
    username = $(username).val();
    console.log(username);
   	let student_id = $("#student_id");
   	student_id = $(student_id).val();
   	console.log(student_id);
   	let password = $("#password");
   	password = $(password).val();
   	console.log(password);
	let usergender = $("#usersex");
	usergender = $(usergender).text();
	console.log(usergender);
	let userunit = $("#userunit");
	userunit = $(userunit).val();
	console.log(userunit);
	let userwork =$("#userwork");
	userwork=$(userwork).siblings('.text').text();
	console.log(userwork);
	let userphone = $("#userphone");
	userphone = $(userphone).val();
	console.log(userphone);
	let usercollege =$("#usercollege");
	usercollege=$(usercollege).siblings('.text').text();
	console.log(usercollege);
	let userbank_card = $("#userbank_card");
	userbank_card = $(userbank_card).val();
	console.log(userbank_card);
	let userid_card = $("#userid_card");
	userid_card = $(userid_card).val();
	console.log(userid_card);
	if(username.length == 0 || student_id.length == 0|| usergender.length==0||password.length==0||
		userunit.length == 0 || userwork.length == 0 || usercollege.length == 0 || userphone.length == 0
		|| userbank_card.length == 0 || userid_card.length == 0){
		swal("错误", "存在空项", "error");
		return;
	}
	if(userid_card.search('[0-9]{17}[0-9|x]{1}') < 0) {
		swal("错误", "身份证号格式出错", "error");
		return;
	}
	if(student_id.search('\\w{15}') < 0) {
		swal("错误", "学号格式出错", "error");
		return;
	}
	if(userphone.search('[0-9]{11}') < 0) {
		swal("错误", "手机号格式出错", "error");
		return;
	}
	if(userbank_card.search('[0-9]{19}|[0-9]{16}') < 0){
		swal("错误", "银行卡号格式出错", "error");
		return;
	}
	$.post("../userRegister/register",{
		'name':username,
		'sex':usergender,
		'college':usercollege,
		'studentId':student_id,
		'phone':userphone,
		'bankCard':userbank_card,
		'idCard':userid_card,
		'institute':userunit,
		'password':password,
		'work':userwork
	},function(res){
		if(res == null){
			swal('成功', '注册成功，请等待管理员审核', 'success').then((value) => {
				window.location.href = "login.html";
			});;
		}else{
			swal('失败', '传入信息有误', 'error');
		}
	});
});
	