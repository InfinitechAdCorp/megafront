import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/components/toast";
import { addCareer } from "@/app/redux/services/careerService";
import { addTestimonial } from "@/app/redux/services/testimonialService";

interface AddModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  fetchData: () => void;
  itemType: string;
}

const AddModal: React.FC<AddModalProps> = ({ modalOpen, closeModal, fetchData, itemType }) => {
  const dispatch = useDispatch<any>();

  const [newItem, setNewItem] = useState<{ roleName?: string; quantity?: number; name?: string; message?: string }>({
    roleName: "",
    quantity: 1,
    name: "",
    message: "",
  });

  const handleAddItem = async () => {
    if (itemType === "career" && !newItem.roleName?.trim()) {
      showToast("Role Name is required.", "error");
      return;
    }
    if (itemType === "testimonial" && (!newItem.name?.trim() || !newItem.message?.trim())) {
      showToast("Name and Message are required.", "error");
      return;
    }

    try {
      if (itemType === "career") {
        await dispatch(addCareer({ roleName: newItem.roleName!, quantity: newItem.quantity! })).unwrap();
      } else if (itemType === "testimonial") {
        await dispatch(addTestimonial({ name: newItem.name!, message: newItem.message! })).unwrap();
      }

      showToast(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added successfully`, "success");
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      showToast(`Error adding ${itemType}.`, "error");
    }
  };

  return modalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h2>

        {itemType === "career" ? (
          <>
            <label className="block text-gray-700 font-medium mb-1">Role Name</label>
            <input
              type="text"
              placeholder="Enter Role Name"
              value={newItem.roleName}
              onChange={(e) => setNewItem({ ...newItem, roleName: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 1 })}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : itemType === "testimonial" ? (
          <>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              placeholder="Enter Message"
              value={newItem.message}
              onChange={(e) => setNewItem({ ...newItem, message: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : null}

        <div className="flex justify-end gap-2">
          <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Save
          </button>
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddModal;
