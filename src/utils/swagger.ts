import swaggerAutogen from 'swagger-autogen';

const config = {
  info: {
    version: "1.0.0",
    title: "Healthflex Application",
    description: "Healthflex Application",
  },
  servers: [
    { url: 'http://localhost:8000', description: 'Local server' },
    { url: 'https://health-flex-assessment.onrender.com', description: 'Production server' }
  ],
  schemes: ['http', 'https'],
  tags: [],
}

const outputfile = './src/json/swagger_output.json';

const routes = [
  './src/app.ts',
]

const options = {
  openapi: '3.0.0',
  language: 'en-US',
  autoHeaders: true,
  autoBody: true,
  autoQuery: true,
  autoResponses: true,
};


swaggerAutogen(options)(outputfile, routes, config)


