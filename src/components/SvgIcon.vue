<script lang="ts" setup>  
import { ref, onBeforeMount, watch } from 'vue'  
import type { ComponentPublicInstance } from '@/types/svgIcon'  

const props = defineProps<{  
  icon: string;  
}>()  

const emit = defineEmits<{  
  (event: 'iconReady'): void
}>()  

const dynamicSvg = ref<string | null>(null)  
const svgRef = ref<ComponentPublicInstance<HTMLElement> | null>(null)  

const importSvg = async (svgName: string) => {  
  if (svgName) {  
    return await import(`../../src/assets/icons/${svgName}.svg`)  
  }  
}  

watch(  
  () => props.icon,  
  async (svg) => {  
    dynamicSvg.value = await importSvg(svg)  
  },  
)  

watch(  
  () => svgRef.value?.$el,  
  (el) => {  
    if (el) emit('iconReady')  
  },  
)  

onBeforeMount(async () => {  
  dynamicSvg.value = await importSvg(props.icon)  
})  
</script>  

<template>  
  <component v-if="dynamicSvg" :is="dynamicSvg" ref="svgRef" />  
</template>