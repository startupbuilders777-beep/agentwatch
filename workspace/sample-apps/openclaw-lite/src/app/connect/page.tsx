'use client';

import { useState } from 'react';
import { integrations } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ConnectPage() {
  const { addToast } = useApp();
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set());

  const handleConnect = (integrationId: string, integrationName: string) => {
    if (connectedIntegrations.has(integrationId)) {
      // Disconnect
      setConnectedIntegrations(prev => {
        const newSet = new Set(prev);
        newSet.delete(integrationId);
        return newSet;
      });
      addToast(`${integrationName} disconnected`, 'info');
    } else {
      // Connect - show coming soon
      addToast(`${integrationName} connection coming soon!`, 'info');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Connect Your Tools</h1>
        <p className="text-slate-400">Integrate your favorite tools with OpenClaw Lite</p>
      </div>

      {/* Integration Cards */}
      <div className="space-y-4">
        {integrations.map((integration, index) => {
          const isConnected = connectedIntegrations.has(integration.id);
          
          return (
            <div
              key={integration.id}
              className="integration-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div 
                className="integration-icon"
                style={{ backgroundColor: `${integration.color}20` }}
              >
                {integration.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                <p className="text-sm text-slate-400">
                  {isConnected ? 'Connected and ready to use' : 'Not connected'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`badge ${isConnected ? 'badge-connected' : 'badge-disconnected'}`}>
                  {isConnected ? 'Connected' : 'Not Connected'}
                </span>
                <button
                  onClick={() => handleConnect(integration.id, integration.name)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    isConnected
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'btn-primary'
                  }`}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">More integrations coming soon!</h3>
            <p className="text-slate-400">
              We're working on adding tools support for more including Google Drive, 
              Salesforce, HubSpot, and many more. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
