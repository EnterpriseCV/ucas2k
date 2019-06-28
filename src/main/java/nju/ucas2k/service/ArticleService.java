package nju.ucas2k.service;

import com.github.pagehelper.Page;
import nju.ucas2k.model.Article;

import java.util.Date;
import java.util.List;

public interface ArticleService {
    public int addArticle(Article article);
    public Page<Article> getArticle(int pageNum,int pageSize,String title, Date startDate, Date endDate);
}
