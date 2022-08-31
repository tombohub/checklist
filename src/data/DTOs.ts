/**
 * Single task inside todo list
 */
interface TaskDTO {
    /**
     * id from database
     */
    id: number;
    task_name: string;
    is_completed: boolean;
}

export { type TaskDTO }