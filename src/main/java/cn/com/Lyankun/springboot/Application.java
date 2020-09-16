package cn.com.Lyankun.springboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *  项目启动类
 */
@SpringBootApplication
@MapperScan(basePackages = "cn.com.Lyankun.springboot.mapper")  //扫描到mapper接口
public class Application {

    //项目的启动方法
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

}
