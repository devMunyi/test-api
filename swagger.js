const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/users.js'];

const doc = {
  info: {
    version: "1.0.0",
    title: "Test API",
    description: "This is a REST API meant for testing purpose. It can allow users to create an account and login using the created credentials. The authenticated user can then update own technical and soft skills fields as comma separated values"
  },
  host: "localhost:8000",
  basePath: "/api/v1",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      "name": "Auth",
      "description": "Auth endpoints"
    }
  ],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      description: "Value: Bearer ",
      in: "header",
      scheme: 'bearer'
    }
  },
  paths: {
    "/api/v1/users/update-technical-skills": {
      put: {
        description: "Updates a user's technical skills",
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Bearer token",
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "Successful operation"
          }
        },
        security: [{ Authorization: [] }]
      }
    },
    "/api/v1/users/update-soft-skills": {
      put: {
        description: "Updates a user's soft skills",
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Bearer token",
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "Successful operation"
          }
        },
        security: [{ Authorization: [] }]
      }
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js');
});
