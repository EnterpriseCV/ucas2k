package nju.ucas2k.service;

import nju.ucas2k.model.Fee;
import nju.ucas2k.util.PageableList;

import java.util.Date;
import java.util.List;

public interface FeeService {
    public int addFee(Fee fee);
    public int deleteById(long id);
    public int deleteByArticleId(long articleId);
    public int deleteByWorker(String workerType,long workerId);
    public PageableList<Fee> selectByConditions(int pageNum,int pageSize,long articleId, String workerType, long workerId,String workType, Date startTime,Date endTime);//都可选，不用文章id传-1，不用workerType传null，workerId必须和workerType一起用，单独用workerType的话workerId传-1
    public int updateFee(Fee fee);
}
