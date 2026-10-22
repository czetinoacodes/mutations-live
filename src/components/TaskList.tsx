import { tasks } from "../lib/task-store";

export default function TaskList() {
    if (tasks.length === 0) {
        return(
            <p className="text-sm text-slate-400 italic">
                No hay tareas todavía, crea la primera!
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {tasks.map((t) => (
                <li key={t.id}
                className="flex items-center justify-between rounded-lg border-slate-200 bg-white p-3 shadow-sm">
                    <span className={t.completada ? "line-through text-slate-400" : "text-slate-700"}>
                        {t.titulo}
                    </span>
                    <span className="text-xs rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-700">
                        {t.completada ? "Completada" : "Pendiente"}
                    </span>
                </li>
            ))}
        </ul>
    );

}
