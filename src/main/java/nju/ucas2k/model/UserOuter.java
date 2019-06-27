package nju.ucas2k.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOuter {

  private long id;
  private String name;
  private String idCard;
  private String bankCard;
  private String phone;

}
