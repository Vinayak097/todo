import { title } from 'process'
import { object, string } from 'zod'
export const createTodo=object({
    title:string(),
    description:string(),
    tag:string()
    
})

export const updateTodo=object({
    id:string(),
})

export const userType=object({
    username:string().min(3),
    password:string().min(3)
})

