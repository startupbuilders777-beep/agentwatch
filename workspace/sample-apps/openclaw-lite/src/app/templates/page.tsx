'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { templates } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import CreateAgentForm from '@/components/CreateAgentForm';

export default function TemplatesPage() {
  const router = useRouter();
  const { addToast } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState<{
    name: string;
    description: string;
    icon: string;
  } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleUseTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate({
      name: template.name,
      description: template.description,
      icon: template.icon,
    });
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Start with a Template</h1>
        <p className="text-slate-400">Choose a pre-built template and customize it to your needs</p>
      </div>

      {/* Templates Grid */}
      <div className="template-grid">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="card group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            onClick={() => handleUseTemplate(template)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-3xl">
                {template.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {template.description}
                </p>
              </div>
            </div>
            <button
              className="w-full py-3 px-4 rounded-lg bg-indigo-500/20 text-indigo-400 font-medium hover:bg-indigo-500/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleUseTemplate(template);
              }}
            >
              Use Template →
            </button>
          </div>
        ))}
      </div>

      {/* Create Agent Modal with Prefill */}
      <CreateAgentForm
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedTemplate(null);
        }}
        prefill={selectedTemplate || undefined}
      />
    </div>
  );
}
