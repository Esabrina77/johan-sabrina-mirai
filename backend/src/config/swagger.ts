import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MIRAI API Documentation',
      version: '1.0.0',
      description: 'API documentation for MIRAI platform (READ-ONLY in production)',
      contact: {
        name: 'MIRAI Team',
        email: 'contact@mirai.com'
      }
    },
    servers: [
      {
        url: 'https://mirai-api.kaporelo.com',
        description: 'Production server (READ-ONLY)'
      },
      {
        url: 'http://localhost:3009',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
          description: 'Basic authentication for Swagger UI access'
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for API endpoints'
        }
      }
    },
    security: [
      {
        basicAuth: []
      },
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'] // Ajout du chemin pour les fichiers compilés
};

export const swaggerSpec = swaggerJsdoc(options); 