package nju.ucas2k.DaoTest;


import nju.ucas2k.dao.ArticleDao;
import nju.ucas2k.model.Article;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ArticleDaoTest {

    @Autowired
    ArticleDao articleDao;

    @Test
    public void contextLoads() {

        Article article = new Article();
        article.setDate(new Date());
        article.setReadNum(123);
        article.setTitle("oldtitle");
        article.setWechatId("wechatid");
        article.setZanNum(456);
//        articleDao.add(article);
//        System.out.println(article.getId());
        Date startTime = new Date();
        Date endTime = new Date();
        startTime.setDate(20);
        endTime.setDate(30);
        List list = articleDao.selectByTimeAndTitle(startTime,endTime,"old");
        System.out.println(list.size());

    }
}
