import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Users, 
  Target, 
  Award, 
  Globe,
  Heart,
  Lightbulb,
  Sprout,
  TreePine,
  Wheat,
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Quote,
  Rocket
} from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Sagar Sharma",
      role: "Frontend Developer & backend developer",
      bio: "ELCE student with a passion for frontend development and backend integration. Dedicated to creating seamless user experiences for our smart agriculture platform.",
      image: "/images/team/sagar-sharma.jpg",
      skills: ["React", "Node.js", "UI/UX Design", "API Development" , "Database Management"]
    },
    {
      name: "Dakshita pal",
      role: "ppt developer",
      bio: "IT student with a strong soft skills and a passion for creating compelling presentations. Dedicated to effectively communicating our mission and impact to stakeholders.",
      image: "/images/team/dakshita.jpg",
      skills: ["PowerPoint", "Design", "Communication", "Storytelling"]
    },
    {
      name: "Shivam Tiwari",
      role: "Hardware Developer, Embedded Systems Engg",
      bio: "ECE student with a passion for hardware design and embedded systems. Dedicated to building robust, scalable solutions for smart agriculture.",
      image: "/images/team/shivam.jpg",
      skills: ["Arduino", "Raspberry Pi", "Sensor Integration", "Embedded Systems"]
    },
    {
      name: "Vaibhav Kumar Singh",
      role: "RND & Data Analyst",
      bio: "IT student with a strong background in data analysis and research. Dedicated to leveraging data to drive agricultural innovation.",
      image: "/images/team/vaibhav.jpg",
      skills: ["Agriculture", "Data Analysis", "Research", "Statistics"]
    },
    {
      name: "Siddhart Shukla",
      role: "Machine Learning and Model Training",
      bio: "IT student with a passion for applying machine learning to solve real-world problems. Focused on developing predictive models for agriculture.",
      image: "/images/team/siddhart.jpg",
      skills: ["Python", "Machine Learning", "Data Science", "Agriculture"]
    }
  ];

  const milestones = [
    {
      year: "2026",
      title: "Project Inception",
      description: "Team formation and initial research into smart agriculture challenges in India",
      icon: Lightbulb
    },
    {
      year: "Early 2026",
      title: "Prototype Development",
      description: "First working prototype with basic soil monitoring sensors and ML model",
      icon: Sprout
    },
    {
      year: "current 2026",
      title: "Field Testing",
      description: "Testing with local farmers in greater noida, gathering feedback and iterating on the design",
      icon: TreePine
    },
    {
      year: "Later 2026",
      title: "Future Scale Deployment",
      description: "National Expansion Late 2026 Scaling the platform to all Indian states with regional language support and localized crop recommendations",
      icon: Rocket
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting eco-friendly farming practices that preserve our environment for future generations",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Users,
      title: "Farmer First",
      description: "Every solution we create is designed with the farmer's needs and challenges at the forefront",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously pushing boundaries with cutting-edge technology to solve real-world problems",
      color: "from-teal-400 to-teal-600"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making advanced agricultural technology affordable and accessible to farmers of all scales",
      color: "from-lime-400 to-lime-600"
    }
  ];

  const impacts = [
    { number: "500+", label: "Acres Monitored", description: "Farmland under smart monitoring" },
    { number: "150+", label: "Farmers Helped", description: "Direct beneficiaries of our technology" },
    { number: "40%", label: "Yield Increase", description: "Average improvement in crop yields" },
    { number: "60%", label: "Water Saved", description: "Reduction in water usage through precision irrigation" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"></div>
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop" 
            alt="Smart farming technology"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-green-900 bg-opacity-40"></div> */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            SIH 2025 Smart Agriculture Champions
          </div> */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight  text-shadow-lg text-shadow-green-500/50">
            About Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Empowering farmers with intelligent technology to create a sustainable agricultural future for India
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              id="story"
              className={`transform transition-all duration-700 ${
                isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop" 
                  alt="Traditional farming meeting technology"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Wheat className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <div 
              className={`transform transition-all duration-700 ${
                isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-16 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full mr-6"></div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Story</h2>
                  <p className="text-green-600 font-medium">From Idea to Impact</p>
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  It all started during a visit to rural Punjab, where we witnessed firsthand the challenges farmers face daily. Despite their dedication and hard work, many were struggling with unpredictable weather, soil degradation, and inefficient resource usage.
                </p>
                
                <p>
                  As engineering students, we realized that technology could bridge this gap. We envisioned a future where every farmer, regardless of their scale of operation, could access the same advanced agricultural insights that large commercial farms enjoy.
                </p>

                <div className="flex items-start space-x-4 bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                  <Quote className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="italic text-green-800 font-medium">
                      "Our goal is not just to increase yields, but to create a sustainable ecosystem where technology empowers farmers to make informed decisions while preserving our precious natural resources."
                    </p>
                    <p className="text-green-600 text-sm mt-2">- Team SPD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our mission to revolutionize agriculture through technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                id={`value-${index}`}
                className={`group text-center transform transition-all duration-700 hover:-translate-y-2 ${
                  isVisible[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of passionate individuals united by the vision of transforming agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                id={`team-${index}`}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                  isVisible[`team-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to reality - the key milestones in our smart agriculture revolution
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  id={`milestone-${index}`}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div 
                      className={`transform transition-all duration-700 ${
                        isVisible[`milestone-${index}`] ? 'opacity-100 translate-x-0' : 
                        `opacity-0 ${index % 2 === 0 ? 'translate-x-8' : '-translate-x-8'}`
                      }`}
                    >
                      <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4 space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <milestone.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                            <p className="text-green-600 font-medium">{milestone.year}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=800&fit=crop" 
            alt="Agricultural landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact So Far</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Measuring success through real-world results and positive changes in farming communities
            </p>
          </div>

          <div 
            id="impact-stats"
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-700 ${
              isVisible['impact-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {impacts.map((impact, index) => (
              <div 
                key={index}
                className=" text-blue-800 text-center bg-blue-100 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold  mb-2">{impact.number}</div>
                <div className="text-green-500 font-semibold text-lg mb-2">{impact.label}</div>
                <div className="text-green-700 text-sm">{impact.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              id="vision"
              className={`transform transition-all duration-700 ${
                isVisible.vision ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-16 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full mr-6"></div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Vision for 2030</h2>
                  <p className="text-green-600 font-medium">Transforming Indian Agriculture</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We envision a future where every farmer in India has access to intelligent, affordable agricultural technology. By 2030, we aim to empower over 1 million farmers with our smart agriculture solutions.
                </p>

                <div className="space-y-4">
                  {[
                    "Scale to 10,000+ farms across India",
                    "Reduce water usage by 50% nationally",
                    "Increase average crop yields by 40%",
                    "Create sustainable livelihoods for rural communities"
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{goal}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
                    Join Our Mission
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            <div 
              className={`transform transition-all duration-700 ${
                isVisible.vision ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop" 
                  alt="Future of farming"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-8">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Want to Learn More?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We'd love to share more about our journey and discuss how we can work together to transform agriculture in India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                <Mail className="mr-2 w-5 h-5" />
                Get in Touch
              </button>
              <button className="px-8 py-4 border-2 border-green-500 text-green-600 rounded-xl font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { About };
