const express = require('express');
const app = express();
const APIRoutes = require('./api/APIroutes');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: '../.env' });

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('../dist'));

app.use(
    cors({
        origin: process.env.CORS_URL || '*'
    })
);
app.use('/api/', APIRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
