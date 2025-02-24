<template>
  <button 
    class="button"
    :class="buttonClass" 
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps({
    visual: {
      type: String,
      default: 'dark'
    },
		disabled: {  
			type: Boolean,  
			default: false  
		}
  })
  const emit = defineEmits(['action'])

  const handleClick = () => {
    if (!props.disabled) {
      emit('action') 
    } 
	}

  const buttonClass = computed(() => {  
    return {  
      'btn-light': props.visual === 'light',  
      'btn-dark': props.visual === 'dark'  
    }
  })
</script>

<style lang="scss" scoped>
.button{
  @include primaryButton;
}

.btn-light {  
  background-color: $blue; 
  border: 1px solid $blue; 
  color: $white; 
}  

.btn-dark {  
  background-color: $violet; 
  border: 1px solid $violet; 
  color: $white;  
}  
</style>