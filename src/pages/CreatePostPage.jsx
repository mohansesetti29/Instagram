import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusSquare, X, Image, ArrowLeft, ChevronRight } from 'lucide-react';
import ImageUpload from '../components/common/ImageUpload.jsx';
import { useNotification } from '../context/NotificationContext.jsx';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { addToast } = useNotification();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const handleUpload = (urls) => {
    setImages(urls);
    setStep(2);
  };

  const handleShare = () => {
    addToast('Post shared successfully!', 'success');
    navigate('/home');
  };

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}><X size={24} className="text-gray-900 dark:text-gray-200" /></button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Create Post</h1>
        </div>
        {step === 2 && (
          <button onClick={handleShare} className="text-ig-blue font-semibold text-sm">Share</button>
        )}
      </div>

      {step === 1 && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center">
          <ImageUpload onUpload={handleUpload} multiple>
            <div className="cursor-pointer">
              <Image size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-sm mb-4">Drag and drop or click to upload</p>
              <button className="bg-ig-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">Select from computer</button>
            </div>
          </ImageUpload>
        </div>
      )}

      {step === 2 && (
        <div className="flex gap-4">
          <div className="w-[300px] flex-shrink-0">
            <img src={images[0]} alt="" className="w-full aspect-square object-cover rounded-lg" />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border-b border-gray-200 dark:border-gray-700 pb-2 text-sm outline-none resize-none h-24 bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-500"
            />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-gray-200">Add location</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-gray-200">Tag people</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-gray-200">Add music</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
