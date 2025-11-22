import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import AuthComponent from './components/Auth';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import DataDownload from './pages/DataDownload';

function Layout({ children }: { children: React.ReactNode }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">B2B Space</h1>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block px-6 py-3 text-gray-700 hover:bg-gray-50">Dashboard</Link>
          <Link to="/campaigns" className="block px-6 py-3 text-gray-700 hover:bg-gray-50">Campaigns</Link>
          <Link to="/download" className="block px-6 py-3 text-gray-700 hover:bg-gray-50">Data Download</Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button onClick={handleSignOut} className="text-red-600 hover:text-red-800">Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function B2BMarketingApp() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <AuthComponent />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/download" element={<DataDownload />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
