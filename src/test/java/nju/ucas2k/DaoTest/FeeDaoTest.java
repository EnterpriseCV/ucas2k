package nju.ucas2k.DaoTest;

import nju.ucas2k.dao.FeeDao;
import nju.ucas2k.model.Fee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FeeDaoTest {

    @Autowired
    FeeDao feeDao;

    @Test
    public void contextLoads() {
        Fee fee = new Fee();
        fee.setArticleId(12345);
        fee.setWorkerType("inner");
        fee.setWorkerId(22);
        fee.setPayDate(new Date());
        fee.setWorkType("worktype");
        fee.setWorkDescription("descriptiddddon");
        fee.setPayment(114.514);
//        feeDao.add(fee);
//        System.out.println(feeDao.deleteByWorker("inner",22));
//        List list = feeDao.selectByConditions(-1,"inner",-1,null,null);

    }
}
