package nju.ucas2k.controller;

import nju.ucas2k.model.Fee;
import nju.ucas2k.service.FeeService;
import nju.ucas2k.util.PageableList;
import nju.ucas2k.util.ResEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
public class FeeController {


    @Autowired
    FeeService feeService;

    @PostMapping("/fee")
    public ResEntity addFee(Fee fee){
        return new ResEntity(200,feeService.addFee(fee),null);
    }

    @GetMapping("/fee")
    public ResEntity getFee(int pageNum, int pageSize, long articleId, String workerType, long workerId, Date startTime, Date endTime){
        return new ResEntity(200,feeService.selectByConditions(pageNum,pageSize,articleId,workerType,workerId,startTime,endTime),null);
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
