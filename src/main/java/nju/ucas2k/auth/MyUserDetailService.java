package nju.ucas2k.auth;

import nju.ucas2k.dao.UserDao;
import nju.ucas2k.dao.UserRoleDao;
import nju.ucas2k.model.User;
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
    UserDao ud;
    @Autowired
    UserRoleDao urd;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = ud.selectByUsername(s);
        if(user==null){
            throw new UsernameNotFoundException(s);
        }
        List<UserRole> userRoleList = urd.selectByUserId(user.getId());
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for(UserRole ur : userRoleList) {
            String roleName = ur.getRole();
            SimpleGrantedAuthority grant = new SimpleGrantedAuthority(roleName);
            authorities.add(grant);
        }
        return new MyUserDetails(user,authorities);
    }
}
