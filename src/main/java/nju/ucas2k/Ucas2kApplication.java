package nju.ucas2k;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@EnableTransactionManagement
public class Ucas2kApplication {

    public static void main(String[] args) {
        SpringApplication.run(Ucas2kApplication.class, args);
    }

}
