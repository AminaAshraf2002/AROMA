// services/quizService.js

// Helper function to handle responses
const handleResponse = async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  };
  
  // Get quiz questions
  export const getQuizQuestions = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/quiz/questions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  };
  
  // Submit quiz
  export const submitQuiz = async (answers, quizId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/quiz/submit', {
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
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`/api/quiz/certificate/${certificateId}`, {
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
      throw new Error('Authentication required');
    }
    
    // For PDF download, you'd typically use window.open
    window.open(`/api/quiz/certificate/${certificateId}/download?token=${token}`, '_blank');
    
    return true;
  };