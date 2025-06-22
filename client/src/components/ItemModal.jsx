import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import { X, Mail } from 'lucide-react';

function ItemModal({ item, onClose }) {
  const handleEnquire = async () => {
    try {
      await axios.post('http://localhost:5000/api/items/enquire', {
        itemName: item.name,
      });
      alert('Enquiry sent successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#161B22] text-gray-200 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative border border-[#30363d]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-1">Type: {item.type}</p>
        <p className="text-gray-300 mb-4">{item.description}</p>

        <Carousel images={[item.coverImage, ...item.additionalImages]} />

        <div className="mt-6 text-right">
          <button
            onClick={handleEnquire}
            className="inline-flex items-center gap-2 bg-[#238636] text-white px-4 py-2 rounded-md hover:bg-[#2ea043] transition"
          >
            <Mail className="w-4 h-4" /> Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
