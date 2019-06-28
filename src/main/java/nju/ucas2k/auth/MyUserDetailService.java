package nju.ucas2k.auth;

import nju.ucas2k.dao.UserPWDao;
import nju.ucas2k.dao.UserRoleDao;
import nju.ucas2k.model.UserPW;
import nju.ucas2k.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service("userDetailsService")
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    UserPWDao userPWDao;
    @Autowired
    UserRoleDao userRoleDao;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserPW userPW = userPWDao.selectByStudentId(s);
        if(userPW==null){
            throw new UsernameNotFoundException(s);
        }
        List<UserRole> userRoleList = userRoleDao.selectByStudentId(userPW.getStudentId());
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for(UserRole ur : userRoleList) {
            String roleName = ur.getRole();
            SimpleGrantedAuthority grant = new SimpleGrantedAuthority(roleName);
            authorities.add(grant);
        }
        return new MyUserDetails(userPW,authorities);
    }

}
