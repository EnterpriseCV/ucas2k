package nju.ucas2k.auth;

import nju.ucas2k.model.User;
import nju.ucas2k.model.UserPW;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class MyUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    // 用户信息
    private UserPW userPW;
    // 用户角色
    private Collection<? extends GrantedAuthority> authorities;

    public MyUserDetails(UserPW userPW, Collection<? extends GrantedAuthority> authorities){
        this.userPW = userPW;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.userPW.getPassword();
    }

    @Override
    public String getUsername() {
        return this.userPW.getStudentId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
