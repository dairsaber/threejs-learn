<script setup name="TestPage">
  const props = defineProps({ test: { type: String, default: () => "" } })
  // vue3 中 script 中必须有内容 name才能生效
  console.log("I am test", props)
</script>

<template>
  <div class="w-full h-full flex justify-center items-center text-5xl">I am test</div>
</template>
