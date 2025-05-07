// services/paymentService.js

const API_BASE_URL = 'https://aroma-server.onrender.com';

// Helper function to handle responses
const handleResponse = async (response) => {
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(JSON.stringify(data) || response.statusText);
    }
    return data;
  } catch (error) {
    if (!response.ok) {
      throw new Error(text || response.statusText);
    }
    throw error;
  }
};

// Function to load the Razorpay script
export const loadRazorpayScript = () => {
  return new Promise(resolve => {
    // If Razorpay is already loaded, resolve immediately
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    // Create script tag and load Razorpay
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Function to open Razorpay checkout
export const openRazorpayCheckout = (options) => {
  if (!window.Razorpay) {
    throw new Error('Razorpay script not loaded');
  }
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
  return razorpay;
};

// Create a Razorpay order
export const createRazorpayOrder = async (amount, currency = 'INR', paymentMethod) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      amount,
      currency,
      paymentMethod
    })
  });
  
  return handleResponse(response);
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (paymentData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  });
  
  return handleResponse(response);
};

// Process direct payment (card or UPI)
export const processDirectPayment = async (amount, paymentMethod) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      amount,
      paymentMethod
    })
  });
  
  return handleResponse(response);
};

// Get payment history or status
export const getPayments = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/payments`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return handleResponse(response);
};

// Get specific payment details
export const getPaymentById = async (paymentId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return handleResponse(response);
};