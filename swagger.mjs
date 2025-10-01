import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Parcial 2 - API de Productos",
      version: "1.0.0",
      description: "Documentación de la API REST con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.mjs"], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };