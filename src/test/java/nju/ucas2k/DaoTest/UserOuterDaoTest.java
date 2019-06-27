package nju.ucas2k.DaoTest;

import nju.ucas2k.dao.UserOuterDao;
import nju.ucas2k.model.UserOuter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserOuterDaoTest {
    @Autowired
    private UserOuterDao userOuterDao;

    @Test
    public void contextLoads() {
        UserOuter userOuter = new UserOuter();
        userOuter.setName("name");
        userOuter.setIdCard("idcard");
        userOuter.setBankCard("bankcard");
        userOuter.setPhone("phone");
//        System.out.println("???");
        System.out.println(userOuterDao.add(userOuter));
        System.out.println(userOuterDao.selectById(userOuter.getId()));

        userOuter.setName("newname");
        userOuter.setIdCard("newname");
        userOuter.setBankCard("newname");
        userOuter.setPhone("newname");
        System.out.println(userOuterDao.update(userOuter));
        System.out.println(userOuterDao.selectById(userOuter.getId()));

        System.out.println(userOuterDao.deleteById(userOuter.getId()));
    }
}
