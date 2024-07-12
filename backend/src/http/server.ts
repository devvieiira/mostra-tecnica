import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
	origin: process.env.FRONTEND_URL,
	credentials: true,
});

app.listen({ port: 4000, host: "0.0.0.0" }).then((value) => {
	console.log("HTTP Server Running!");
});
