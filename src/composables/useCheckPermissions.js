import { useUserStore } from '@/stores/user'

const user = useUserStore()
const checkPermissions = (...array) => user?.user?.permissions?.some(el => array.includes(el.name))

export default checkPermissions
