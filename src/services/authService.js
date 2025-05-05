const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google token and return user info
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
  } catch (error) {
    console.error('Google token verification error:', error);
    throw new Error('Invalid token');
  }
};

// Find or create user from Google data
const findOrCreateGoogleUser = async (userData) => {
  try {
    // First try to find by googleId
    let user = await User.findOne({ googleId: userData.googleId });
    
    // If not found by googleId, try by email
    if (!user) {
      user = await User.findOne({ email: userData.email });
      
      // If user exists with this email but no googleId, update with googleId
      if (user) {
        user.googleId = userData.googleId;
        await user.save();
      } else {
        // Create new user
        user = new User({
          name: userData.name,
          email: userData.email,
          googleId: userData.googleId,
          profilePicture: userData.picture
        });
        await user.save();
      }
    }
    
    return { 
      user, 
      isFirstTimeUser: !user.countryCode 
    };
  } catch (error) {
    console.error('Error finding/creating user:', error);
    throw new Error('Error processing user data');
  }
};

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  verifyGoogleToken,
  findOrCreateGoogleUser,
  generateToken
};