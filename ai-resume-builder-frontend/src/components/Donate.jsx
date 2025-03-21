import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Donate = () => {
  const [formData, setFormData] = useState({
    organization: "",
    recipient: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.organization || !formData.recipient || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    const response = await axios.post("http://localhost:5000/create-order", { amount: formData.amount });

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: response.data.amount,
      currency: "INR",
      name: formData.organization,
      description: `Donation to ${formData.recipient}`,
      order_id: response.data.id,
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.recipient,
        email: "donor@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Donate Now</h2>
        <input
          type="text"
          name="organization"
          placeholder="Organization Name"
          value={formData.organization}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="recipient"
          placeholder="Recipient Name"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (INR)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3">
          Proceed to Pay
        </Button>
      </form>
    </div>
  );
};

export default Donate;
