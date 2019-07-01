//下拉菜单功能
$('.ui.dropdown').dropdown();
userclick();
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
userid = getCookie('userId');
token = getCookie('token');
loaduserinfo();
function loaduserinfo(){
	$.get("../userInfo/getUserInfo",{
		'userId':userid,
  	  	'token':token
	},function(res){
		show_info(res);
	});
}
//查看单个人信息
function userclick(){
$('.userbutton').click(function(){
	$('.usertable').attr('hidden','true');
	$('.userform').removeAttr('hidden');
	$('.audittable').attr('hidden','true');
	$('#user_info_label').addClass('active');
	$('#user_list_label').removeClass('active');
	$('#user_audit_label').removeClass('active');
	userid=$(this).attr("userid");
//	userid = getCookie("userId");
	token = getCookie("token");
	console.log(userid);
	console.log(token);
	$.post("../userInfo/getUserInfo",{
		'userId':userid,
  	  	'token':token
	},function(res){
		show_info(res);
	});
	
//	show_info(res);
});
}
//展示个人详细信息
function show_info(res) {
	res = res[0];
//	console.log(res.name);
	let user_name = $('#user_name');
	user_name.val(res.name);
	let student_id = $("#student_id");
	student_id.val(res.studentId);
	let userid = $("#user_id");
	$(userid).val(res.id);
	let userphone = $("#userphone");
	$(userphone).val(res.phone);
	let userwork = $("#userwork");
	$(userwork).val(res.work);
	let usercollege =$("#usercollege");
	$(usercollege).val(res.college);
	let userunit =$("#userunit");
	$(userunit).val(res.institute);
	let usersex =$("#usersex");
	$(usersex).val(res.sex);
	let userid_card = $("#userid_card");
	userid_card.val(res.idCard);
	let userbank_card = $("#userbank_card");
	userbank_card.val(res.bankCard);
}

//返回主界面
$('.userreturnbutton').click(function(){
	$('.userform').attr('hidden','true');
	$('.usertable').removeAttr('hidden');
});

$('.userchangebutton').click(function(){
	
	let userphone =$("#userphone");
	userphone=$(userphone).val();
	console.log(userphone);
	let userbank_card =$("#userbank_card");
	userbank_card=$(userbank_card).val();
	console.log(userbank_card);
	
	let user_id =$("#user_id");
	userid=$(user_id).val();
	console.log(userid);
	
	token = getCookie("token");
	
	$.post("../userInfo/modifyUserPhone",{
		'userId':userid,
		'token':token,
		'phone':userphone
	},function(res){
		if(typeof(res.error) != "undefined"){
			swal('失败', '修改电话号码失败', 'error');
		}
	});
	
	$.post("../userInfo/modifyUserBankCard",{
		'userId':userid,
		'token':token,
		'bankCard':userbank_card
	},function(res){
		if(typeof(res.error) != "undefined"){
			swal('失败', '修改银行卡失败', 'error');
		}
	});
	
	let user_newpassword =$("#user_newpassword");
	user_newpassword=$(user_newpassword).val();
	if(user_newpassword.length == 0 ){
		swal('成功', '修改成功', 'success');
		return;
	}
		
	let user_oldpassword =$("#user_oldpassword");
	user_oldpassword=$(user_oldpassword).val();
	if(user_oldpassword.length == 0 ){
		swal('出错', '请输入原始密码', 'error');
		return;
	}
	$.post("../userInfo/modifyPassword",{
		'userId':userid,
		'token':token,
		'oldPwd':user_oldpassword,
		'newPwd':user_newpassword
	},function(res){
		if(typeof(res.error) != "undefined"){
			swal('失败', '修改密码失败', 'error');
		}
	});
	swal('成功', '修改成功', 'success');
});