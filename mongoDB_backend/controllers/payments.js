const { initDb } = require("../utils/postgres");
const { orders, payments } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

module.exports = {
  async verifyEsewa(req, res, next) {
    try {
      const { oid, amt, refId } = req.body; // oid: order id, amt: amount, refId: transaction ref
      // Verify with eSewa
      const verifyParams = {
        amt,
        rid: refId,
        pid: oid,
        scd: "EPAYTEST", // Merchant code. Use env var later
      };

      // eSewa verification URL (test)
      const url = "https://uat.esewa.com.np/epay/transrec";

      // Construct form data
      const formData = new URLSearchParams(verifyParams).toString();

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const responseText = await response.text();

      if (responseText.includes("Success")) {
        const db = await initDb();
        // Update Order
        await db
          .update(orders)
          .set({ paymentStatus: "paid", status: "processing" })
          .where(eq(orders.id, oid));

        // Record Payment
        await db.insert(payments).values({
          orderId: oid,
          gateway: "esewa",
          transactionId: refId,
          amount: amt,
          status: "success",
          responseJson: responseText,
        });

        res.json({ success: true, message: "Payment verified" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Verification failed" });
      }
    } catch (error) {
      next(error);
    }
  },

  async verifyKhalti(req, res, next) {
    try {
      const { token, amount, orderId } = req.body;
      const KHALTI_SECRET_KEY =
        process.env.KHALTI_SECRET_KEY || "test_secret_key_...";

      const response = await fetch(
        "https://khalti.com/api/v2/payment/verify/",
        {
          method: "POST",
          headers: {
            Authorization: `Key ${KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount }),
        },
      );

      const data = await response.json();

      if (data.state && data.state.name === "Completed") {
        const db = await initDb();
        await db
          .update(orders)
          .set({ paymentStatus: "paid", status: "processing" })
          .where(eq(orders.id, orderId));

        await db.insert(payments).values({
          orderId: orderId,
          gateway: "khalti",
          transactionId: data.idx,
          amount: amount,
          status: "success",
          responseJson: JSON.stringify(data),
        });

        res.json({ success: true });
      } else {
        res.status(400).json({
          success: false,
          message: "Verification failed",
          details: data,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async verifyConnectIPS(req, res, next) {
    try {
      const { amount, refId, orderId } = req.body;

      // Simulate ConnectIPS Verification
      // In a real scenario, you would validate with ConnectIPS API

      const db = await initDb();
      await db
        .update(orders)
        .set({ paymentStatus: "paid", status: "processing" })
        .where(eq(orders.id, orderId));

      await db.insert(payments).values({
        orderId: orderId,
        gateway: "connectips",
        transactionId: refId,
        amount: amount,
        status: "success",
        responseJson: JSON.stringify({ message: "Simulated Success" }),
      });

      res.json({ success: true, message: "Payment verified (Simulated)" });
    } catch (error) {
      next(error);
    }
  },
};
