import { type TaskDTO } from './DTOs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mnhapnxuhheksdggtwim.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getTodoList() {
    let { data: todo_lists, error } = await supabase
        .from<TaskDTO>('todo_lists')
        .select('*')
    return todo_lists
}

async function addTask(taskName: string) {
    const { data, error } = await supabase
        .from<TaskDTO>('todo_lists')
        .insert([
            { task_name: taskName },
        ])
    if (data === null) throw 'No item is inserted'
    if (data.length > 1) throw 'More than one task is inserted'
    return data[0]
}

async function updateTask(taskId: number, isCompleted: boolean) {
    const { data, error } = await supabase
        .from<TaskDTO>('todo_lists')
        .update({ is_completed: isCompleted })
        .eq('id', taskId)
    if (data === null) throw 'No task is updated'
    if (data.length > 1) throw 'More than one task is updated'
    return data[0]
}

export { getTodoList, addTask, updateTask }