const express = require('express');
const bodyParser = require('body-parser');
const voterRoutes = require('./routes/voterRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

const app = express();
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('BIENVENIDOS AL SISTEMA DE VOTACIONES'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/voters', voterRoutes);
app.use('/candidates', candidateRoutes);
app.use('/votes', voteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});