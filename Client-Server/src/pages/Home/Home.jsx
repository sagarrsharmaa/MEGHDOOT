import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play,
  Zap, 
  BarChart3, 
  Shield, 
  Smartphone,
  Cloud,
  TrendingUp,
  ChevronDown,
  Star,
  CheckCircle,
  Brain,
  Droplets,
  Users,
  Timer,
  Sparkles,
  ExternalLink,
  Leaf
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));

    return () => {
      clearInterval(slideTimer);
      observer.disconnect();
    };
  }, []);

  const heroSlides = [
    {
      title: "Smart Agriculture Revolution",
      subtitle: "Transform farming with AI-powered insights and IoT sensors",
      bg: "from-emerald-500 via-green-100 to-lime-500",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=800&fit=crop"
    },
    {
      title: "Precision Farming Made Simple",
      subtitle: "Real-time monitoring for maximum yields",
      bg: "from-green-500 via-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=800&fit=crop"
    },
    {
      title: "Data-Driven Agriculture",
      subtitle: "Machine learning meets farming innovation",
      bg: "from-lime-500 via-green-100 to-emerald-100",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms provide actionable insights for optimal crop management",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Droplets,
      title: "Smart Irrigation System",
      description: "Automated watering based on real-time soil moisture and weather predictions",
      color: "from-cyan-500 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Crop Health Monitoring",
      description: "Continuous monitoring with early disease detection capabilities",
      color: "from-lime-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Pest Prediction",
      description: "Predictive analytics for pest outbreaks with preventive recommendations",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Hyper-local weather forecasting integrated with farming recommendations",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Dashboard",
      description: "Complete farm management from your smartphone with real-time notifications",
      color: "from-emerald-500 to-lime-600"
    }
  ];

  const stats = [
    { 
      number: "10,000+", 
      label: "Farmers Connected", 
      icon: Users,
      color: "from-emerald-400 to-green-600"
    },
    { 
      number: "45%", 
      label: "Yield Improvement", 
      icon: TrendingUp,
      color: "from-lime-400 to-green-600"
    },
    { 
      number: "60%", 
      label: "Water Saved", 
      icon: Droplets,
      color: "from-teal-400 to-emerald-600"
    },
    { 
      number: "99.8%", 
      label: "System Uptime", 
      icon: CheckCircle,
      color: "from-green-400 to-emerald-600"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Patel",
      role: "Commercial Farmer, Gujarat",
      quote: "SPD increased my tomato yield by 50% while reducing water costs. The AI recommendations are incredibly accurate!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sunita Devi",
      role: "Progressive Farmer, Punjab",
      quote: "The pest prediction feature saved my entire wheat crop. I received alerts 5 days before the outbreak!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const renderFeatureCard = (feature, index) => (
    <div 
      key={index}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 ${
        isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      id={`feature-${index}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-6`}>
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );

  const StatCard = ({ stat, index }) => (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 p-6 text-center transform hover:-translate-y-1 ${
        isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
        <stat.icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
      <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroSlides[currentSlide].image}
            alt="Smart Agriculture"
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} mix-blend-multiply opacity-85 transition-all duration-1000`}></div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-lime-200 bg-opacity-20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-emerald-200 bg-opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-green-200 bg-opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-emerald-900 bg-opacity-40 rounded-full text-white text-sm font-semibold mb-8 border border-green-300 border-opacity-50 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2 text-lime-300" />
              <span>MEGHDOOT - Smart Agriculture Irrigation Product</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-shadow-lg text-shadow-green-500/50 text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-12 max-w-4xl mx-auto font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center">
              <Zap className="mr-3 w-5 h-5 text-green-500" />
              Get Started
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="group px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center">
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="flex justify-center space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-40 hover:bg-opacity-70'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
              Transforming Agriculture Across India
            </h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Real impact, measurable results from smart agriculture technology
            </p>
          </div>

          <div id="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-white via-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
              Intelligent Features for Modern Farming
            </h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto">
              Cutting-edge IoT sensors, machine learning, and real-time analytics working together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-lime-50 via-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
              Trusted by Farmers Across India
            </h2>
            <p className="text-xl text-green-700">
              Real success stories from the field
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-800 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16  bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=800&fit=crop" 
            alt="Modern farming"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-emerald-600/80 to-lime-600/80"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-10 max-w-3xl mx-auto">
            Join the smart agriculture revolution and boost your farming productivity
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button className="group px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center">
              <Timer className="mr-3 w-5 h-5 text-green-600" />
              Start Free Trial
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center">
              <ExternalLink className="mr-3 w-5 h-5" />
              Book Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-sm">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Easy setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">SPD</span>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-gray-400 text-sm mb-2">
                © 2026 SPD. All rights reserved.
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export  {Home};
