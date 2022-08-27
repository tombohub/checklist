import { type Task } from './DTOs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mnhapnxuhheksdggtwim.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getTodoList() {
    let { data: todo_lists, error } = await supabase
        .from<Task>('todo_lists')
        .select('*')
    return todo_lists
}

async function addTask(taskName: string) {
    const { data, error } = await supabase
        .from('todo_lists')
        .insert([
            { task_name: taskName },
        ])
}

async function updateTask(taskId: number, isCompleted: boolean) {
    const { data, error } = await supabase
        .from('todo_lists')
        .update({ is_completed: isCompleted })
        .eq('id', taskId)
}

export { getTodoList, addTask, updateTask }