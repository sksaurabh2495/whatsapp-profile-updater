// Import the axios library
const axios = require('axios');

// Constants for the WhatsApp API
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your WhatsApp Cloud API access token
const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID'; // Replace with your WhatsApp Business phone number ID

/**
 * Uploads an image to the WhatsApp media repository.
 * 
 * @param {string} imageUrl - The URL of the image to upload.
 * @returns {Promise<string>} - A promise that resolves to the media ID of the uploaded image.
 */
async function uploadImage(imageUrl) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v16.0/${PHONE_NUMBER_ID}/media`,
      {
        messaging_product: 'whatsapp',
        type: 'image',
        url: imageUrl
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the media ID from the response
    return response.data.id;
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Updates the WhatsApp Business Account profile picture.
 * 
 * @param {string} mediaId - The media ID of the uploaded image.
 * @returns {Promise<void>}
 */
async function updateProfilePicture(mediaId) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v16.0/${PHONE_NUMBER_ID}/whatsapp_profile_photo`,
      {
        photo: mediaId
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      console.log('Profile picture updated successfully.');
    } else {
      console.error('Failed to update profile picture:', response.data);
    }
  } catch (error) {
    console.error('Error updating profile picture:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Changes the WhatsApp Business Account profile picture.
 * 
 * @param {string} imageUrl - The URL of the image to set as the new profile picture.
 * @returns {Promise<void>}
 */
async function changeProfilePicture(imageUrl) {
  try {
    const mediaId = await uploadImage(imageUrl);
    await updateProfilePicture(mediaId);
  } catch (error) {
    console.error('Failed to change profile picture:', error.message);
  }
}

// Example usage
const newProfileImageUrl = 'https://example.com/path/to/your/image.jpg'; // Replace with your image URL
changeProfilePicture(newProfileImageUrl);
