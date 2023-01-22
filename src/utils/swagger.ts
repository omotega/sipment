import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
// import { version } from '../../package';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest api docs',
      version: '1.0',
    },
    components: {
      securityschemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', '.src/validation/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port:number) {
  // swagger page

  app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

  // json format of docs
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Docs availiable at http://localhost:${port}/docs`);
}

export default swaggerDocs;