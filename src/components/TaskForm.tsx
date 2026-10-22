"use client";

import { useActionState } from "react";
import { createTaskAction, type CreateTaskState } from "../app/tareas/actions";

const estadoInicial: CreateTaskState = {};

export default function TaskForm() {

    // useActionState devuelve [estado, formAction, pending]. "pending" nos ahorra
    // tener que usar useFormStatus en un componente aparte

    const [estado, formAction, pending] = useActionState(
        createTaskAction,
        estadoInicial
    );

    return(
        <form action={formAction} className="space-y-4 rounded-xl border p-5">
            <div>
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" name="titulo" />
                {estado.errores?.titulo && (
                    <p className="text-sm text-red-600">{estado.errores.titulo[0]}</p>
                )}
            </div>
            <div>
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" id="descripcion" name="descripcion" />
                {estado.errores?.descripcion && (
                    <p className="text-sm text-red-600">{estado.errores.descripcion[0]}</p>
                )}
            </div>
            <div>
                <label htmlFor="prioridad">Prioridad</label>
                <select name="prioridad" id="prioridad" defaultValue="media">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>
            <button type="submit" disabled={pending}>
                {pending ? "Guardando..." : "Crear tarea"}
            </button>
            {estado.mensaje && !estado.errores && (
                <p className="text-emeral-600">{estado.mensaje}</p>
            )}
        </form>

    );

}