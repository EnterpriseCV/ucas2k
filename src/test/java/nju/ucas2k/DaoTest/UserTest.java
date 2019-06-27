package nju.ucas2k.DaoTest;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.dao.UserPWDao;
import nju.ucas2k.dao.UserRoleDao;
import nju.ucas2k.model.User;
import nju.ucas2k.model.UserPW;
import nju.ucas2k.model.UserRole;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {

    @Autowired
    UserDao userDao;
    @Autowired
    UserPWDao userPWDao;
    @Autowired
    UserRoleDao userRoleDao;


    @Test
    public void contextLoads() {

        UserRole userRole = new UserRole();
        userRole.setStudentId("1234567890");
        userRole.setRole("ordinary");
        userRoleDao.add(userRole);
        System.out.println("userRole:"+userRole.getId());

        User user = new User();


    }
}
