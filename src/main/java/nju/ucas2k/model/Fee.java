package nju.ucas2k.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
