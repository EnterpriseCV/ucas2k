package nju.ucas2k.dao;

import nju.ucas2k.model.UserOuter;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserOuterDao {
    public int add(UserOuter userOuter);
    public int deleteById(long id);
    public UserOuter selectById(long id);
    public int update(UserOuter userOuter);
}
