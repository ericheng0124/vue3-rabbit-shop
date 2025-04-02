import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";

export const useCategoryStore = defineStore("category", () => {
  // 导航列表逻辑
  // state导航数据列表
  const categoryList = ref([]);
  // action获取分类
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };
  return { categoryList, getCategory };
});
