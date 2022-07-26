<script setup name="TestPage">
  import ThreeContainer from "@/components/ThreeContainer"
  const props = defineProps({ test: { type: String, default: () => "" } })
  // vue3 中 script 中必须有内容 name才能生效
  console.log("I am test", props)
  function handleRender() {}
</script>

<template>
  <ThreeContainer @render="handleRender" />
</template>
