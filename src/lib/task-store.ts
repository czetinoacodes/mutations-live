export type Prioridad = "baja" | "media" | "alta";

export type Task = {
    id: string;
    titulo: string;
    descripcion?: string;
    prioridad: Prioridad;
    completada: boolean;
    creadaEn: number;
};


export const tasks: Task[] = [
    {
        id: "1",
        titulo: "Repasar Server Actions",
        descripcion: "Releer la sección de use server antes de la clase",
        prioridad: "alta",
        completada: false,
        creadaEn: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
        id: "2",
        titulo: "Configurar error.tsx",
        descripcion: "Probar el botón de reintentar",
        prioridad: "media",
        completada: true,
        creadaEn: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
        id: "3",
        titulo: "Configurar ZOD library",
        descripcion: "Probar que ZOD funciona correctamente",
        prioridad: "alta",
        completada: false,
        creadaEn: Date.now() - 1000 * 60 * 60 * 24,
    },
];

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTasks(): Promise<Task[]> {
    await sleep(300); // simula una consulta real a una base de datos
    return [...tasks].sort((a, b) => b.creadaEn - a.creadaEn);
}

export async function createTask(input: {
    titulo: string;
    descripcion?: string;
    prioridad: Prioridad;
}): Promise<Task> {
    await sleep(400);
    const nueva: Task = {
        id: crypto.randomUUID(),
        titulo: input.titulo,
        descripcion: input.descripcion,
        prioridad: input.prioridad,
        completada: false,
        creadaEn: Date.now(),
    };
    tasks.push(nueva);
    return nueva;
}

export async function deleteTask(id: string): Promise<void> {
    await sleep(200);
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`No existe la tarea con id ${id}`);
    tasks.splice(index, 1);
}

export async function toogleTask(id: string): Promise<void> {
    await sleep(200);
    const tarea = tasks.find((t) => t.id === id);
    if (!tarea) throw new Error(`No existe la tarea con id ${id}`);
    tarea.completada = !tarea.completada;
}