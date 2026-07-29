import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AISuggestions from './components/AISuggestions';
import { createResume, updateResume, getAISuggestions } from './api/resumeApi';

const emptyResume = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

export default function App() {
  const [resume, setResume] = useState(emptyResume);
  const [resumeId, setResumeId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      if (resumeId) {
        const updated = await updateResume(resumeId, resume);
        setResume(updated);
      } else {
        const created = await createResume(resume);
        setResume(created);
        setResumeId(created._id);
      }
    } catch (err) {
      setError('Failed to save resume. Is the backend running?');
    } finally {
      setSaving(false);
    }
  };

  const handleGetSuggestions = async () => {
    setLoadingSuggestions(true);
    setError('');
    try {
      const result = await getAISuggestions(resume);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to get AI suggestions. Check your OpenAI API key on the backend.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Smart Resume Builder</h1>
          <div className="flex gap-3">
            <button
              onClick={handleGetSuggestions}
              disabled={loadingSuggestions}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loadingSuggestions ? 'Thinking…' : 'Get AI Suggestions'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Resume'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700"
            >
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-6xl mx-auto px-6 mt-4 print:hidden">
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-md">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="print:hidden space-y-6">
          <ResumeForm resume={resume} setResume={setResume} />
          <AISuggestions suggestions={suggestions} loading={loadingSuggestions} />
        </div>

        <div>
          <ResumePreview resume={resume} />
        </div>
      </main>
    </div>
  );
}
