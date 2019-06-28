package nju.ucas2k.util;

import org.springframework.util.DigestUtils;

public class PasswordMD5 {
    public static String getMD5(String password, String studentId){
        String base = password+"/"+studentId;
        return DigestUtils.md5DigestAsHex(base.getBytes());
    }

}
