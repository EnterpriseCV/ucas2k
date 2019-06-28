package nju.ucas2k.service;

import nju.ucas2k.model.UserOuter;

public interface UserOuterService {
    public int addUserOuter(UserOuter userOuter);
    public UserOuter getUserOuter(long id);
    public int deleteUserOuter(long id);
    public int updateUesrOuter(UserOuter userOuter);
}
