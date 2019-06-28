package nju.ucas2k.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResEntity<T> {
    private int httpStatus;
    private T data;
    private String msg;
}
