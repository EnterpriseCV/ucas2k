package nju.ucas2k.dao;


import nju.ucas2k.model.User;
import nju.ucas2k.model.UserPW;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDao {
    public List<User> selectAllUser();
    public List<User> selectUncheckedUser();
    public User selectById(long id);
    public User selectByStudentId(String studentId);
    public List<User> selectByUsername(String username);

    public int addUser(User user);

    public int update(User user);
    public int updateAuthorizedByStudentId(String studentId, long authorized);
    public int updateAuthorizedById(long id, long authorized);

    public int deleteById(long id);
    public int deleteByStudentId(String studentId);
}
