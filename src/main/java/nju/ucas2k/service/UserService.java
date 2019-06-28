package nju.ucas2k.service;

import nju.ucas2k.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUser();
    public List<User> getUserByName(String name);
    public User getUserById(long id);
    public User getUserByStudentId(String studentId);

    public int addUser(User user, String password, String role);

    public int updateUser(User user);
    public int updatePassword(String studentId, String password);
    public int updateRole(String id, String role);


}
