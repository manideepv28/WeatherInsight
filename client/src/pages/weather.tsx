import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudSnow,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  MapPin,
  Clock,
  Calendar
} from "lucide-react";

// Mock weather data for demonstration as requested
const mockWeatherData = {
  location: {
    city: "San Francisco",
    state: "CA"
  },
  current: {
    temperature: 72,
    condition: "Sunny",
    description: "Clear skies with plenty of sunshine",
    high: 78,
    low: 65,
    humidity: 65,
    windSpeed: "8 mph",
    pressure: "30.15 in",
    visibility: "10 mi",
    icon: "sun"
  },
  hourly: [
    { time: "3 PM", temperature: 74, icon: "sun" },
    { time: "4 PM", temperature: 73, icon: "cloud-sun" },
    { time: "5 PM", temperature: 71, icon: "cloud-sun" },
    { time: "6 PM", temperature: 69, icon: "cloud" },
    { time: "7 PM", temperature: 67, icon: "cloud" },
    { time: "8 PM", temperature: 66, icon: "cloud-rain" }
  ],
  weekly: [
    { name: "Today", high: 78, low: 65, precipitation: "0%", description: "Sunny and clear", icon: "sun" },
    { name: "Mon", high: 75, low: 62, precipitation: "10%", description: "Partly cloudy", icon: "cloud-sun" },
    { name: "Tue", high: 71, low: 58, precipitation: "20%", description: "Mostly cloudy", icon: "cloud" },
    { name: "Wed", high: 68, low: 55, precipitation: "70%", description: "Light rain", icon: "cloud-rain" },
    { name: "Thu", high: 65, low: 52, precipitation: "90%", description: "Heavy rain", icon: "cloud-rain" },
    { name: "Fri", high: 72, low: 59, precipitation: "15%", description: "Partly cloudy", icon: "cloud-sun" },
    { name: "Sat", high: 76, low: 63, precipitation: "0%", description: "Sunny and warm", icon: "sun" }
  ]
};

// Weather icon mapping
const getWeatherIcon = (iconType: string, size: "sm" | "md" | "lg" = "md") => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-16 w-16"
  };
  
  const iconClass = sizeClasses[size];
  
  switch (iconType) {
    case "sun":
      return <Sun className={`${iconClass} text-yellow-500`} />;
    case "cloud":
      return <Cloud className={`${iconClass} text-gray-500`} />;
    case "cloud-sun":
      return <CloudSun className={`${iconClass} text-gray-400`} />;
    case "cloud-rain":
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    case "cloud-snow":
      return <CloudSnow className={`${iconClass} text-blue-300`} />;
    default:
      return <Sun className={`${iconClass} text-yellow-500`} />;
  }
};

// Weather metric component
interface WeatherMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

const WeatherMetric = ({ icon, label, value, bgColor }: WeatherMetricProps) => (
  <div className={`${bgColor} rounded-2xl p-4`}>
    <div className="flex items-center mb-2">
      {icon}
      <span className="text-gray-600 text-sm font-medium ml-3">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);

// Hourly forecast card component
interface HourlyCardProps {
  time: string;
  temperature: number;
  icon: string;
}

const HourlyCard = ({ time, temperature, icon }: HourlyCardProps) => (
  <div className="flex-shrink-0 text-center bg-blue-50 rounded-xl p-4 min-w-[100px]">
    <div className="text-sm font-medium text-gray-600 mb-2">{time}</div>
    <div className="mb-2 flex justify-center">
      {getWeatherIcon(icon, "md")}
    </div>
    <div className="text-lg font-bold text-gray-800">{temperature}°</div>
  </div>
);

// Daily forecast card component
interface DailyForecastCardProps {
  name: string;
  high: number;
  low: number;
  precipitation: string;
  description: string;
  icon: string;
  isToday?: boolean;
}

const DailyForecastCard = ({ 
  name, 
  high, 
  low, 
  precipitation, 
  description, 
  icon, 
  isToday = false 
}: DailyForecastCardProps) => (
  <div className={`flex items-center justify-between p-4 rounded-xl hover:opacity-80 transition-all ${
    isToday ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
  }`}>
    <div className="flex items-center space-x-4 flex-1">
      <div className="text-sm font-medium text-gray-800 w-16">{name}</div>
      <div className="w-10 flex justify-center">
        {getWeatherIcon(icon, "md")}
      </div>
      <div className="text-sm text-gray-600 flex-1">{description}</div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-sm text-gray-500">{precipitation}</div>
      <div className="text-right">
        <span className="text-lg font-bold text-gray-800">{high}°</span>
        <span className="text-gray-500 ml-2">{low}°</span>
      </div>
    </div>
  </div>
);

export default function Weather() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) + ' • ' + now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
            <MapPin className="h-8 w-8 mr-2" />
            {mockWeatherData.location.city}, {mockWeatherData.location.state}
          </h1>
          <p className="text-blue-100 text-lg">{currentTime}</p>
        </header>

        {/* Current Weather */}
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Current Temperature Section */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="mr-4">
                    {getWeatherIcon(mockWeatherData.current.icon, "lg")}
                  </div>
                  <div>
                    <div className="text-6xl md:text-7xl font-bold text-gray-800">
                      {mockWeatherData.current.temperature}°
                    </div>
                    <div className="text-xl text-gray-600">
                      {mockWeatherData.current.condition}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 mb-4">
                  {mockWeatherData.current.description}
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-500">
                  <span className="mr-4">
                    H: <span className="font-medium">{mockWeatherData.current.high}°</span>
                  </span>
                  <span>
                    L: <span className="font-medium">{mockWeatherData.current.low}°</span>
                  </span>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <WeatherMetric
                  icon={<Droplets className="h-5 w-5 text-blue-500" />}
                  label="Humidity"
                  value={`${mockWeatherData.current.humidity}%`}
                  bgColor="bg-blue-50"
                />
                <WeatherMetric
                  icon={<Wind className="h-5 w-5 text-green-500" />}
                  label="Wind"
                  value={mockWeatherData.current.windSpeed}
                  bgColor="bg-green-50"
                />
                <WeatherMetric
                  icon={<Thermometer className="h-5 w-5 text-purple-500" />}
                  label="Pressure"
                  value={mockWeatherData.current.pressure}
                  bgColor="bg-purple-50"
                />
                <WeatherMetric
                  icon={<Eye className="h-5 w-5 text-amber-500" />}
                  label="Visibility"
                  value={mockWeatherData.current.visibility}
                  bgColor="bg-amber-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast */}
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-blue-500" />
              Hourly Forecast
            </h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {mockWeatherData.hourly.map((hour, index) => (
                <HourlyCard
                  key={index}
                  time={hour.time}
                  temperature={hour.temperature}
                  icon={hour.icon}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Forecast */}
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-blue-500" />
              7-Day Forecast
            </h2>
            
            <div className="space-y-4">
              {mockWeatherData.weekly.map((day, index) => (
                <DailyForecastCard
                  key={index}
                  name={day.name}
                  high={day.high}
                  low={day.low}
                  precipitation={day.precipitation}
                  description={day.description}
                  icon={day.icon}
                  isToday={index === 0}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-8 text-white/80">
          <p className="text-sm">Weather data updated every hour • Last updated: {currentTime.split(' • ')[1]}</p>
          <p className="text-xs mt-2">Weather information for demonstration purposes</p>
        </footer>

      </div>
    </div>
  );
}
