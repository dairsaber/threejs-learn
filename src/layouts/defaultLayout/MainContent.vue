<script lang="ts" setup>
  import { ref } from "vue"

  // 开启路由缓存
  const openCache = ref(true)
  // 这里存储需要缓存的页面路由名称 默认undefined 存储所有页面
  const getCaches = ref<string[]>()
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <keep-alive v-if="openCache" :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component :is="Component" v-else :key="route.fullPath" />
    </template>
  </RouterView>
</template>
