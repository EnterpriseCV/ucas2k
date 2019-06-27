package nju.ucas2k.dao;

import nju.ucas2k.model.Article;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface ArticleDao {

    public int add(Article article);
    public List<Article> selectByTimeAndTitle(Date startTime, Date endTime,String title);
}


