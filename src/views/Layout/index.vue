<script setup>
import layoutNav from './components/layoutNav.vue'
import layoutHeader from './components/layoutHeader.vue'
import layoutFooter from './components/layoutFooter.vue'

</script>

<template>
  <div>
    <layout-nav />
    <layout-header />
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <layout-footer />
  </div>
</template>