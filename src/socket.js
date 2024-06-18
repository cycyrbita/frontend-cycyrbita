import { io } from 'socket.io-client'
const VITE_API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV
export const socket = io(VITE_API_URL)
