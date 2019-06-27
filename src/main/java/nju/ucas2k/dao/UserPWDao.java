package nju.ucas2k.dao;

import nju.ucas2k.model.UserPW;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserPWDao {
    public UserPW selectByStudentId(String studentId);
    public int add(UserPW userPW);
    public int update(UserPW userPW);
    public int delete(String studentId);
}
