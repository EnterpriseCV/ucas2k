package nju.ucas2k.dao;

import nju.ucas2k.model.Fee;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface FeeDao {
    public int add(Fee fee);
    public int deleteById(long id);
    public int deleteByArticleId(long articleId);
    public int deleteByWorker(String workerType,long workerId);
    public List<Fee> selectByConditions(long articleId, String workerType, long workerId,String workType, Date startTime,Date endTime);//都可选，不用文章id传-1，不用workerType传null，workerId必须和workerType一起用，单独用workerType的话workerId传-1
    public int update(Fee fee);

}
