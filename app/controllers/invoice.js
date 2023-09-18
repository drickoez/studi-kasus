const { subject } = require("@casl/ability");
const Invoice = require("../models/invoice");
const { policyFor } = require("../utils");
const orderItem = require("../models/order-item");
const Order = require("../models/order");

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk melihat invoice ini",
      });
    }

    let order_items = await orderItem.find({ order: order_id });
    invoice.order.order_items = order_items;

    return res.json(invoice);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Error when getting invoice",
    });
  }
};
const update = async (req, res, next) => {
  try {
    let { order_id } = req.params;
    console.log("Updating payment status for order:", order_id);
    await Order.findByIdAndUpdate(order_id, { status: "delivered" });
    let invoice = await Invoice.findOneAndUpdate(
      { order: order_id },
      { payment_status: "paid" },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Updated invoice:", invoice);

    return res.json(invoice);
  } catch (err) {
    console.log("Update error:", err);
    return res.json({
      error: 1,
      message: "Error when updating invoice",
    });
  }
};
module.exports = { show, update };
