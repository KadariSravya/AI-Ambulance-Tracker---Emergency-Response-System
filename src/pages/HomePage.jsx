
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EmergencyRequestForm from '@/components/EmergencyRequestForm';
import { useAuth } from '@/contexts/AuthContext';
import { useAmbulance } from '@/contexts/AmbulanceContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Brain, 
  Activity,
  Users,
  Zap,
  Heart,
  Navigation
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const { ambulances } = useAmbulance();
  const navigate = useNavigate();

  const availableAmbulances = ambulances.filter(amb => amb.status === 'available').length;
  const busyAmbulances = ambulances.filter(amb => amb.status === 'busy').length;

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Dispatch',
      description: 'Smart algorithms optimize ambulance assignment for fastest response times'
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description: 'Live GPS tracking of all ambulances with precise location updates'
    },
    {
      icon: Clock,
      title: 'Instant Response',
      description: 'Emergency requests processed and dispatched within seconds'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'HIPAA-compliant platform with 99.9% uptime guarantee'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚑</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                AI Ambulance Tracker
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                  >
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="emergency-gradient text-white">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  Emergency Response
                </span>
                <br />
                <span className="text-gray-800">Reimagined</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                AI-powered ambulance tracking and dispatch system that saves lives through 
                intelligent routing, real-time monitoring, and instant emergency response.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <EmergencyRequestForm 
                  trigger={
                    <Button className="emergency-button text-white px-8 py-4 text-lg font-semibold pulse-emergency">
                      <Phone className="mr-2 h-5 w-5" />
                      Request Emergency Ambulance
                    </Button>
                  }
                />
                
                <Link to="/tracking">
                  <Button variant="outline" className="px-8 py-4 text-lg">
                    <MapPin className="mr-2 h-5 w-5" />
                    Track Ambulances
                  </Button>
                </Link>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-2xl font-bold text-green-600">{availableAmbulances}</span>
                    <span className="text-gray-600">Available</span>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-2xl font-bold text-yellow-600">{busyAmbulances}</span>
                    <span className="text-gray-600">Active</span>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold text-blue-600">4.2</span>
                    <span className="text-gray-600">Avg Response</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="ai-badge text-white mb-4">
                <Brain className="mr-2 h-4 w-4" />
                AI-Powered Technology
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Revolutionary Emergency Response
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our cutting-edge platform combines artificial intelligence with real-time data 
                to deliver the fastest, most efficient emergency medical services.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple, fast, and life-saving emergency response in three steps
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Request Emergency',
                description: 'Submit emergency request with location and patient details',
                icon: Phone
              },
              {
                step: '02',
                title: 'AI Dispatch',
                description: 'Our AI instantly finds and dispatches the nearest available ambulance',
                icon: Brain
              },
              {
                step: '03',
                title: 'Real-Time Tracking',
                description: 'Track ambulance location and receive live updates until arrival',
                icon: Navigation
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center relative">
                      <step.icon className="h-10 w-10 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our network of emergency responders and help build a safer community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  <Users className="mr-2 h-5 w-5" />
                  Join as Responder
                </Button>
              </Link>
              <Link to="/tracking">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg">
                  <Activity className="mr-2 h-5 w-5" />
                  View Live Map
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🚑</span>
                </div>
                <span className="text-lg font-bold">AI Ambulance Tracker</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing emergency response with AI-powered dispatch and real-time tracking.
              </p>
            </div>
            
            <div>
              <span className="font-semibold mb-4 block">Quick Links</span>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer">Emergency Request</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">Track Ambulances</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">Join Network</p>
              </div>
            </div>
            
            <div>
              <span className="font-semibold mb-4 block">Support</span>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer">Help Center</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">Contact Us</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</p>
              </div>
            </div>
            
            <div>
              <span className="font-semibold mb-4 block">Emergency</span>
              <div className="space-y-2">
                <p className="text-red-400 font-bold">24/7 Emergency Line</p>
                <p className="text-gray-400">Call 911 for immediate assistance</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AI Ambulance Tracker. All rights reserved. Saving lives through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
