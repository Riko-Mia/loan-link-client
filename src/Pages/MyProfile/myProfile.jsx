import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  CreditCard, 
  Settings,
  Camera
} from 'lucide-react';
import useAuth from '../../Hooks/useAuth';

const MyProfile = () => {
    const {user, logOut} = useAuth()
    console.log(user)
    const date = new Date(user.metadata.creationTime)
  // Mock user state
//   const [user, setUser] = useState({
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     phone: "+1 (555) 123-4567",
//     location: "New York, USA",
//     memberSince: "January 2024",
//     role: "Premium Member",
//     profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//   });
  



  const handleLogout = () => {
    logOut()
    .then(result => {
        window.location.href = "/login"; // Simulating redirect

    })
    .catch(error => {
      console.log(error)
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Background Header Decor */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 w-full"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header Section */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-6 border-b border-slate-100">
            <div className="relative group">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{user.displayName}</h1>
              <p className="text-blue-600 font-medium flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck size={18} />
                Premium Member
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                <Settings size={18} />
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors font-semibold"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Loan Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Active Loans</span>
                    <span className="font-bold text-slate-900">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pending</span>
                    <span className="font-bold text-slate-900">1</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600">Total Borrowed</span>
                    <span className="font-bold text-blue-600">$12,500</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
                <button className="w-full flex items-center gap-3 p-3 text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <CreditCard size={18} />
                  </div>
                  <span className="font-medium">Manage Payments</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact Details */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-slate-500 flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg border border-slate-100">{user.displayName}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-slate-500 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg border border-slate-100">{user.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-slate-500 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg border border-slate-100">{user.phone}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-slate-500 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg border border-slate-100">{user.location}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
                <div className="p-2 bg-white rounded-full text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Identity Verified</h4>
                  <p className="text-sm text-blue-700">Your account is secured with 2FA and verified documentation.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Member since {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}• Last login: {user.metadata.lastSignInTime}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;