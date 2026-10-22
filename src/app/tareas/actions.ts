"use server";

import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/schema";
import { createTask as createTaskInDb, 
         deleteTask as deleteTaskInDb,  
         toogleTask as toogleTaskInDb } from "@/lib/task-store";

export type CreateTaskState = {
    errores?: Record<string, string[]>;
    mensaje?: string;
};

export async function createTaskAction(
    _prevState: CreateTaskState,
    formData: FormData
): Promise<CreateTaskState> {
    //1. Leemos los datos crudos del formulario
    const datosCrudos = {
        titulo: formData.get("titulo"),
        descripcion: formData.get("descripcion"),
        prioridad: formData.get("prioridad"),
    };

    //2. Valimdamos en el SERVER con ZOD, no confiamos que se valide en el navegador
    const resultado = taskSchema.safeParse(datosCrudos);

    if (!resultado.success){
        return{
            errores: resultado.error.flatten().fieldErrors as Record<string, string[]>,
            mensaje: "Revisa los campos marcados con error.",
        };
    }

    //3. Mutación real
    await createTaskInDb(resultado.data);

    //4. Invalidamos el caché de /tareas para que la UI refleje la nueva
    revalidatePath("/tareas");

    return { mensaje: "Tarea creada correctamente" };
}

export async function deleteTaskAction(id: string){
    await deleteTaskInDb(id);
    revalidatePath("/tareas");
}

export async function toggleTaskAction(id: string) {
    await toogleTaskInDb(id);
    revalidatePath("/tareas");
}