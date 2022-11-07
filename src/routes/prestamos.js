const express = require('express');
const router = express.Router();

router.get('/prestamos', (req, res) => {
    res.send('No Existe prestamo en Base de datos');
});

module.exports = router;