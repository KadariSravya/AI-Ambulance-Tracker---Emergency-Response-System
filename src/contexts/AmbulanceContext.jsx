
import React, { createContext, useContext, useState, useEffect } from 'react';

const AmbulanceContext = createContext();

export const useAmbulance = () => {
  const context = useContext(AmbulanceContext);
  if (!context) {
    throw new Error('useAmbulance must be used within an AmbulanceProvider');
  }
  return context;
};

export const AmbulanceProvider = ({ children }) => {
  const [ambulances, setAmbulances] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const savedAmbulances = localStorage.getItem('ambulances');
    const savedRequests = localStorage.getItem('emergency_requests');
    
    if (savedAmbulances) {
      setAmbulances(JSON.parse(savedAmbulances));
    } else {
      // Initialize with mock data
      const mockAmbulances = [
        {
          id: 1,
          vehicleNumber: 'AMB-001',
          driverName: 'John Smith',
          status: 'available',
          location: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, NY' },
          equipment: ['AED', 'Oxygen', 'Stretcher', 'First Aid'],
          lastUpdate: new Date().toISOString()
        },
        {
          id: 2,
          vehicleNumber: 'AMB-002',
          driverName: 'Sarah Johnson',
          status: 'busy',
          location: { lat: 40.7589, lng: -73.9851, address: 'Central Park, NY' },
          equipment: ['AED', 'Oxygen', 'Stretcher', 'Ventilator'],
          lastUpdate: new Date().toISOString()
        },
        {
          id: 3,
          vehicleNumber: 'AMB-003',
          driverName: 'Mike Davis',
          status: 'available',
          location: { lat: 40.6892, lng: -74.0445, address: 'Brooklyn, NY' },
          equipment: ['AED', 'Oxygen', 'Stretcher', 'Cardiac Monitor'],
          lastUpdate: new Date().toISOString()
        }
      ];
      setAmbulances(mockAmbulances);
      localStorage.setItem('ambulances', JSON.stringify(mockAmbulances));
    }

    if (savedRequests) {
      setEmergencyRequests(JSON.parse(savedRequests));
    }

    setLoading(false);
  }, []);

  const updateAmbulanceLocation = (ambulanceId, location) => {
    setAmbulances(prev => {
      const updated = prev.map(amb => 
        amb.id === ambulanceId 
          ? { ...amb, location, lastUpdate: new Date().toISOString() }
          : amb
      );
      localStorage.setItem('ambulances', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAmbulanceStatus = (ambulanceId, status) => {
    setAmbulances(prev => {
      const updated = prev.map(amb => 
        amb.id === ambulanceId 
          ? { ...amb, status, lastUpdate: new Date().toISOString() }
          : amb
      );
      localStorage.setItem('ambulances', JSON.stringify(updated));
      return updated;
    });
  };

  const createEmergencyRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedArrival: null,
      assignedAmbulance: null
    };

    setEmergencyRequests(prev => {
      const updated = [newRequest, ...prev];
      localStorage.setItem('emergency_requests', JSON.stringify(updated));
      return updated;
    });

    // AI-powered ambulance assignment
    const availableAmbulances = ambulances.filter(amb => amb.status === 'available');
    if (availableAmbulances.length > 0) {
      // Simple distance-based assignment (in real app, would use proper geolocation)
      const assignedAmbulance = availableAmbulances[0];
      updateAmbulanceStatus(assignedAmbulance.id, 'dispatched');
      
      // Update request with assigned ambulance
      setTimeout(() => {
        setEmergencyRequests(prev => {
          const updated = prev.map(req => 
            req.id === newRequest.id 
              ? { 
                  ...req, 
                  assignedAmbulance: assignedAmbulance.id,
                  status: 'dispatched',
                  estimatedArrival: new Date(Date.now() + 8 * 60000).toISOString() // 8 minutes
                }
              : req
          );
          localStorage.setItem('emergency_requests', JSON.stringify(updated));
          return updated;
        });
      }, 1000);
    }

    return newRequest;
  };

  const updateRequestStatus = (requestId, status) => {
    setEmergencyRequests(prev => {
      const updated = prev.map(req => 
        req.id === requestId 
          ? { ...req, status, updatedAt: new Date().toISOString() }
          : req
      );
      localStorage.setItem('emergency_requests', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    ambulances,
    emergencyRequests,
    loading,
    updateAmbulanceLocation,
    updateAmbulanceStatus,
    createEmergencyRequest,
    updateRequestStatus
  };

  return (
    <AmbulanceContext.Provider value={value}>
      {children}
    </AmbulanceContext.Provider>
  );
};
