<script lang="ts" setup name="CreateText">
  import { onMounted, ref } from "vue"
  const threeContainer = ref<HTMLDivElement>()
  onMounted(initThree)

  function initThree() {
    // 官方推荐用css dom 渲染文字
  }
</script>

<template>
  <div ref="threeContainer"></div>
</template>

<style lang="less" scoped></style>
