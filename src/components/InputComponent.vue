<template> 
	<div class='input'>  
		<input 
			:type="isPasswordVisible ? 'text' : type" 
			v-bind="$attrs" 
			class='input__area'  
			:placeholder="placeholder"   
			:required="required"   
			:readonly="readonly"
			:disabled="disabled"  
			:maxlength="maxlength"  
			:autocomplete="autocomplete"
			@focus="handleFocus"
			@input="onInput"
			:value="value"
		/> 
		<button 
			class='input__password-visible' 
			v-if="isPasswordField" 
			type="button" 
			@click="togglePasswordVisibility"
		>  
			<SvgIcon icon="eye" class='input__password-icon' v-if='isPasswordVisible'/>
			<SvgIcon icon="eye-off" class='input__password-icon' v-else/>
		</button>  
	</div>  
</template>  
 
<script lang="ts" setup>
	import { computed, ref } from 'vue' 
	
	const props = defineProps({   
		type: {  
			type: String,  
			default: 'text'  
		},  
		placeholder: {  
			type: String,  
			default: ''  
		},  
		value: {  
			type: String,  
			default: ''  
		},  
		required: {  
			type: Boolean,  
			default: false  
		},   
		readonly: {  
			type: Boolean,  
			required: false,
			default: false  
		},  
		disabled: { 
			type: Boolean, 
			required: false, 
			default: false 
		},
		maxlength: {  
			type: Number,  
			default: null  
		},  
		autocomplete: {  
			type: String,  
			default: 'off'  
		},  
	})  
	const emit = defineEmits(['update:value', 'focus'])
	
	const isPasswordVisible = ref(false)

	const togglePasswordVisibility = () => {  
		isPasswordVisible.value = !isPasswordVisible.value
	}

	const handleFocus = () => {
		emit('focus')
	}

	const isPasswordField = computed(() => props.type === 'password') 
		const onInput = (event: Event) => {    
		const target = event.target as HTMLInputElement;  
		const { value } = target

		if (target.inputMode === 'numeric') {  
			const numValue = value.replace(/[^\d]/g, '') 
			target.value = numValue  
			emit('update:value', numValue)
		} else {  
			emit('update:value', value)
		}  
	}
</script>  

<style lang="scss" scoped>
.input{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 0;
	position: relative;
	transition: all ease 0.5s;
	&.error__place-visible{
		padding-bottom: 40px;
	}
	&__area{
		background-color: $black;
		@include input;
		&:read-only {  
			border: 1px solid $gray;  
		}  
	}
	&__password-visible{
		border: none;
		background: transparent;
		position: absolute;
		top: 12px;
		right: 10px;
		cursor: pointer;
	}
	&__password-icon{
		margin-top: 4px;
	}
}
</style>
