package nju.ucas2k.service;

import nju.ucas2k.model.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUser();
    public List<User> getUncheckUser();
    public List<User> getUserByName(String name);
    public User getUserById(long id);
    public User getUserByStudentId(String studentId);

    /**
     * 默认添加普通用户
     * @param user
     * @param password
     * @return
     */
    public int addUser(User user, String password);

    /**
     * 添加用户，并设置用户密码和角色。(角色包括admin和ordinary)
     * @param user
     * @param password
     * @param role
     * @return
     */
    public int addUser(User user, String password, String role);

    public int updateUser(User user);
    public int updateAuthorized(String studentId, long authorized);

    public int deleteUser(String studentId);

    public int addRole(String studentId, String role);
    public int updateRole(long id, String role);
    public int deleteRole(long id);

    public int updatePassword(String studentId,String oldPassword,String newPassword);
    public int resetPassword(String studentId, String password);


}
