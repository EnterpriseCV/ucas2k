package nju.ucas2k.ServiceTest;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.dao.UserPWDao;
import nju.ucas2k.dao.UserRoleDao;
import nju.ucas2k.model.User;
import nju.ucas2k.model.UserRole;
import nju.ucas2k.service.UserService;
import nju.ucas2k.util.UserRoleType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {

    @Autowired
    UserService userService;

    @Test
    public void contextLoads() {

        User user = new User(0,"admin","管理员","男","150122","中国科学院大学",
                    "微信公众号","1","0","管理员",1);
        userService.addUser(user,"123", UserRoleType.ADMIN);
        System.out.println(userService.getUserByStudentId("admin"));

    }
}
