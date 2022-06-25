<script setup>
import { ref } from "vue"
import components from "@/pages/examples"

const currentSelectKey = ref("TestPage")
const keys = Object.keys(components)

function handleSelected(key) {
  currentSelectKey.value = key
}
</script>

<template>
  <div class="relative w-full h-full">
    <component :is="components[currentSelectKey]" />
    <div class="absolute top-4 left-1">
      <button
        v-for="item in keys"
        :key="item"
        :class="{ selected: item === currentSelectKey }"
        class="button"
        @click="handleSelected(item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.selected {
  @apply outline-none ring-2 ring-purple-600 ring-offset-2;
}
.button {
  @apply mr-2 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent;
}
</style>
