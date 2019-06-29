package nju.ucas2k.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import nju.ucas2k.dao.ArticleDao;
import nju.ucas2k.model.Article;
import nju.ucas2k.service.ArticleService;
import nju.ucas2k.util.PageableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleDao articleDao;

    @Override
    public int addArticle(Article article) {
        return articleDao.add(article);
    }

    @Override
    public PageableList<Article> getArticle(int pageNum, int pageSize, String title, Date startDate, Date endDate) {
        if(pageNum<=0){
            pageSize=0x7fffffff;
        }
        Page page = PageHelper.startPage(pageNum,pageSize);
        page.setOrderBy("`date` desc");
        articleDao.selectByTimeAndTitle(startDate,endDate,title);
        return new PageableList(page);
    }
}
