
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useAmbulance } from '@/contexts/AmbulanceContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Activity,
  LogOut,
  User,
  Navigation,
  Phone,
  AlertTriangle
} from 'lucide-react';

const DriverDashboard = () => {
  const { user, logout } = useAuth();
  const { ambulances, emergencyRequests, updateAmbulanceStatus } = useAmbulance();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('available');

  // Find the ambulance assigned to this driver
  const myAmbulance = ambulances.find(amb => 
    amb.driverName.toLowerCase().includes(user?.name?.toLowerCase() || '')
  ) || ambulances[0]; // Fallback to first ambulance for demo

  const assignedRequests = emergencyRequests.filter(req => 
    req.assignedAmbulance === myAmbulance?.id && 
    ['dispatched', 'en-route'].includes(req.status)
  );

  const handleStatusUpdate = (newStatus) => {
    if (myAmbulance) {
      updateAmbulanceStatus(myAmbulance.id, newStatus);
      setSelectedStatus(newStatus);
      toast({
        title: "Status Updated",
        description: `Ambulance status changed to ${newStatus}`,
      });
    }
  };

  const getStatusColor = (status) => {
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
                Driver Dashboard
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Driver</p>
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
            Welcome, Driver {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your ambulance status and respond to emergency calls
          </p>
        </motion.div>

        {/* Vehicle Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myAmbulance && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Vehicle Number:</span>
                      <p className="text-gray-600">{myAmbulance.vehicleNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium">Current Status:</span>
                      <Badge className={`${getStatusColor(myAmbulance.status)} text-white ml-2`}>
                        {myAmbulance.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-gray-600">{myAmbulance.location.address}</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Update:</span>
                      <p className="text-gray-600">{new Date(myAmbulance.lastUpdate).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Equipment:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {myAmbulance.equipment.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  Update your availability status to help dispatch emergency calls efficiently.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Active Emergency Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Assignments</h3>
                  <p className="text-gray-600">You currently have no emergency calls assigned.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      whileHover={{ scale: 1.02 }}
                      className="border border-red-200 rounded-lg p-4 bg-red-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-red-800">Emergency Request #{request.id}</h4>
                          <p className="text-sm text-red-600">{request.emergencyType}</p>
                        </div>
                        <Badge className="bg-red-500 text-white">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <User className="h-4 w-4" />
                            <span>Patient: {request.patientName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <Phone className="h-4 w-4" />
                            <span>Contact: {request.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="h-4 w-4" />
                            <span>Location: {request.location.address}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <Clock className="h-4 w-4" />
                            <span>Requested: {new Date(request.createdAt).toLocaleTimeString()}</span>
                          </div>
                          {request.estimatedArrival && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                              <Navigation className="h-4 w-4" />
                              <span>ETA: {new Date(request.estimatedArrival).toLocaleTimeString()}</span>
                            </div>
                          )}
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">Severity:</span> {request.severity}
                          </div>
                        </div>
                      </div>
                      
                      {request.description && (
                        <div className="mt-3 pt-3 border-t border-red-200">
                          <span className="font-medium text-sm">Description:</span>
                          <p className="text-sm text-gray-700 mt-1">{request.description}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex gap-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                          <Navigation className="mr-2 h-4 w-4" />
                          Navigate
                        </Button>
                        <Button variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Patient
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Today's Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Calls Completed</h4>
                  <p className="text-2xl font-bold text-blue-600">7</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium">Avg Response Time</h4>
                  <p className="text-2xl font-bold text-green-600">3.8 min</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h4 className="font-medium">Distance Covered</h4>
                  <p className="text-2xl font-bold text-yellow-600">142 km</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium">Hours Active</h4>
                  <p className="text-2xl font-bold text-purple-600">8.5 hrs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverDashboard;
