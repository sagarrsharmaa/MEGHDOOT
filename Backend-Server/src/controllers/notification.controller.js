import { apiError } from "../utils/apiError.util.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { sendAlertEmail } from "../utils/mailer.util.js";

/**
 * POST /notify/send-alert
 * Body: { recipientEmail, sensorData, alerts, mlAnalysis }
 *
 * Sends a styled email alert with current dashboard metrics.
 * No auth or DB required — the frontend sends everything in the request.
 */
const sendNotification = asyncAwaitHandler(async (req, res) => {
  const { recipientEmail, sensorData, alerts, mlAnalysis } = req.body;

  // Validate email
  if (!recipientEmail || typeof recipientEmail !== "string") {
    throw new apiError(400, "recipientEmail is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(recipientEmail)) {
    throw new apiError(400, "Invalid email address format");
  }

  // Validate sensor data presence
  if (!sensorData || typeof sensorData !== "object") {
    throw new apiError(400, "sensorData object is required");
  }

  if (!alerts || !Array.isArray(alerts)) {
    throw new apiError(400, "alerts array is required");
  }

  try {
    const info = await sendAlertEmail(recipientEmail, {
      sensorData,
      alerts,
      mlAnalysis: mlAnalysis || null,
    });

    console.log("Email sent successfully:", info.messageId);

    return res.status(200).json(
      new apiResponse(200, { messageId: info.messageId }, "Alert email sent successfully")
    );
  } catch (error) {
    console.error("Email send error:", error.message);
    throw new apiError(500, "Failed to send email notification", error);
  }
});

export { sendNotification };
