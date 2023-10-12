import {useAuthStore} from "@/stores/auth"

export default function Auth (next){
  if(useAuthStore().isAuth) {
    return'/about'
  } else {
    return '/about'
  }
}