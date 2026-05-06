'use client';
import { useState } from 'react';
import { getBuildingHealth, getSystems } from '@/lib/api';

export default function Dashboard() {
  const [buildingId, setBuildingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [systems, setSystems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await getBuildingHealth(buildingId);
      setResult(data);
      const s = await getSystems(data.id);
      setSystems(s);
    } catch (e) {
      alert('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:40,maxWidth:800}}>
      <div style={{display:'flex',gap:12,marginBottom:24}}>
        <input placeholder="Building ID" value={buildingId} onChange={e => setBuildingId(e.target.value)}
          style={{padding:'10px 16px',borderRadius:8,border:'1px solid #334155',background:'#1e293b',color:'#f8fafc',minWidth:240}} />
        <button onClick={handleAnalyze} disabled={loading}
          style={{padding:'10px 20px',borderRadius:8,border:'none',background:'#475569',color:'#fff',cursor:'pointer'}}>
          {loading ? 'Analyzing...' : 'Get Building Health'}
        </button>
      </div>

      {result && (
        <div style={{display:'grid',gap:16}}>
          <div style={{padding:20,borderRadius:12,background:'#1e293b',border:'1px solid #334155'}}>
            <h3 style={{marginBottom:12,color:'#475569'}}>Building Health Result</h3>
            <p><strong>Occupancy rate:</strong> {result.occupancy_rate}%</p>
            <p><strong>HVAC efficiency:</strong> {result.hvac_efficiency}</p>
            <p><strong>Maintenance backlog:</strong> {result.maintenance_backlog_count} items</p>
            <p><strong>Tenant satisfaction:</strong> {result.tenant_satisfaction}</p>
          </div>
          {systems.length > 0 && (
            <div style={{padding:20,borderRadius:12,background:'#1e293b',border:'1px solid #334155'}}>
              <h3 style={{marginBottom:12,color:'#475569'}}>System Status</h3>
              {systems.map((sys, i) => (
                <p key={i}>{sys.system_name}: {sys.status}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
