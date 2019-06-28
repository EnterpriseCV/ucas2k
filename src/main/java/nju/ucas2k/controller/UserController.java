package nju.ucas2k.controller;

import nju.ucas2k.model.User;
import nju.ucas2k.service.UserService;
import nju.ucas2k.util.AuthorizedResult;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserService userService;

    final String successMsg = "success";

    @PostMapping("register")
    public ResEntity<Integer> register(String studentId,String name,String sex, String idCard,
                                       String college, String institute,String phone,
                                       String bankCard,String uWork,String password){
        User user = new User(0,studentId,name,sex,idCard,college,institute,
                                phone,bankCard,uWork,AuthorizedResult.WAITED);

        int res = userService.addUser(user,password);
        String msg = successMsg;
        if(res == 0){
            msg = "fail: 未添加成功，请检查是否该学号已注册";
        }
        return new ResEntity<>(200,res,msg);
    }
    @PutMapping("confirmUser")
    public ResEntity<Integer> check(String studentId,int authorized){
        // authorized:  1:通过   -1：未通过
        int res = userService.updateAuthorized(studentId,authorized);
        String msg = successMsg;
        if(res == 0){
            msg = "fail: 参数错误";
        }
        return new ResEntity<>(200,res,msg);
    }

    @GetMapping("allUser")
    public ResEntity<List<User>> getAllUser(){
        List<User> userList = userService.getAllUser();
        return new ResEntity<>(200,userList,successMsg);
    }
    @GetMapping("getBriefUserInfo")
    public ResEntity<List<User>> getBriefUserInfo(){
        List<User> userList = userService.getAllUser();
        return new ResEntity<>(200,userList,successMsg);
    }
    @GetMapping("getUserInfo")
    public ResEntity<User> getUserInfo(String studentId){
        User user = userService.getUserByStudentId(studentId);
        return new ResEntity<>(200,user,successMsg);
    }

    @GetMapping("uncheckedUser")
    public ResEntity<List<User>> getUncheckedUser(){
        List<User> userList = userService.getUncheckUser();
        return new ResEntity<>(200,userList,successMsg);
    }

    @PutMapping("updateUser")
    public ResEntity<Integer> updateUser(long id, String studentId, String name, String sex,
                                         String idCard, String college, String institute,
                                         String phone, String bankCard, String uWork){
        int res = 0;
        String msg = "fail: 权限不足";
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals(studentId)){
            User user = new User(id,studentId,name,sex,idCard,college,institute,
                    phone,bankCard,uWork,AuthorizedResult.PASS);
            res = userService.updateUser(user);
            msg = successMsg;
        }
        return new ResEntity<>(200,res,msg);
    }

    @DeleteMapping("deleteUser")
    public ResEntity<Integer> deleteUser(String studentId){
        int res = userService.deleteUser(studentId);
        return new ResEntity<>(200,res,successMsg);
    }


    @PutMapping("modifyPassword")
    public ResEntity<Integer> modifyPassword(String studentId,String oldPasswd,String newPasswd){
        int res = userService.updatePassword(studentId,oldPasswd,newPasswd);
        String msg = successMsg;
        if(res == 0){
            msg = "fail: 原密码错误";
        }
        return new ResEntity<>(200,res,msg);
    }
    @PutMapping("resetPassword")
    public ResEntity<Integer> resetPassword(String studentId,String password){
        int res = userService.resetPassword(studentId,password);
        return new ResEntity<>(200,res,successMsg);
    }



}
