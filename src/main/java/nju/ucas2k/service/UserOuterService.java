package nju.ucas2k.service;

import nju.ucas2k.model.UserOuter;

import java.util.List;

public interface UserOuterService {
    public int addUserOuter(UserOuter userOuter);
    public UserOuter getUserOuterById(long id);
    public List<UserOuter> getUserOuter();
    public int deleteUserOuter(long id);
    public int updateUesrOuter(UserOuter userOuter);
}
