const express = require('express');
const router = express.Router();
const { confirmarPedido, obtenerPedidos, obtenerDetallePedido } = require('../controllers/carrito.controller');  

router.post('/confirmar', confirmarPedido);
router.get('/pedidos/:idUsuario', obtenerPedidos);
router.get('/pedido/:idCarrito', obtenerDetallePedido);

module.exports = router;