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
    // securityDefinitions: {
    //     "bearerAuth": {
    //         "type": "apiKey",
    //         "description": "Value: Bearer",
    //         "name": "Authorization",
    //         "in": "header"
    //     }
    // },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Auth",
            "description": "Auth endpoints"
        }
    ],
    paths: {
        "/api/v1/users/update-technical-skills": {
            put: {

                "security": [
                    {
                        "bearerAuth": []
                    }
                ],

                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                // description: "Updates a user's technical skills",
                // responses: {
                //     "200": {
                //         description: "Successful operation"
                //     }
                // }
            }
        },
        "/api/v1/users/update-soft-skills": {
            put: {

                "security": [
                    {
                        "bearerAuth": []
                    }
                ],

                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
            }
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js');
});
