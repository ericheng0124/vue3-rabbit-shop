<script setup>
import { getBannerAPI } from '@/apis/home'
import { ref,onMounted } from 'vue'

const bannerList = ref([])

const getBannerList = async()=>{
  const res = await getBannerAPI()
  bannerList.value = res.result
}

onMounted(()=>{
  getBannerList()
})

</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px" :interval="3000">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img
          :src="item.imgUrl"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 990px;
  height: 500px;
  position: absolute;
  left: 250px;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
