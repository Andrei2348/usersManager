<template> 
	<div class='input'>  
		<label class='input__label' :for="name">{{ label }}</label>  
		<div class="input__area-wrapper">  
			<input 
				:type="isPasswordVisible ? 'text' : type" 
				v-bind="$attrs" 
				class='input__area'  
				:id="name"  
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
	</div>  
</template>  
 
<script lang="ts" setup>
	import { computed, ref } from 'vue' 
	
	const props = defineProps({
		name: {  
			type: String,  
			required: true  
		},  
		label: {  
			type: String  
		},  
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
		emit('focus', props.name)
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
	align-items: flex-start;
	justify-content: space-between;
	padding-bottom: 0;
	transition: all ease 0.5s;
	&.error__place-visible{
		padding-bottom: 40px;
	}
	&__area{
		background-color: $violet;
		@include input;
		&:read-only {  
			border: 1px solid $gray;  
		}  
	}
	&__area-wrapper{
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
	}
	&__label{
		white-space: nowrap;
		margin-bottom: 8px;
		color: $gray3;
		@include textRegular(14);
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



