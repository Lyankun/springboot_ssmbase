package cn.com.Lyankun.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/model")
public class ModelController {

    @RequestMapping("/toShowPage")
    public String toShoePage(){
        return "showPage";
    }
}
