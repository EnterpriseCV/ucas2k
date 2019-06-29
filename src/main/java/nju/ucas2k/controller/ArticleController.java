package nju.ucas2k.controller;

import com.github.pagehelper.Page;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import nju.ucas2k.model.Article;
import nju.ucas2k.service.ArticleService;
import nju.ucas2k.util.PageableList;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin
public class ArticleController {

    @Autowired
    ArticleService articleService;


    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum", required = true, value = "需查询的页码，为-1时查询全部"),
            @ApiImplicitParam(name = "pageSize", required = true, value = "每页包含的记录数，pageNum为正整数时有效"),
            @ApiImplicitParam(name = "title", value = "文章标题"),
            @ApiImplicitParam(name = "startTime", value = "开始时间"),
            @ApiImplicitParam(name = "endTime", value = "结束时间")
    })
    @GetMapping("/article")
    public ResEntity<PageableList<Article>> getArticle(int pageNum,int pageSize, String title, Date startDate, Date endDate){
        return new ResEntity(200,articleService.getArticle(pageNum,pageSize,title,startDate,endDate),null);
    }
}
