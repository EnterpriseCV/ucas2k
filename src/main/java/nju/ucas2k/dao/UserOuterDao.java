package nju.ucas2k.dao;

import nju.ucas2k.model.UserOuter;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserOuterDao {
    public int add(UserOuter userOuter);
    public int deleteById(long id);
    public UserOuter selectById(long id);
    public int update(UserOuter userOuter);

    public List<UserOuter> selectAll();
}
