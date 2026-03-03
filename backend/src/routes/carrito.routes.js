const express = require('express');
const router = express.Router();
const { confirmarPedido, obtenerPedidos, obtenerDetallePedido, obtenerTodosPedidos, actualizarEstadoPedido } = require('../controllers/carrito.controller');  

router.post('/confirmar', confirmarPedido);
router.get('/pedidos/:idUsuario', obtenerPedidos);
router.get('/pedido/:idCarrito', obtenerDetallePedido);
router.get('/todos', obtenerTodosPedidos);
router.put('/estado/:idCarrito', actualizarEstadoPedido);

module.exports = router;