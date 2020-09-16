package cn.com.Lyankun.springboot.mapper;



import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BaseMapper<T> {

    //根据主键id删除单个数据
    int deleteByPrimaryKey(Integer id) throws Exception;

    //添加
    int insert(T t) throws Exception;

    //动态添加（根据具体的字段）
    int insertSelective(T t) throws Exception;

    //根据主键id查询单个数据
    T selectByPrimaryKey(Integer id) throws Exception;

    //查询所有数据
    List<T> selectAll() throws Exception;

    //动态修改（根据具体的字段）
    int updateByPrimaryKeySelective(T t) throws Exception;

    //修改
    int updateByPrimaryKey(T t) throws Exception;

    //根据分页查询数据（普通查询）
    List<T> selectPageByPramas(T t) throws Exception;

    //根据主键批量删除
    Integer deleteBatchByIds(Integer[] ids) throws Exception;
}
