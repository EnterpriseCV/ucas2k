package nju.ucas2k.config;

import nju.ucas2k.auth.MyUserDetailService;
import nju.ucas2k.util.UserRoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationProvider securityProvider;

    @Override
    protected UserDetailsService userDetailsService() {
        //自定义用户信息类
        return this.userDetailsService;
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //自定义AuthenticationProvider
        auth.authenticationProvider(securityProvider);
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/allUser","/confirmUser","/getUserInfo","/updateUser").hasAuthority(UserRoleType.ADMIN)
                .antMatchers("/getUserInfo","/updateUser").hasAuthority(UserRoleType.USER)
                .antMatchers("/register","/images/**","/webjars/**", "/components/**","/js/**","/css/**","/templates/**","/storePic/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin().permitAll()
                .defaultSuccessUrl("/allUser").failureUrl("/login?error").permitAll().and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login").permitAll();
        http.csrf().disable();
    }

}