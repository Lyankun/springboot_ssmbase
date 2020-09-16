package cn.com.Lyankun.springboot.controller;

import cn.com.Lyankun.springboot.entity.Petinfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/petInfo")
public class PetInfoController extends BaseController<Petinfo> {

}
