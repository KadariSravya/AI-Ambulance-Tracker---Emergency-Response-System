
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Activity,
  LogOut,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { emergencyRequests, ambulances } = useAmbulance();

  const userRequests = emergencyRequests.filter(req => req.patientName?.toLowerCase().includes(user?.name?.toLowerCase() || ''));

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'dispatched': return Activity;
      case 'en-route': return MapPin;
      case 'arrived': return CheckCircle;
      case 'completed': return CheckCircle;
      default: return AlertTriangle;
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
                AI Ambulance Tracker
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your emergency requests and track ambulance services
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Emergency Request</h3>
                  <p className="text-sm text-red-600">Request immediate ambulance assistance</p>
                </div>
                <EmergencyRequestForm 
                  trigger={
                    <Button className="emergency-button text-white">
                      <Phone className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Track Ambulances</h3>
                  <p className="text-sm text-blue-600">View real-time ambulance locations</p>
                </div>
                <Link to="/tracking">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">My Requests</h3>
                  <p className="text-sm text-green-600">{userRequests.length} active requests</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                My Emergency Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Requests</h3>
                  <p className="text-gray-600 mb-4">You haven't made any emergency requests yet.</p>
                  <EmergencyRequestForm 
                    trigger={
                      <Button className="emergency-button text-white">
                        <Phone className="mr-2 h-4 w-4" />
                        Make Emergency Request
                      </Button>
                    }
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {userRequests.map((request) => {
                    const StatusIcon = getStatusIcon(request.status);
                    return (
                      <motion.div
                        key={request.id}
                        whileHover={{ scale: 1.02 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${getStatusColor(request.status)} flex items-center justify-center`}>
                              <StatusIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">Request #{request.id}</h4>
                              <p className="text-sm text-gray-600">{request.emergencyType}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(request.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(request.status)} text-white mb-2`}>
                              {request.status}
                            </Badge>
                            {request.estimatedArrival && (
                              <p className="text-sm text-gray-600">
                                ETA: {new Date(request.estimatedArrival).toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                        </div>
                        {request.assignedAmbulance && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-gray-600">
                              Assigned Ambulance: {ambulances.find(amb => amb.id === request.assignedAmbulance)?.vehicleNumber || 'Unknown'}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium">Available Ambulances</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {ambulances.filter(amb => amb.status === 'available').length}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h4 className="font-medium">Average Response</h4>
                  <p className="text-2xl font-bold text-yellow-600">4.2 min</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Active Requests</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {emergencyRequests.filter(req => ['pending', 'dispatched', 'en-route'].includes(req.status)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
