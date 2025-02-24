import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import InputComponent from '@/components/InputComponent.vue'
import MainLayout from '@/layouts/MainLayout.vue'


const globalComponents = (app: App) => {
app.component('MainLayout', MainLayout)
app.component('SvgIcon', SvgIcon)
app.component('InputComponent', InputComponent)
}
export default globalComponents
