package nju.ucas2k.dao;

import nju.ucas2k.model.UserRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserRoleDao {
    public List<UserRole> selectByStudentId(String studentId);
    public UserRole selectById(long id);

    public int add(UserRole userRole);

    public int update(UserRole userRole);
    public int updateById(long id, String role);

    public int deleteById(long id);
    public int deleteByStudentId(String studentId);
}
