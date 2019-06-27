package nju.ucas2k.controller;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserDao ud;

    @GetMapping("/adminhello")
    public String sayHello(){
        return "hello admin";
    }

    @GetMapping("/ordinaryhello")
    public String sayHello2(){
        return "hello ordi";
    }
}
