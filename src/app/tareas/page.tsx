import { getTasks } from "@/lib/task-store" 
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export const instant = false;

export default async function TareasPage() {
    const tasks = await getTasks();

    return (
        <main>
            <h1>Mis Tareas</h1>
            <TaskForm/>
            <TaskList/>
        </main>
    );
}