import React, { useState } from 'react';
import { UserProfileCard } from './components/UserProfileCard';
import { UserProfile } from './types/user';

const INITIAL_USER: UserProfile = {
  id: 'usr-101',
  name: 'DevEx Tester',
  email: 'tester@devex.internal',
  role: 'ENGINEER',
  tenantId: 'tenant-devex-01',
  createdAt: '2026-09-01T00:00:00Z',
  updatedAt: '2026-09-13T08:00:00Z',
};

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  const handleSaveProfile = async (name: string, email: string) => {
    // Updates state immutably per ADR-TS-004
    setUser(prev => ({
      ...prev,
      name,
      email,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '40px',
      backgroundColor: '#f7fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '8px' }}>
          DevEx Portal • Frontend Testbed
        </h1>
        <p style={{ color: '#718096', maxWidth: '600px' }}>
          TypeScript + React testbed for the DevEx AI Code Review pipeline.
        </p>
      </header>

      <UserProfileCard user={user} onSave={handleSaveProfile} />
    </div>
  );
};

export default App;
