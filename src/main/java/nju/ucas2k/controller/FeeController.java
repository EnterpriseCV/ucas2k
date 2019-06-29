package nju.ucas2k.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiParam;
import nju.ucas2k.model.Fee;
import nju.ucas2k.service.FeeService;
import nju.ucas2k.util.PageableList;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class FeeController {


    @Autowired
    FeeService feeService;

    @PostMapping("/fee")
    public ResEntity addFee(Fee fee){
        return new ResEntity(200,feeService.addFee(fee),null);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum", required = true, value = "需查询的页码，为-1时查询全部"),
            @ApiImplicitParam(name = "pageSize", required = true, value = "每页包含的记录数，pageNum为正整数时有效"),
            @ApiImplicitParam(name = "articleId", required = true, value = "费用所属文章的id，不启用时设置为-1"),
            @ApiImplicitParam(name = "workerType", value = "人员类型，启用时为inner或outer"),
            @ApiImplicitParam(name = "workerId", required = true, value = "人员id，启用workerType且值为正整数时有用，不启用设为-1"),
            @ApiImplicitParam(name = "workType", value = "工作类型"),
            @ApiImplicitParam(name = "startTime", value = "开始时间"),
            @ApiImplicitParam(name = "endTime", value = "结束时间")
    })
    @GetMapping("/fee")
    public ResEntity<PageableList<Fee>> getFee(int pageNum,
                                               int pageSize,
                                               long articleId,
                                               String workerType,
                                               long workerId,
                                               String workType,
                                               Date startTime,
                                               Date endTime){
        return new ResEntity(200,feeService.selectByConditions(pageNum,pageSize,articleId,workerType,workerId,workType,startTime,endTime),null);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "articleId", required = true, value = "费用所属文章的id，不启用时设置为-1"),
            @ApiImplicitParam(name = "workerType", value = "人员类型，启用时为inner或outer"),
            @ApiImplicitParam(name = "workerId", required = true, value = "人员id，启用workerType且值为正整数时有用，不启用设为-1"),
            @ApiImplicitParam(name = "workType", value = "工作类型"),
            @ApiImplicitParam(name = "startTime", value = "开始时间"),
            @ApiImplicitParam(name = "endTime", value = "结束时间")
    })
    @GetMapping("/fee/statistic")
    public ResEntity<Double> getFee(
                                               long articleId,
                                               String workerType,
                                               long workerId,
                                               String workType,
                                               Date startTime,
                                               Date endTime){
        double result = 0;
        List<Fee> feeList = feeService.selectByConditions(-1,-1,articleId,workerType,workerId,workType,startTime,endTime).getData();
        for(Fee fee:feeList){
            result += fee.getPayment();
        }
        return new ResEntity(200,result,null);
    }

    @PutMapping("/fee")
    public ResEntity updateFee(Fee fee){
        return new ResEntity(200,feeService.updateFee(fee),null);
    }

    @DeleteMapping("/fee")
    public ResEntity deleteFee(long id){
        return new ResEntity(200,feeService.deleteById(id),null);
    }

}
