'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from './Modal';

const emojis = ['🤖', '📧', '📅', '💬', '📊', '📱', '💾', '🤝', '🎯', '⚡', '🌟', '💡', '🔔', '📝', '🧠', '🎨'];

interface CreateAgentFormProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    name: string;
    description: string;
    icon: string;
  };
}

export default function CreateAgentForm({ isOpen, onClose, prefill }: CreateAgentFormProps) {
  const { addAgent } = useApp();
  const [name, setName] = useState(prefill?.name || '');
  const [description, setDescription] = useState(prefill?.description || '');
  const [icon, setIcon] = useState(prefill?.icon || '🤖');
  const [schedule, setSchedule] = useState<'manual' | 'hourly' | 'daily' | 'weekly'>('manual');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    addAgent({
      name: name.trim(),
      description: description.trim(),
      icon,
      schedule,
      status: 'active',
    });

    // Reset form
    setName('');
    setDescription('');
    setIcon('🤖');
    setSchedule('manual');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setIcon('🤖');
    setSchedule('manual');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Agent">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Emoji Picker */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Agent Icon
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-16 h-16 rounded-xl bg-slate-700 flex items-center justify-center text-3xl hover:bg-slate-600 transition-colors"
            >
              {icon}
            </button>
            <span className="text-slate-400 text-sm">Click to change icon</span>
          </div>
          {showEmojiPicker && (
            <div className="mt-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <div className="emoji-grid">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-btn ${icon === emoji ? 'selected' : ''}`}
                    onClick={() => {
                      setIcon(emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Agent Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Daily Email Digest"
            className="input"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Task Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should this agent do?"
            className="textarea"
            required
          />
        </div>

        {/* Schedule Select */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Schedule
          </label>
          <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value as typeof schedule)}
            className="select"
          >
            <option value="manual">Manual</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Preview */}
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Preview</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">
              {icon}
            </div>
            <div>
              <p className="font-semibold text-white">{name || 'Agent Name'}</p>
              <p className="text-sm text-slate-400">{description || 'Task description...'}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={!name.trim() || !description.trim()}
          >
            Create Agent
          </button>
        </div>
      </form>
    </Modal>
  );
}
