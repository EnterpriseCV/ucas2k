package nju.ucas2k.dao;

import nju.ucas2k.model.UserRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserRoleDao {
    public List<UserRole> selectByUserId(long userId);
    public UserRole selectById(long id);
    public int add(UserRole userRole);
    public int deleteById(long id);
    public int deleteByUserId(long userId);
}
