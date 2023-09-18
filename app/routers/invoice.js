const router = require("express").Router();
const invoiceController = require("../controllers/invoice");
const { police_check } = require("../middlewares");

router.get("/invoices/:order_id", invoiceController.show);
router.put(
  "/invoices/:order_id",
  police_check("update", "Invoice"),
  invoiceController.update
);

module.exports = router;
