const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

const sendOtp = async (phone) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await client.messages.create({
      body: `Your OTP for Healthy Living is: ${otp}`,
      from: twilioPhoneNumber,
      to: phone,
    });
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = { sendOtp };
