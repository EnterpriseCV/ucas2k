//下拉菜单功能
$('.ui.dropdown').dropdown();
userclick();
userdelete();
loaduser();

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

//测试数据[{\"id\":\"0\",\"username\":\"张三\","\usernum"\:"\123"\,"\usergender\":\"男\",\"isadmin\":\"是\",\"userapart\":\"技术部\",\"userwork\":\"美术编辑\",userschool\":\"计算机学院\",\"userunit\":\"计算机所\",\"accout\":\"123\",\"password\":\"111\"}]
//载入所有用户简要信息,****在修改后也应该重载
function loaduser(){
	let userinfo_containtb = $("#containertb");
	let userinfo_containtr = $("#containertr");
	token = getCookie('token');
	$.get("../userInfo/getAllUserInfo", {
  	  	'token':token
	},function(res){
 		show_allinfo(res);
 		
	});
}

$('.loaduserbutton').click(function(){
	let userinfo_containtb = $("#containertb");
	let userinfo_containtr = $("#containertr");
	// userinfo_containtb.empty();	
	token = getCookie('token');
	$.get("../userInfo/getAllUserInfo", {
  	  	'token':token
	},function(res){
		console.log(res);
 		show_allinfo(res);
 		
	});
	console.log(1);
});

$('.loadauditusers').click(function(){
	token = getCookie('token');
	$.get("../userRegister/getWaitedTable", {
  	  	'token':token
	},function(res){
		console.log(res);
 		show_allreginfo(res);
	});
	console.log(1);
});
//显示所有人简略信息
function show_allinfo(res) {
	let userinfo_containtb = $("#containertb");
	userinfo_containtb.empty();	
	//res = eval('(' + res + ')');
	$.each(res, function(i, item) {
		let nametd = $("<td></td>");
		nametd.addClass("name");
		let userbutton=$('<button class="ui active button userbutton"></button>');
		userbutton.attr('userid',item.id);
		let I=$('<i class="user icon"></i>');
		userbutton.append(I);
		userbutton.append(item.name);
		nametd.append(userbutton);

		let sextd = $('<td class="sex"></td>').text(item.sex);
		let worktd = $('<td class="work"></td>').text(item.work);
		let student_idtd = $('<td class="student_id"></td>').text(item.studentId);
		let collegetd = $('<td class="college"></td>').text(item.college);
		let unittd = $('<td class="unit"></td>').text(item.institute);
		let delbutton = $('<button class="ui button deleteuserbutton">删除</button>');
		let resetbutton = $('<button class="ui button resetbutton">重置密码</button>');
		let discardtd = $('<td class="discard"> </td>');
		discardtd.append(delbutton);
		discardtd.append(resetbutton);

		userinfo_containtr=$('<tr id="containertr"></tr>')
		userinfo_containtr.append(nametd);
		userinfo_containtr.append(sextd);
		userinfo_containtr.append(worktd);
		userinfo_containtr.append(student_idtd);
		userinfo_containtr.append(collegetd);
		userinfo_containtr.append(unittd);
		userinfo_containtr.append(discardtd);
		userinfo_containtb.append(userinfo_containtr);
		
    });
	console.log(1);
	userclick();
	userdelete();
	passwordreset();
}
//显示申请注册人的简略信息
function show_allreginfo(res) {
	let userinfo_containtb = $("#regcontainertb");
	userinfo_containtb.empty();	
	//res = eval('(' + res + ')');
	$.each(res, function(i, item) {
		let nametd = $('<td class="name"></td>').text(item.u_name);
		nametd.attr('waitid', item.wait_id);
//		nametd.addClass("name");
//		let userbutton=$('<button class="ui active button userbutton"></button>');
//		userbutton.attr('userid',item.id);
//		let I=$('<i class="user icon"></i>');
//		userbutton.append(I);
//		userbutton.append(item.username);
//		nametd.append(userbutton);

		let sextd = $('<td class="sex"></td>').text(item.u_sex);
		let worktd = $('<td class="u_work"></td>').text(item.u_work);
		let collegetd = $('<td class="college"></td>').text(item.u_college);
		let institutetd = $('<td class="unit"></td>').text(item.u_institute);
		let phonetd = $('<td class="phone"></td>').text(item.u_phone);
		let student_idtd = $('<td class="student_id"></td>').text(item.u_student_id);		
		let id_cardtd = $('<td class="id_card"></td>').text(item.u_id_card);
		let bank_cardtd = $('<td class="bank_card"></td>').text(item.u_bank_card);
		let discardtd = $('<td class="discard"> \
			              	<div class="ui buttons"> \
							  <button class="ui positive button passbutton">通过</button> \
							  <div class="or"></div> \
							  <button class="ui button nopassbutton">拒绝</button> \
							</div> \
			            </td>');

		userinfo_containtr=$('<tr id="regcontainertr"></tr>')
		userinfo_containtr.append(nametd);
		userinfo_containtr.append(sextd);
		userinfo_containtr.append(worktd);
		userinfo_containtr.append(collegetd);
		userinfo_containtr.append(institutetd);
		userinfo_containtr.append(phonetd);
		userinfo_containtr.append(student_idtd);
		userinfo_containtr.append(id_cardtd);
		userinfo_containtr.append(bank_cardtd);
		userinfo_containtr.append(discardtd);
		userinfo_containtb.append(userinfo_containtr);
		
    });
	console.log(1);
	userclick();
	userpass();
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
	$.get("../userInfo/getUserInfo",{
		'userId':userid,
  	  	'token':token
	},function(res){
		console.log(res);
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
	
//添加用户
$('.adduserbutton').click(function(){
	window.location.href = "fee_login.html";
//	$('.usertable').attr('hidden','true');
//	$('.userform').removeAttr('hidden');
//	$('.audittable').attr('hidden','true');
//	$('#user_info_label').addClass('active');
//	$('#user_list_label').removeClass('active');	
//	$('#user_audit_label').removeClass('active');
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

//返回主界面
$('.userreturnbutton').click(function(){
	$('.userform').attr('hidden','true');
	$('.usertable').removeAttr('hidden');
});

//通过审核和不通过审核
function userpass(){
	$('.passbutton').click(function(){
		let user_unit = $(this).parent().parent();
		user_unit = $(user_unit).siblings('.name');
		waitId = user_unit.attr('waitid');
		token = getCookie('token');
		$.post("../userRegister/confirmUser",{
			'waitId':waitId,
			'token':token
		},function(res){
			console.log(res);
			if(typeof(res.error) != "undefined"){
				swal('失败', '通过失败', 'error');
			}else{
				swal('成功', '通过成功', 'success').then((value) => {
					user_unit.parent().remove();
				});;
			}
		});
	});
	$('.nopassbutton').click(function(){
		let user_unit = $(this).parent().parent();
		user_unit = $(user_unit).siblings('.name');
		waitId = user_unit.attr('waitid');
		token = getCookie('token');
		$.post("../userRegister/auditFailedUser",{
			'waitId':waitId,
			'token':token
		},function(res){
			console.log(res);
			if(typeof(res.error) != "undefined"){
				swal('失败', '拒绝失败', 'error');
			}else{
				swal('成功', '拒绝成功', 'success').then((value) => {
					user_unit.parent().remove();
				});;
			}
		});
	});
}

//重置密码
function passwordreset(){
	$('.resetbutton').click(function(){
		token = getCookie('token');
		tr=$(this).parent();
		td=$(tr).parent();
		Button=$(td).children().find(".userbutton");
		userid=$(Button).attr("userid");
		swal({
			  title: "确定重置吗?",
			  text: "一旦重置将无法恢复",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			  resetpassword(userid, token);
		  } else {
			swal("已取消");
		  }
		});
	});
}

function resetpassword(userid, token){
	$.post("../userInfo/resetPassword",{
		'userId':userid,
		'token':token
	},function(res){
		if(typeof(res.error) != "undefined"){
			swal("出错", "重置出错", "error");
		}else{
			swal("成功", "重置成功", "success");
		}
	});
}

//删除用户
function userdelete(){
	$('.deleteuserbutton').click(function(){
		console.log(11)
		tr=$(this).parent();
		td=$(tr).parent();
		Button=$(td).children().find(".userbutton");
		userid=$(Button).attr("userid");
		console.log(userid);
		swal({
		  title: "确定删除吗?",
		  text: "一旦删除将无法恢复",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			  deleteajax(Button);
		  } else {
			swal("已取消");
		  }
		});
	});
}

function deleteajax(userid) {
	userid=$(Button).attr("userid");
	token = getCookie('token');
	$.post("../userInfo/deleteUserInfo",{
		'userId':userid,
		'token':token
	},function(res){
		if(typeof(res.error) != "undefined"){
			swal("出错", "删除出错", "error");
		}else{
			swal("成功", "删除成功", "success");
			$(Button).parent().parent().remove();
		}
	});
}

$('#user_info_label').click(function(){
	$('#user_info_label').addClass('active');
	$('#user_list_label').removeClass('active');
	$('#user_audit_label').removeClass('active');
	let page = $('.userform');
	page.removeAttr('hidden');
	page = $('.usertable');
	page.attr('hidden', 'true');
	page = $('.audittable');
	page.attr('hidden', 'true');
});

$('#user_list_label').click(function(){
	$('#user_info_label').removeClass('active');
	$('#user_list_label').addClass('active');
	$('#user_audit_label').removeClass('active');
	let page = $('.userform');
	page.attr('hidden', 'true');
	page = $('.usertable');
	page.removeAttr('hidden');
	page = $('.audittable');
	page.attr('hidden', 'true');
});

$('#user_audit_label').click(function(){
	$('#user_info_label').removeClass('active');
	$('#user_list_label').removeClass('active');
	$('#user_audit_label').addClass('active');
	let page = $('.userform');
	page.attr('hidden', 'true');
	page = $('.usertable');
	page.attr('hidden', 'true');
	page = $('.audittable');
	page.removeAttr('hidden');
});

