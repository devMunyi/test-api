const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {readdirSync} = require("fs");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const { sequelize } = require("./models");

const app = express();
const port = process.env.PORT || 4000;

const DisableTryItOutPlugin = function() {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  }
}

// elsewhere, when you call Swagger-UI...
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
  swaggerOptions: {
    docExpansions: "none",
    persistAuthorization: true,
    plugins: [
      DisableTryItOutPlugin
    ]
 }
}))

// Autoload routes
readdirSync('./routes').map((r) =>
  app.use('/api/v1', require(`./routes/${r}`))
);

// app.use('/api/v1/routes/users');

app.listen(port, async()=> {
    console.log(`API up and running on port ${port}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
