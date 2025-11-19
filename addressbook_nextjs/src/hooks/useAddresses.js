import { useState, useEffect } from "react";
import { addressService } from "@/services/addressService";
import { authService } from "@/services/authService";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await addressService.getAll();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load addresses");
      setAddresses([]);
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const createAddress = async (data) => {
    const token = authService.getToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      const newAddress = await addressService.create(data, token);
      await fetchAddresses();
      return { success: true, data: newAddress };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateAddress = async (id, data) => {
    const token = authService.getToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      const updatedAddress = await addressService.update(id, data, token);
      await fetchAddresses();
      return { success: true, data: updatedAddress };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteAddress = async (id) => {
    const token = authService.getToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      await addressService.delete(id, token);
      await fetchAddresses();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
  };
};

