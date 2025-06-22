import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemModal from '../components/ItemModal.jsx';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get('https://amrr-assigment.onrender.com/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-200">
      <h2 className="text-2xl font-bold text-white mb-6">Item Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="bg-[#161B22] border border-[#30363d] rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <img
              src={`https://amrr-assigment.onrender.com/${item.coverImage}`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.type}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

export default ViewItems;
