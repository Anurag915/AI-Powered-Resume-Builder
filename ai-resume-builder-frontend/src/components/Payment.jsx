import React, { useState } from "react";

const Payments = ({ onPaymentComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
      alert("Please fill all required fields.");
      return;
    }

    onPaymentComplete(); // Proceed to PayPal after form submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Pay</h2>

      <label className="block text-sm font-medium text-gray-600">Full Name</label>
      <input type="text" name="name" className="w-full p-3 border rounded-lg mb-3" placeholder="Enter your full name" onChange={handleChange} required />

      <label className="block text-sm font-medium text-gray-600">Email Address</label>
      <input type="email" name="email" className="w-full p-3 border rounded-lg mb-3" placeholder="Enter your email" onChange={handleChange} required />

      <label className="block text-sm font-medium text-gray-600">Phone Number</label>
      <input type="tel" name="phone" className="w-full p-3 border rounded-lg mb-3" placeholder="Enter your phone number" onChange={handleChange} required />

      <label className="block text-sm font-medium text-gray-600">Amount</label>
      <input type="number" name="amount" className="w-full p-3 border rounded-lg mb-3" placeholder="Enter the amount" onChange={handleChange} required />

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center"><input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} className="mr-2" /> Male</label>
          <label className="flex items-center"><input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} className="mr-2" /> Female</label>
          <label className="flex items-center"><input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} className="mr-2" /> Other</label>
        </div>
      </div>

      <button type="submit" className="mt-4 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
        Proceed to PayPal
      </button>
    </form>
  );
};

export default Payments;
