package nju.ucas2k.controller;

import com.github.pagehelper.Page;
import nju.ucas2k.model.Article;
import nju.ucas2k.service.ArticleService;
import nju.ucas2k.util.PageableList;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @GetMapping("/article")
    public ResEntity<PageableList<Article>> getArticle(int pageNum, int pageSize, String title, Date startDate, Date endDate){
        Page page = articleService.getArticle(pageNum,pageSize,title,startDate,endDate);
        return new ResEntity(200,new PageableList<Article>(page.getPageNum(),page.getPageSize(),page.getPages(),page.getResult()),null);
    }
}