package nju.ucas2k.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
  private long id;
  private String title;
  private Date date;
  private long readNum;
  private long zanNum;
  private String wechatId;
}
