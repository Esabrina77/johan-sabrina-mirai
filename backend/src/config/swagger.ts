import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MIRAI API Documentation',
      version: '1.0.0',
      description: 'API documentation for MIRAI platform',
      contact: {
        name: 'MIRAI Team',
        email: 'contact@mirai.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3009',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts'] // Chemin vers vos fichiers de routes
};

export const swaggerSpec = swaggerJsdoc(options); 