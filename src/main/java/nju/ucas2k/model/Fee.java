package nju.ucas2k.model;

import lombok.Data;

import java.util.Date;

@Data

public class Fee {

  private long id;
  private long articleId;
  private String workerType;
  private long workerId;
  private Date payDate;
  private String workType;
  private String workDescription;
  private double payment;

}
