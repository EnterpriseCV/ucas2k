package nju.ucas2k.util;

import com.github.pagehelper.Page;
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

    public PageableList(Page page){
        this.pageNum = page.getPageNum();
        this.pageSize = page.getPageSize();
        this.totalPages = page.getPages();
        this.data = page.getResult();
    }
}
