import React, { useState } from 'react';
import axios from 'axios';
import { Upload, ImagePlus, Images } from 'lucide-react';

function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('coverImage', coverImage);
    for (let img of additionalImages) {
      data.append('additionalImages', img);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/items/add', data);
      setSuccess(res.data.message);
      setFormData({ name: '', type: '', description: '' });
      setCoverImage(null);
      setAdditionalImages([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#161B22] text-gray-200 shadow-2xl border border-[#30363d] rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-white">Add New Item</h2>
      {success && (
        <div className="bg-green-800 border border-green-600 text-green-300 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Item Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="bg-[#0D1117] border border-[#30363d] text-white px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Item Type"
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          className="bg-[#0D1117] border border-[#30363d] text-white px-3 py-2 rounded-md"
          required
        />
        <textarea
          placeholder="Item Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="bg-[#0D1117] border border-[#30363d] text-white px-3 py-2 rounded-md"
          required
        />

        <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <ImagePlus className="w-4 h-4" /> Cover Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setCoverImage(e.target.files[0])}
          className="text-sm text-gray-400"
          required
        />

        <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <Images className="w-4 h-4" /> Additional Images:
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setAdditionalImages(Array.from(e.target.files))}
          className="text-sm text-gray-400"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white py-2 rounded-md transition"
        >
          <Upload className="w-4 h-4" /> Submit
        </button>
      </form>
    </div>
  );
}

export default AddItem;
