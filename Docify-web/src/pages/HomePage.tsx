import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import { useEffect } from 'react';
import { protecx } from '../lib/protecx';

export default function HomePage() {
  const navigate = useNavigate()

  // const fetchProfile = async () => {
  //   try {
  //     await protecx.profile();
  //   } catch (error) {
  //     console.error("profile failed:", error);
  //   }
  // };

  const fetchProfile = async () => {
    try {
      await protecx.profile();
    } catch (error) {
      if (error.data?.error === "invalid or expired token") {
        await protecx.refresh();  // ❌ not here ideally
        await protecx.profile();  // retry
      }
    }
  };

  const createBlankDoc = async () => {
    // backend call will go here later
    const docId = 'abc123' // mock
    navigate(`/docs/${docId}`)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#f8fafc' }}>
      <h1 style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Docify</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '2rem' }}>Experience the future of collaborative document editing.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <button
          onClick={createBlankDoc}
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        >
          <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>📄</span>
          Create Blank Document
        </button>
      </div>

      <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/signup')}
          style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
        >
          Log In
        </button>
        <button onClick={fetchProfile}>fetch profile</button>
        <div style={{ marginLeft: 'auto' }}>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}


