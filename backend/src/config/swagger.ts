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
        url: 'https://mirai-api.kaporelo.com',
        description: 'Production server'
      },
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
  apis: ['./src/routes/*.ts', './dist/routes/*.js'] // Ajout du chemin pour les fichiers compilés
};

export const swaggerSpec = swaggerJsdoc(options); 