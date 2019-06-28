package nju.ucas2k.service.impl;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.dao.UserPWDao;
import nju.ucas2k.dao.UserRoleDao;
import nju.ucas2k.model.User;
import nju.ucas2k.model.UserPW;
import nju.ucas2k.model.UserRole;
import nju.ucas2k.service.UserService;
import nju.ucas2k.util.AuthorizedResult;
import nju.ucas2k.util.UserRoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Autowired
    UserPWDao userPWDao;
    @Autowired
    UserRoleDao userRoleDao;

    @Override
    public List<User> getAllUser() {
        return userDao.selectAllUser();
    }

    @Override
    public List<User> getUncheckUser() {
        return userDao.selectUncheckedUser();
    }

    @Override
    public List<User> getUserByName(String name) {
        return userDao.selectByUsername(name);
    }

    @Override
    public User getUserById(long id) {
        return userDao.selectById(id);
    }

    @Override
    public User getUserByStudentId(String studentId) {
        return userDao.selectByStudentId(studentId);
    }

    @Override
    public int addUser(User user, String password) {
        return addUser(user,password, UserRoleType.USER);
    }

    @Override
    public int addUser(User user, String password, String role) {
        int result = 0;
        try {
            result = userDao.addUser(user);
            if(result > 0){
                String passwd = new BCryptPasswordEncoder().encode(password);
                userPWDao.add(new UserPW(user.getStudentId(),passwd));
                userRoleDao.add(new UserRole(0,user.getStudentId(),role));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return result;
        }
        return result;
    }

    @Override
    public int updateUser(User user) {
        return userDao.update(user);
    }

    @Override
    public int updateAuthorized(String studentId, long authorized) {
        if(authorized == AuthorizedResult.PASS){
            return userDao.updateAuthorizedByStudentId(studentId, authorized);
        }else if(authorized == AuthorizedResult.REJECT){
            return deleteUser(studentId);
        }
        return 0;
    }

    @Override
    public int deleteUser(String studentId) {
        userPWDao.delete(studentId);
        userRoleDao.deleteByStudentId(studentId);
        return userDao.deleteByStudentId(studentId);
    }

    @Override
    public int addRole(String studentId, String role) {
        return userRoleDao.add(new UserRole(0,studentId,role));
    }

    @Override
    public int updateRole(long id, String role) {
        return userRoleDao.updateById(id, role);
    }

    @Override
    public int deleteRole(long id) {
        return userRoleDao.deleteById(id);
    }

    @Override
    public int updatePassword(String studentId, String oldPassword, String newPassword) {
        UserPW userPW = userPWDao.selectByStudentId(studentId);
        if(new BCryptPasswordEncoder().matches(oldPassword,userPW.getPassword())){
            return userPWDao.update(new UserPW(studentId,new BCryptPasswordEncoder().encode(newPassword)));
        }
        return 0;
    }

    @Override
    public int resetPassword(String studentId, String password) {
        return userPWDao.update(new UserPW(studentId,new BCryptPasswordEncoder().encode(password)));
    }

}
