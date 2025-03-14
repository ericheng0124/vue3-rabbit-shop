// 封装banner轮播图相关的业务代码
import { ref, onMounted } from "vue"
import { getBannerAPI } from "@/apis/home"

export const useBanner = () => {
  const bannerList = ref([])

  const getBannerList = async () => {
    const res = await getBannerAPI({ distributionSite: "2" })
    bannerList.value = res.result
  }

  onMounted(() => {
    getBannerList()
  })

  return {
    bannerList
  }
}
