package cn.com.Lyankun.springboot.service.impl;

import cn.com.Lyankun.springboot.entity.Petinfo;
import cn.com.Lyankun.springboot.service.PetInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = false)
public class PetInfoServiceImpl extends BaseServiceImpl<Petinfo> implements PetInfoService {
}
