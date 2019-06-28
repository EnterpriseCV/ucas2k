package nju.ucas2k.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import nju.ucas2k.dao.FeeDao;
import nju.ucas2k.model.Fee;
import nju.ucas2k.service.FeeService;
import nju.ucas2k.util.PageableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FeeServiceImpl implements FeeService {

    @Autowired
    FeeDao feeDao;

    @Override
    public int addFee(Fee fee) {
        return feeDao.add(fee);
    }

    @Override
    public int deleteById(long id) {
        return feeDao.deleteById(id);
    }

    @Override
    public int deleteByArticleId(long articleId) {
        return feeDao.deleteByArticleId(articleId);
    }

    @Override
    public int deleteByWorker(String workerType, long workerId) {
        return feeDao.deleteByWorker(workerType,workerId);
    }

    @Override
    public PageableList<Fee> selectByConditions(int pageNum,int pageSize,long articleId, String workerType, long workerId, Date startTime, Date endTime) {
        Page page = PageHelper.startPage(pageNum,pageSize);
        feeDao.selectByConditions(articleId,workerType,workerId,startTime,endTime);
        return new PageableList(page);
    }

    @Override
    public int updateFee(Fee fee) {
        return feeDao.update(fee);
    }
}
