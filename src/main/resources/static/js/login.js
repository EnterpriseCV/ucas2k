$(".submit").click(function(){
	let user = document.getElementById("username");
	user = $(user).val();
	let password = document.getElementById("password");
	password = $(password).val();
	console.log(user.length);
	console.log(password.length);
	document.cookie = 'mod=none';

	if(user.length == 0 || password.length == 0){
		swal("不合法", "账号和密码不能为空", "error");
		return;
	}
	
	if(user.indexOf(" ") == -1 && password.indexOf(" ") == -1){
		$.post("/login",{
			'username':user,
	 	    'password':password
		},function(res){
			console.log(res);
	    	let result = res;
	    	if(typeof(result.error) == "undefined"){
	    		document.cookie = "token=" + result.token;
	    		document.cookie = "userId=" + result.userId;
	    		isAdmin(result.token);
//	    		window.location.href = "fee_admin.html";
	    	}else{
//	    		console.log("error");
//	    		$("#errormessage").removeAttr('hidden');
	    		swal("错误", "账号或密码错误", "error");
	    	}
		});
	}else{
		swal("不合法", "账号或者密码中存在不合法字符", "error");
	}
});

function isAdmin(token){
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
    		$("#errormessage").removeAttr('hidden');
    	}
	});
}
$('.signup').click(function(){
	window.location.href = "fee_login.html";
});

$(".func").click(function(){
	swal("登陆", "请先进行登陆");
});