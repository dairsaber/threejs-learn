<script setup lang="ts">
  import { DefineComponent, shallowRef } from "vue"
  import componentGroups from "@/pages/examples"
  import { useRouteQuery } from "@vueuse/router"

  // 将组件参数固定在url上下次刷新还是这个页面组件
  const example = useRouteQuery("example")
  const components = componentGroups.reduce((prev, current) => [...prev, ...current.components], [])
  const currentComponent = components.find((x) => x.label === example.value)?.component
  const currentSelectKey = shallowRef<DefineComponent>(
    currentComponent ?? components.find((x) => x.label === "TestPage")!.component,
  )

  function handleSelected(key: DefineComponent, label: string) {
    currentSelectKey.value = key
    example.value = label
  }
</script>

<template>
  <div class="relative w-full h-full">
    <component :is="currentSelectKey" />
    <div class="box-border absolute top-0 right-0 flex h-screen p-4">
      <div class="flex flex-col p-4 overflow-y-auto bg-white rounded-md bg-opacity-80">
        <template v-for="(group, index) in componentGroups" :key="group.group">
          <section class="h-10 pl-2 my-3 text-xl leading-10 bg-gray-400 rounded-sm">
            {{ index + 1 }}.{{ group.group }}
          </section>

          <button
            v-for="item in group.components"
            :key="item.label"
            :class="{ selected: item.component === currentSelectKey }"
            class="button"
            @click="handleSelected(item.component, item.label)"
          >
            {{ item.label }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .selected {
    @apply outline-none ring-2 ring-purple-600 ring-offset-2;
  }
  .button {
    @apply ml-4 mb-4 mr-2 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent;
  }
</style>
