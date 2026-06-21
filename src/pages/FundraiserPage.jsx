import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber.js';

export default function FundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const raised = 24500;
  const goal = 50000;

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Fundraiser</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <img src={`https://picsum.photos/600/400?random=fund${id}`} alt="" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-2">Help support this cause</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
            <div className="bg-ig-green h-2 rounded-full" style={{ width: `${(raised / goal) * 100}%` }} />
          </div>
          <p className="text-sm text-gray-500 mb-1">${formatNumber(raised)} raised of ${formatNumber(goal)} goal</p>
          <button className="w-full bg-ig-blue text-white py-2.5 rounded-lg text-sm font-semibold mt-3">Donate</button>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-sm text-gray-500"><Heart size={16} /> Like</button>
            <button className="flex items-center gap-1 text-sm text-gray-500"><Share2 size={16} /> Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
