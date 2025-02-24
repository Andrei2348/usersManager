<template>
  <div class="select">
    <div class="select__wrapper" v-click-outside="closeMenuHandler">
      <div ref="select" class="select__input-wrapper" @click="toggleDropdown">
        <div class="select__input">
          <span class="select__input-span">{{ selectedOption ? selectedOption.label : 'Тип записи' }}</span>
          <SvgIcon icon="arrow_down" class="select__arrow" :class="{ rotate: isOpen }" />
        </div>
      </div>
      <transition name="fade">
        <div v-if="isOpen" class="select__list select__list-open">
          <div v-for="option in options" 
          :key="option.id" 
          class="select__list-item"
          :class="{ 'item-selected': selectedOption?.id === option.id }"
           @click="option.id !== undefined && selectValue(option.id)">
            <span>{{ option.label }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">  
import { ref, watch } from 'vue'
import type { OptionsDropdown } from '@/types/common' 

const props = defineProps({  
  options: {  
    type: Array as () => OptionsDropdown[],  
    default: () => [],  
  },
  initialValue: {  
    type: Object as () => OptionsDropdown | null,  
    required: false,  
    default: null  
  } 
})

const emit = defineEmits<{  
  (e: 'select', item: OptionsDropdown | null): void  
}>()  

const selectedOption = ref<OptionsDropdown | null>(props.initialValue)
const isOpen = ref(false)  

const toggleDropdown = () => {  
  isOpen.value = !isOpen.value  
}

const closeMenuHandler = () => {  
  isOpen.value = false 
} 

const selectValue = (id: number) => {  
  selectedOption.value = props.options.find(el => el.id === id) || null
  isOpen.value = false   
  emit('select', selectedOption.value)  
} 

watch(  
  () => props.initialValue,  
  (newValue) => {  
    selectedOption.value = newValue  
  }  
)  
</script>  

<style scoped lang="scss">
.select {
  cursor: pointer;
  &__wrapper {
    position: relative;
    width: 100%;
    background-color: $white;
  }
  &__list {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    white-space: nowrap;
    background-color: $white;
    max-height: 173px;
    overflow-y: auto;
    overflow-x: hidden;
    @include custom-scrollbar;
    border: 1px solid $gray;
    width: 100%;
    top: 47px;
    position: absolute;
    z-index: 100;
  }
  &__input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px;
    height: 48px;
    border: 1px solid $gray;
    border-radius: 4px;
  }
  &__input-span {
    color: $black;
  }
  &__arrow{
    stroke: $gray;
    transition: all ease 0.5s;
    &.rotate{
      transform: rotate(180deg);
    }
  }
  &__list-item {
    padding: 8px 6px;
    transition: all ease 0.4s;
    &:hover {
      color: $black;
      background-color: $gray3;
    }
    &.item-selected{
      color: $black;
      background-color: $gray4;
    }
  }
}
.fade-enter-active, .fade-leave-active {  
  transition: opacity 0.5s ease;  
}  
.fade-enter, .fade-leave-to {  
  opacity: 0;  
} 
</style>