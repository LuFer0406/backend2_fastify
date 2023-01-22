import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";
import { conectarDb } from "./database.js";
import { empleadoRoutes } from "./routes/empleado.route.js";

// Conexión a la base de datos
conectarDb();

// Inicializar el servidor de fastify
const fastify = Fastify({
    logger: true
})

// Utilizar y modificar los pluggins
fastify.register(cors, {origin: "*"})
fastify.register(formBody)
fastify.register(multer.contentParser)

// Rutas
fastify.register(empleadoRoutes, {prefix: "/empleado"})

// Inicio
const start = async () => {
    try {
        await fastify.listen({port: 4000, host: "0.0.0.0"})
        console.log("El servidor está escuchando por el puerto 4000")
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
