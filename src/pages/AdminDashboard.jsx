
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AmbulanceMap from '@/components/AmbulanceMap';
import { useAuth } from '@/contexts/AuthContext';
import { useAmbulance } from '@/contexts/AmbulanceContext';
import { 
  Shield, 
  Activity, 
  Users, 
  Truck,
  LogOut,
  User,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { ambulances, emergencyRequests, updateRequestStatus } = useAmbulance();

  const stats = {
    totalAmbulances: ambulances.length,
    availableAmbulances: ambulances.filter(amb => amb.status === 'available').length,
    activeRequests: emergencyRequests.filter(req => ['pending', 'dispatched', 'en-route'].includes(req.status)).length,
    completedToday: emergencyRequests.filter(req => req.status === 'completed').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'dispatched': return 'bg-blue-500';
      case 'en-route': return 'bg-purple-500';
      case 'arrived': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getAmbulanceStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'dispatched': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚑</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <Button variant="outline" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            System Administration
          </h1>
          <p className="text-gray-600">
            Monitor and manage the entire ambulance network and emergency response system
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Ambulances</p>
                  <p className="text-3xl font-bold text-blue-800">{stats.totalAmbulances}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Available Now</p>
                  <p className="text-3xl font-bold text-green-800">{stats.availableAmbulances}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Active Requests</p>
                  <p className="text-3xl font-bold text-yellow-800">{stats.activeRequests}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Completed Today</p>
                  <p className="text-3xl font-bold text-purple-800">{stats.completedToday}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ambulances">Ambulances</TabsTrigger>
              <TabsTrigger value="requests">Emergency Requests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AmbulanceMap />
            </TabsContent>

            <TabsContent value="ambulances" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-500" />
                    Ambulance Fleet Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ambulances.map((ambulance) => (
                      <motion.div
                        key={ambulance.id}
                        whileHover={{ scale: 1.02 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{ambulance.vehicleNumber}</h4>
                          <Badge className={`${getAmbulanceStatusColor(ambulance.status)} text-white`}>
                            {ambulance.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{ambulance.driverName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{ambulance.location.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Updated {new Date(ambulance.lastUpdate).toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex flex-wrap gap-1">
                            {ambulance.equipment.slice(0, 3).map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {ambulance.equipment.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{ambulance.equipment.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Emergency Requests Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        whileHover={{ scale: 1.01 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">Request #{request.id}</h4>
                            <p className="text-sm text-gray-600">{request.emergencyType}</p>
                          </div>
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">Patient:</span>
                            </div>
                            <p className="text-gray-600">{request.patientName}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">Contact:</span>
                            </div>
                            <p className="text-gray-600">{request.phone}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">Location:</span>
                            </div>
                            <p className="text-gray-600">{request.location.address}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Created:</span> {new Date(request.createdAt).toLocaleString()}
                          </div>
                          {request.assignedAmbulance && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Assigned:</span> {
                                ambulances.find(amb => amb.id === request.assignedAmbulance)?.vehicleNumber || 'Unknown'
                              }
                            </div>
                          )}
                        </div>
                        
                        {request.description && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Description:</span> {request.description}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Response Time Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Average Response Time</span>
                        <span className="text-2xl font-bold text-blue-600">4.2 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Best Response Time</span>
                        <span className="text-lg font-semibold text-green-600">2.1 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Target Response Time</span>
                        <span className="text-lg font-semibold text-gray-600">5.0 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">84% of responses meet target time</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Daily Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Calls Today</span>
                        <span className="text-2xl font-bold text-blue-600">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Completed Calls</span>
                        <span className="text-lg font-semibold text-green-600">21</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-lg font-semibold text-green-600">91.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Peak Hour</span>
                        <span className="text-lg font-semibold text-gray-600">2:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-500" />
                    Emergency Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { type: 'Cardiac', count: 8, color: 'bg-red-500' },
                      { type: 'Trauma', count: 6, color: 'bg-orange-500' },
                      { type: 'Respiratory', count: 4, color: 'bg-blue-500' },
                      { type: 'Stroke', count: 3, color: 'bg-purple-500' },
                      { type: 'Overdose', count: 1, color: 'bg-yellow-500' },
                      { type: 'Other', count: 1, color: 'bg-gray-500' }
                    ].map((item) => (
                      <div key={item.type} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-2 ${item.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">{item.count}</span>
                        </div>
                        <p className="text-sm font-medium">{item.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
