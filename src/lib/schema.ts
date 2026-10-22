import { z } from "zod";

export const taskSchema = z.object({
    titulo: z
        .string()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(80, "El título no puede superar los 80 caracteres"),
    descripcion: z
        .string()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(250, "El título no puede superar los 250 caracteres")
        .optional()
        .or(z.literal("")),
    prioridad: z.enum(["baja", "media", "alta"], {
        message: "Selecciona una prioridad válidad",
    }),
});

export type TaskInput = z.infer<typeof taskSchema>;