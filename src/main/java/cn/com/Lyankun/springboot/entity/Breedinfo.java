package cn.com.Lyankun.springboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer","handler" })
public class Breedinfo implements Serializable{
    /**  */
    private Integer breedid;

    /**  */
    private String breedname;

    public Integer getBreedid() {
        return breedid;
    }

    public void setBreedid(Integer breedid) {
        this.breedid = breedid;
    }

    public String getBreedname() {
        return breedname;
    }

    public void setBreedname(String breedname) {
        this.breedname = breedname == null ? null : breedname.trim();
    }
}