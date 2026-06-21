import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { stories } from '../../data/dummyData.js';

export default function CreateHighlightPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-[500px] mx-auto py-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">New Highlight</h1>
        </div>
        <button className={`text-sm font-semibold ${selected.length > 0 ? 'text-ig-blue' : 'text-ig-blue/50'}`}>Create</button>
      </div>
      <input
        type="text" placeholder="Highlight name"
        value={name} onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm outline-none mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500"
      />
      <div className="grid grid-cols-3 gap-2">
        {stories.slice(0, 12).map((story, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square border-2 ${selected.includes(i) ? 'border-ig-blue' : 'border-transparent'}`}
          >
            <img src={story.items?.[0]?.url} alt="" className="w-full h-full object-cover" />
            {selected.includes(i) && (
              <div className="absolute inset-0 bg-ig-blue/40 flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
