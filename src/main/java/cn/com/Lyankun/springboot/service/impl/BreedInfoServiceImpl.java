package cn.com.Lyankun.springboot.service.impl;

import cn.com.Lyankun.springboot.entity.Breedinfo;
import cn.com.Lyankun.springboot.service.BreedInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class BreedInfoServiceImpl extends BaseServiceImpl<Breedinfo> implements BreedInfoService {

}
