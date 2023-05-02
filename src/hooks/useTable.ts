import type { Ref } from 'vue';
import { reactive, ref, unref, computed } from 'vue';

export async function useTableList(getTableData: any, params?, callback?) {
  const tableData: any[] = reactive([]);
  const total = ref(0);
  const queryParams = reactive({
    pageNum: 1,
    pageSize: 20,
  });

  const res = await getTableData({
    ...queryParams,
    ...params,
  });

  if (res.code == 200) {
    tableData.length = 0;
    tableData.push(...(res.data.datas || []));
    total.value = res.data.total;

    callback &&
      callback({
        tableData,
        total,
      });
  }

  return {
    list: tableData,
    total,
  };
}

export function resetFields() {}
