import type { Ref } from 'vue';
import { ref, unref, computed } from 'vue';

/**
 * 前端分页
 * @param list 总数据list
 * @param pageNum 页数
 * @param pageSize 每页条数
 * @returns 
 */
function pagination<T = any> (list: T[], pageNum: number, pageSize: number): T[] {
  const offset = (pageNum - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize));
  return ret;
}

/**
 * 分页hooks
 * @param list 数据list
 * @param pageSize 每页条数
 * @returns 
 */
export function usePagination<T = any> (list: Ref<T[]>, pageSize: number) {
  const currentPage = ref(1);
  const pageSizeRef = ref(pageSize);

  const getPaginationList = computed(() => {
    return pagination(unref(list), unref(currentPage), unref(pageSize));
  });

  const getTotal = computed(() => {
    return unref(list).length;
  });

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  }

  const setPageSize = (pageSize: number) => {
    pageSizeRef.value = pageSize;
  }

  return { setCurrentPage, getTotal, setPageSize, getPaginationList };
}