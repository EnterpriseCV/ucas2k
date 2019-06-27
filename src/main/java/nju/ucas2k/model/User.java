package nju.ucas2k.model;

import lombok.Data;

@Data
public class User {
    private long id;
    private String studentId; // 学号
    private String name; // 姓名
    private String sex; // 性别
    private String idCard; // 身份证号
    private String college; // 学院
    private String institute; // 培养单位
    private String phone; // 电话
    private String bankCard; // 银行卡
    private String uWork; // 职位
    private long authorized; // 是否审核 0:未审核，1:审核
}
