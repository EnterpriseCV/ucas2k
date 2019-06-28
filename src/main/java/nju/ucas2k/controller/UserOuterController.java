package nju.ucas2k.controller;

import nju.ucas2k.model.UserOuter;
import nju.ucas2k.service.UserOuterService;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserOuterController {

    @Autowired
    UserOuterService userOuterService;

    @GetMapping("/userouter")
    public ResEntity<UserOuter> getUserOuter(long id){
        return new ResEntity(200,userOuterService.getUserOuter(id),null);
    }

    @PostMapping("/userouter")
    public ResEntity addUserOuter(UserOuter userOuter){
        return new ResEntity(200,userOuterService.addUserOuter(userOuter),null);
    }

    @PutMapping("/userouter")
    public ResEntity updateUserOuter(UserOuter userOuter){
        return new ResEntity(200,userOuterService.updateUesrOuter(userOuter),null);
    }

    @DeleteMapping("/userouter")
    public ResEntity deleteUserOuter(long id){
        return new ResEntity(200,userOuterService.deleteUserOuter(id),null);
    }

}
