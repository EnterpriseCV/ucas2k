package nju.ucas2k.controller;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.model.User;
import nju.ucas2k.service.UserService;
import nju.ucas2k.util.AuthorizedResult;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("register")
    public ResEntity<Integer> register(String studentId,String name,String sex, String idCard,
                                       String college, String institute,String phone,
                                       String bankCard,String uWork,String password){
        User user = new User(0,studentId,name,sex,idCard,college,institute,
                                phone,bankCard,uWork,AuthorizedResult.WAITED);

        int res = userService.addUser(user,password);
        return new ResEntity<>(200,res,"success");
    }
    @PostMapping("confirmUser")
    public ResEntity<Integer> check(String studentId,int authorized){
        // authorized:  1:通过   -1：未通过
        int res = userService.updateAuthorized(studentId,authorized);
        String msg = "success";
        if(res == 0){
            msg = "fail: authorized参数错误";
        }
        return new ResEntity<>(200,res,msg);
    }

    @GetMapping("allUser")
    public ResEntity<List<User>> getAllUser(){
        List<User> userList = userService.getAllUser();
        return new ResEntity<>(200,userList,"success");
    }
    @GetMapping("uncheckedUser")
    public ResEntity<List<User>> getUncheckedUser(){
        List<User> userList = userService.getUncheckUser();
        return new ResEntity<>(200,userList,"success");
    }

    @PostMapping("modifyPassword")
    public ResEntity<Integer> modifyPassword(String studentId,String oldPasswd,String newPasswd){
        int res = userService.updatePassword(studentId,oldPasswd,newPasswd);
        String msg = "success";
        if(res == 0){
            msg = "fail: 原密码错误";
        }
        return new ResEntity<>(200,res,msg);
    }



}
