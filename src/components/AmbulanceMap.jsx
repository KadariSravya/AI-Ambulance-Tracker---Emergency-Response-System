
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAmbulance } from '@/contexts/AmbulanceContext';
import { MapPin, Navigation, Clock, Activity } from 'lucide-react';

const AmbulanceMap = () => {
  const { ambulances, emergencyRequests } = useAmbulance();
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'dispatched': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'dispatched': return 'Dispatched';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            Live Ambulance Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="map-container h-96 relative overflow-hidden">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Street lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#94a3b8" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Ambulance Icons */}
            {ambulances.map((ambulance, index) => (
              <motion.div
                key={ambulance.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 20}%`
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedAmbulance(ambulance)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full ${getStatusColor(ambulance.status)} flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xs font-bold">🚑</span>
                  </div>
                  {ambulance.status === 'dispatched' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Emergency Request Markers */}
            {emergencyRequests.slice(0, 3).map((request, index) => (
              <motion.div
                key={request.id}
                className="absolute"
                style={{
                  left: `${60 + index * 15}%`,
                  top: `${40 + index * 15}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg pulse-emergency">
                  <span className="text-white text-xs">!</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ambulance List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ambulances.map((ambulance) => (
          <motion.div
            key={ambulance.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`cursor-pointer transition-all duration-200 ${
              selectedAmbulance?.id === ambulance.id ? 'ring-2 ring-red-500' : ''
            }`}
            onClick={() => setSelectedAmbulance(ambulance)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{ambulance.vehicleNumber}</CardTitle>
                  <Badge className={`${getStatusColor(ambulance.status)} text-white`}>
                    {getStatusText(ambulance.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Navigation className="h-4 w-4" />
                  <span>{ambulance.driverName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{ambulance.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date(ambulance.lastUpdate).toLocaleTimeString()}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ambulance.equipment.slice(0, 3).map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {ambulance.equipment.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{ambulance.equipment.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Ambulance Details */}
      {selectedAmbulance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Activity className="h-5 w-5" />
                {selectedAmbulance.vehicleNumber} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Driver:</span>
                  <p className="text-gray-600">{selectedAmbulance.driverName}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <p className="text-gray-600">{getStatusText(selectedAmbulance.status)}</p>
                </div>
                <div>
                  <span className="font-medium">Location:</span>
                  <p className="text-gray-600">{selectedAmbulance.location.address}</p>
                </div>
                <div>
                  <span className="font-medium">Last Update:</span>
                  <p className="text-gray-600">{new Date(selectedAmbulance.lastUpdate).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <span className="font-medium">Equipment:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAmbulance.equipment.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AmbulanceMap;
