import nodemailer from "nodemailer";

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Generates a beautiful HTML email template for agriculture alerts
 */
const generateAlertEmailHTML = ({ sensorData, alerts, mlAnalysis }) => {
  const alertRows = alerts
    .map(
      (alert) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
          <span style="
            display: inline-block;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            background: ${alert.type === "warning" ? "#fef3c7" : alert.type === "success" ? "#d1fae5" : "#dbeafe"};
            color: ${alert.type === "warning" ? "#92400e" : alert.type === "success" ? "#065f46" : "#1e40af"};
          ">${alert.type.toUpperCase()}</span>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">
          ${alert.message}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
          <span style="
            display: inline-block;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 12px;
            background: ${alert.priority === "high" ? "#fee2e2" : alert.priority === "medium" ? "#fef3c7" : "#e0e7ff"};
            color: ${alert.priority === "high" ? "#991b1b" : alert.priority === "medium" ? "#92400e" : "#3730a3"};
          ">${alert.priority}</span>
        </td>
      </tr>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f0fdf4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #166534, #15803d, #22c55e); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">
          🌾 MEGHDOOT Alert
        </h1>
        <p style="color: #bbf7d0; margin: 0; font-size: 14px;">
          Smart Agriculture Monitoring System
        </p>
        <p style="color: #86efac; margin: 8px 0 0 0; font-size: 12px;">
          Report generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
      </div>

      <!-- Main Content -->
      <div style="background: #ffffff; padding: 32px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">

        <!-- Sensor Readings -->
        <h2 style="color: #166534; font-size: 20px; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #22c55e;">
          📊 Current Sensor Readings
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 12px; background: #f0fdf4; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #166534;">💧 ${sensorData.soilMoisture}%</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Soil Moisture</div>
            </td>
            <td style="width: 4%;"></td>
            <td style="padding: 12px; background: #fef3c7; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #92400e;">🌡️ ${sensorData.temperature}°C</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Temperature</div>
            </td>
            <td style="width: 4%;"></td>
            <td style="padding: 12px; background: #dbeafe; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #1e40af;">💨 ${sensorData.humidity}%</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Humidity</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 12px; background: #faf5ff; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">☀️ ${sensorData.lightIntensity} lux</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Light Intensity</div>
            </td>
            <td style="width: 4%;"></td>
            <td style="padding: 12px; background: #fff7ed; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #c2410c;">⚗️ ${sensorData.soilPh}</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Soil pH</div>
            </td>
            <td style="width: 4%;"></td>
            <td style="padding: 12px; background: #ecfdf5; border-radius: 8px; text-align: center; width: 25%;">
              <div style="font-size: 24px; font-weight: 700; color: #059669;">⚡ ${sensorData.electricalConductivity} mS/cm</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">EC</div>
            </td>
          </tr>
        </table>

        <!-- NPK Values -->
        <h2 style="color: #166534; font-size: 20px; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #22c55e;">
          🧪 Soil Nutrients (NPK)
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 12px; background: #fef9c3; border-radius: 8px; text-align: center; width: 30%;">
              <div style="font-size: 24px; font-weight: 700; color: #854d0e;">N: ${sensorData.nitrogen} ppm</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Nitrogen</div>
            </td>
            <td style="width: 5%;"></td>
            <td style="padding: 12px; background: #d1fae5; border-radius: 8px; text-align: center; width: 30%;">
              <div style="font-size: 24px; font-weight: 700; color: #065f46;">P: ${sensorData.phosphorus} ppm</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Phosphorus</div>
            </td>
            <td style="width: 5%;"></td>
            <td style="padding: 12px; background: #fce7f3; border-radius: 8px; text-align: center; width: 30%;">
              <div style="font-size: 24px; font-weight: 700; color: #9d174d;">K: ${sensorData.potassium} ppm</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Potassium</div>
            </td>
          </tr>
        </table>

        <!-- Alerts -->
        <h2 style="color: #166534; font-size: 20px; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #22c55e;">
          ⚠️ Active Alerts
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Type</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Message</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Priority</th>
            </tr>
          </thead>
          <tbody>
            ${alertRows}
          </tbody>
        </table>

        <!-- ML Analysis -->
        ${mlAnalysis
      ? `
        <h2 style="color: #166534; font-size: 20px; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #22c55e;">
          🤖 AI Analysis Summary
        </h2>

        <div style="margin-bottom: 16px; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
          <div style="font-weight: 600; color: #166534; margin-bottom: 4px;">💧 Watering Recommendation</div>
          <div style="font-size: 14px; color: #374151;">${mlAnalysis.wateringRecommendation?.message || "N/A"}</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">${mlAnalysis.wateringRecommendation?.action || ""}</div>
        </div>

        <div style="margin-bottom: 16px; padding: 16px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
          <div style="font-weight: 600; color: #065f46; margin-bottom: 4px;">🌱 Crop Health Score</div>
          <div style="font-size: 24px; font-weight: 700; color: #059669;">${mlAnalysis.cropHealth?.score || "N/A"}/100</div>
        </div>

        <div style="margin-bottom: 16px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <div style="font-weight: 600; color: #1e40af; margin-bottom: 4px;">🧪 Fertilizer Recommendation</div>
          <div style="font-size: 14px; color: #374151;">${mlAnalysis.fertilizerRecommendation?.recommendation || "N/A"}</div>
        </div>

        <div style="margin-bottom: 16px; padding: 16px; background: ${mlAnalysis.pestRisk?.level === "Low" ? "#f0fdf4" : mlAnalysis.pestRisk?.level === "Medium" ? "#fffbeb" : "#fef2f2"}; border-radius: 8px; border-left: 4px solid ${mlAnalysis.pestRisk?.level === "Low" ? "#22c55e" : mlAnalysis.pestRisk?.level === "Medium" ? "#f59e0b" : "#ef4444"};">
          <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">🐛 Pest Risk: ${mlAnalysis.pestRisk?.level || "N/A"} (${mlAnalysis.pestRisk?.probability || 0}%)</div>
          <div style="font-size: 14px; color: #6b7280;">${mlAnalysis.pestRisk?.preventiveMeasures?.join(", ") || "No measures listed"}</div>
        </div>
        `
      : ""
    }
      </div>

      <!-- Footer -->
      <div style="background: #166534; border-radius: 0 0 16px 16px; padding: 24px; text-align: center;">
        <p style="color: #bbf7d0; margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">
          MEGHDOOT — Smart Agriculture System
        </p>
        <p style="color: #86efac; margin: 0; font-size: 12px;">
          This is an automated alert from your crop monitoring dashboard.
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
};

/**
 * Sends email notification with dashboard data
 * @param {string} recipientEmail - The recipient's email address
 * @param {object} dashboardData - { sensorData, alerts, mlAnalysis }
 */
const sendAlertEmail = async (recipientEmail, dashboardData) => {
  const transporter = createTransporter();

  const html = generateAlertEmailHTML(dashboardData);

  const mailOptions = {
    from: `"MEGHDOOT Alerts 🌾" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `🌾 MEGHDOOT Farm Alert — ${new Date().toLocaleDateString("en-IN")}`,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

export { sendAlertEmail };
