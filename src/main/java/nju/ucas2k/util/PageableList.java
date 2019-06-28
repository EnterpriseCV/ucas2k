package nju.ucas2k.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageableList<T> {
    private int pageNum;
    private int pageSize;
    private int totalPages;
    private List<T> data;
}
