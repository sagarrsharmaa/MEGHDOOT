import { apiError } from "../utils/apiError.util.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import axios from "axios";

const ai = asyncAwaitHandler(async (req, res) => {
  const soilData = req.body; // directly receive soil data from frontend
  console.log("Data from Hardware:", soilData);

  // validate required fields
  const { temperature, humidity, nitrogen, ph } = soilData;
  if (
    temperature === undefined ||
    humidity === undefined ||
    nitrogen === undefined ||
    ph === undefined
  ) {
    throw new apiError(400, "temperature, humidity, nitrogen and ph are required");
  }

  try {
    // forward request to FastAPI ML server
    const aiResponse = await axios.post("http://localhost:8000/predict", soilData);

    console.log("Response from AI server:", aiResponse.data);

    return res.status(200).json(
      new apiResponse(
        200,
        aiResponse.data, // already clean JSON from FastAPI
        "AI analysis generated successfully"
      )
    );
  } catch (error) {
    console.error("AI analysis Error:", error?.response?.data || error.message);
    throw new apiError(500, "ai controller failed", error);
  }
});

export { ai };
