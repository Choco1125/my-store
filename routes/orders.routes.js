const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');

const service = new OrderService();

const router = express.Router();

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);

      res.status(200).json({
        order,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
