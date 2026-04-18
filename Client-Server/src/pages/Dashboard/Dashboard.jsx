import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  Leaf,
  BarChart3
} from 'lucide-react';
import VoiceIrrigationBot from '../../components/VoiceIrrigationBot/VoiceIrrigationBot';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertsVisible, setAlertsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dummy sensor data
  const sensorData = {
    soilMoisture: 11,
    soilPh: 6.8,
    temperature: 28.5,
    humidity: 11,
    lightIntensity: 850,
    nitrogen: 45,
    phosphorus: 38,
    potassium: 52,
    electricalConductivity: 1.2
  };

  // ML Analysis Results (dummy)
  const mlAnalysis = {
    wateringRecommendation: {
      status: "optimal",
      message: "Soil moisture is at optimal level",
      action: "No watering needed for next 8 hours",
      confidence: 92
    },
    cropHealth: {
      status: "good",
      score: 78,
      factors: ["Good moisture levels", "Adequate nutrition", "Optimal temperature"]
    },
    fertilizerRecommendation: {
      nitrogen: "Medium priority",
      phosphorus: "Low priority", 
      potassium: "Good levels",
      recommendation: "Consider nitrogen fertilizer in 3-4 days"
    },
    pestRisk: {
      level: "Low",
      probability: 15,
      preventiveMeasures: ["Monitor humidity levels", "Ensure good air circulation"]
    }
  };

  // Alerts
  const alerts = [
    { id: 1, type: "warning", message: "Soil pH slightly below optimal range", priority: "medium" },
    { id: 2, type: "info", message: "Weather forecast: Rain expected in 2 days", priority: "low" },
    { id: 3, type: "success", message: "Irrigation system functioning normally", priority: "low" }
  ];

  const rainExpected = alerts.some((alert) => alert.message.toLowerCase().includes("rain expected"));

  const getStatusColor = (status) => {
    switch (status) {
      case "optimal": case "good": return "text-green-600 bg-green-50";
      case "warning": case "medium": return "text-yellow-600 bg-yellow-50";
      case "critical": case "high": return "text-red-600 bg-red-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  const MetricCard = ({ title, value, unit, icon: Icon, trend, status = "normal" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
            {React.createElement(Icon, { className: "w-5 h-5" })}
          </div>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );

  const AnalysisCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          {React.createElement(Icon, { className: "w-5 h-5 text-blue-600" })}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Smart Agriculture Dashboard</h1>
            <div className="text-sm text-gray-500">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <p className="text-gray-600">HackBMU 8.0 - Real-time crop monitoring and AI-powered insights</p>
        </div>

        {/* Alerts Section */}
        {alertsVisible && alerts.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Active Alerts
              </h2>
              <button 
                onClick={() => setAlertsVisible(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Dismiss all
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`flex items-center p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-400' :
                  alert.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sensor Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Soil Moisture" 
            value={sensorData.soilMoisture} 
            unit="%" 
            icon={Droplets}
            status="optimal"
            trend={2}
          />
          <MetricCard 
            title="Temperature" 
            value={sensorData.temperature} 
            unit="°C" 
            icon={Thermometer}
            status="optimal"
            trend={-1}
          />
          <MetricCard 
            title="Humidity" 
            value={sensorData.humidity} 
            unit="%" 
            icon={Wind}
            status="optimal"
            trend={3}
          />
          <MetricCard 
            title="Light Intensity" 
            value={sensorData.lightIntensity} 
            unit="lux" 
            icon={Sun}
            status="optimal"
            trend={5}
          />
          <MetricCard 
            title="Soil pH" 
            value={sensorData.soilPh} 
            unit="" 
            icon={Activity}
            status="warning"
            trend={0}
          />
          <MetricCard 
            title="Nitrogen (N)" 
            value={sensorData.nitrogen} 
            unit="ppm" 
            icon={Leaf}
            status="medium"
            trend={-2}
          />
          <MetricCard 
            title="Phosphorus (P)" 
            value={sensorData.phosphorus} 
            unit="ppm" 
            icon={BarChart3}
            status="good"
            trend={1}
          />
          <MetricCard 
            title="Electrical Conductivity" 
            value={sensorData.electricalConductivity} 
            unit="mS/cm" 
            icon={Zap}
            status="optimal"
            trend={0}
          />
        </div>

        {/* ML Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Watering Recommendation */}
          <AnalysisCard title="AI Watering Analysis" icon={Droplets}>
            <div className={`p-4 rounded-lg ${getStatusColor(mlAnalysis.wateringRecommendation.status)}`}>
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{mlAnalysis.wateringRecommendation.message}</span>
              </div>
              <p className="text-sm mb-3">{mlAnalysis.wateringRecommendation.action}</p>
              <div className="text-xs">
                Confidence: {mlAnalysis.wateringRecommendation.confidence}%
              </div>
            </div>
          </AnalysisCard>

          {/* Crop Health */}
          <AnalysisCard title="Crop Health Assessment" icon={Leaf}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Health Score</span>
                <span className="text-2xl font-bold text-green-600">{mlAnalysis.cropHealth.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mlAnalysis.cropHealth.score}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Contributing factors:</p>
                <ul className="space-y-1">
                  {mlAnalysis.cropHealth.factors.map((factor, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnalysisCard>
        </div>

        {/* Additional Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fertilizer Recommendation */}
          <AnalysisCard title="Fertilizer Recommendations" icon={BarChart3}>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Nitrogen</div>
                  <div className="text-xs text-yellow-600">{mlAnalysis.fertilizerRecommendation.nitrogen}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Phosphorus</div>
                  <div className="text-xs text-green-600">{mlAnalysis.fertilizerRecommendation.phosphorus}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Potassium</div>
                  <div className="text-xs text-green-600">{mlAnalysis.fertilizerRecommendation.potassium}</div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{mlAnalysis.fertilizerRecommendation.recommendation}</p>
              </div>
            </div>
          </AnalysisCard>

          {/* Pest Risk Analysis */}
          <AnalysisCard title="Pest Risk Analysis" icon={AlertTriangle}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mlAnalysis.pestRisk.level === 'Low' ? 'bg-green-100 text-green-800' :
                  mlAnalysis.pestRisk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mlAnalysis.pestRisk.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Probability</span>
                <span className="text-sm font-medium">{mlAnalysis.pestRisk.probability}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    mlAnalysis.pestRisk.probability < 30 ? 'bg-green-500' :
                    mlAnalysis.pestRisk.probability < 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${mlAnalysis.pestRisk.probability}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Preventive measures:</p>
                <ul className="space-y-1">
                  {mlAnalysis.pestRisk.preventiveMeasures.map((measure, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnalysisCard>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Smart Agriculture System | Hardware sensors connected | ML models active</p>
        </div>
      </div>
      <VoiceIrrigationBot
        soilMoisture={sensorData.soilMoisture}
        humidity={sensorData.humidity}
        rainExpected={rainExpected}
      />
    </div>
  );
};

export { Dashboard };
