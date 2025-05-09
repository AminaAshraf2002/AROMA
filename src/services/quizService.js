// services/quizService.js

const API_BASE_URL = 'https://aroma-server.onrender.com/api';

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

// Get quiz questions
export const getQuizQuestions = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/quiz`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return handleResponse(response);
};

// Submit quiz answers
export const submitQuizAnswers = async (answers, quizId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      answers, 
      quizId 
    })
  });
  
  return handleResponse(response);
};

// Get certificate
export const getCertificate = async (certificateId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/certificates/${certificateId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return handleResponse(response);
};

// Download certificate
export const downloadCertificate = async (certificateId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  
  const response = await fetch(`${API_BASE_URL}/certificates/${certificateId}/download`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return handleResponse(response);
};