package nju.ucas2k.config;

import nju.ucas2k.auth.MyUserDetailService;
import nju.ucas2k.util.UserRoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
//        http.authorizeRequests()
//                .antMatchers("/allUser","/confirmUser","/getBriefUserInfo","/deleteUser","/uncheckedUser",
//                        "/resetPassword","/fee","/userouter").hasAuthority(UserRoleType.ADMIN)
//                .antMatchers(HttpMethod.GET,"/getUserInfo","/fee","/userouter","/article").hasAnyAuthority(UserRoleType.USER,UserRoleType.ADMIN)
//                .antMatchers(HttpMethod.POST,"/fee","/userouter").hasAnyAuthority(UserRoleType.USER,UserRoleType.ADMIN)
//                .antMatchers(HttpMethod.PUT,"/updateUser","/modifyPassword").hasAnyAuthority(UserRoleType.USER,UserRoleType.ADMIN)
//                .antMatchers("/register","/webjars/**","/images/**","/**.html", "/components/**","/js/**","/css/**","/templates/**","/swagger-resources/**").permitAll()
//                .anyRequest().authenticated()
//                .and().formLogin()
//                .loginPage("/login.html").permitAll()
//                .defaultSuccessUrl("/fee_login.html").failureUrl("/login.html?error").permitAll().and()
//                .logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login.html").permitAll();
//        http.csrf().disable();
    }

}