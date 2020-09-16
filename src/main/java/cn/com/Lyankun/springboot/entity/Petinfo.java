package cn.com.Lyankun.springboot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;


@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class Petinfo {
    /**  */
    private Integer petid;

    /**  */
    private String petname;

    /**  */
    private Integer breedid;

    /**  */
    private Integer petsex;

    /**  */
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date birthday;

    /**  */
    private String description;

    private Breedinfo breedinfo;

    public Integer getPetid() {
        return petid;
    }

    public void setPetid(Integer petid) {
        this.petid = petid;
    }

    public String getPetname() {
        return petname;
    }

    public void setPetname(String petname) {
        this.petname = petname == null ? null : petname.trim();
    }

    public Integer getBreedid() {
        return breedid;
    }

    public void setBreedid(Integer breedid) {
        this.breedid = breedid;
    }

    public Integer getPetsex() {
        return petsex;
    }

    public void setPetsex(Integer petsex) {
        this.petsex = petsex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Breedinfo getBreedinfo() {
        return breedinfo;
    }

    public void setBreedinfo(Breedinfo breedinfo) {
        this.breedinfo = breedinfo;
    }
}