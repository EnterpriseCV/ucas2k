package nju.ucas2k.service.impl;


import nju.ucas2k.dao.UserOuterDao;
import nju.ucas2k.model.UserOuter;
import nju.ucas2k.service.UserOuterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserOuterServiceImpl implements UserOuterService {

    @Autowired
    UserOuterDao userOuterDao;

    @Override
    public int addUserOuter(UserOuter userOuter) {
        return userOuterDao.add(userOuter);
    }

    @Override
    public UserOuter getUserOuterById(long id) {
        return userOuterDao.selectById(id);
    }

    @Override
    public List<UserOuter> getUserOuter() {
        return userOuterDao.selectAll();
    }

    @Override
    public int deleteUserOuter(long id) {
        return userOuterDao.deleteById(id);
    }

    @Override
    public int updateUesrOuter(UserOuter userOuter) {
        return userOuterDao.update(userOuter);
    }
}
