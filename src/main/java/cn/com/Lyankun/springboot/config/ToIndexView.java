package cn.com.Lyankun.springboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 *   设置访问首页showEmp.jsp
 *   @Configuration 实例化此类，项目在启动过程中自动读取的自定义配置
 */
@Configuration
public class ToIndexView extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers( ViewControllerRegistry registry ) {
        System.out.println("执行了配置访问首页面的工具类。。");
        //   /为访问的路径    /static/html/showEmp.html为文件的实际路径，会自动拼接访问路径前后缀
        registry.addViewController( "/" ).setViewName( "showPetInfo" );
        registry.setOrder( Ordered.HIGHEST_PRECEDENCE );
        super.addViewControllers( registry );
    }
}
