package nju.ucas2k.dao;


import nju.ucas2k.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    public User selectById(long id);
    public User selectByUsername(String username);
    public int add(User user);
    public int deleteById(long id);
    public int deleteByUesrname(String username);
    public int update(User user);
}
