import { apiClient } from "@/helpers/apiClient";
import { fetchToken } from "@/helpers/getToken";

const BASE_URL = "https://test.techunlock.org/test/api";

export async function getAccountDetails() {
  const token = await fetchToken();
  const res = await apiClient.get(`${BASE_URL}/account/account-details/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateProfile(profilePayload) {
  const token = await fetchToken();
  const headers = { Authorization: `Bearer ${token}` };

  // If a file is present, assume FormData usage
  if (profilePayload instanceof FormData) {
    return (
      await apiClient.put(
        `${BASE_URL}/account/account-update/`,
        profilePayload,
        { headers }
      )
    ).data;
  }
  return (
    await apiClient.put(`${BASE_URL}/account/account-update/`, profilePayload, {
      headers,
    })
  ).data;
}

export async function changePassword(currentPassword, newPassword) {
  const token = await fetchToken();
  const payload = {
    password: currentPassword,
    new_password: newPassword,
    confirm_password: newPassword,
  };
  return (
    await apiClient.post(`${BASE_URL}/account/change-password/`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

// Uploads a file to Bunny.net and returns the URL
export async function uploadToCloudinary(file, opts = {}) {
  try {
    // Import the bunny uploader functions
    const { uploadToBunny, uploadProfileImage } = await import(
      "@/helpers/bunny-uploader"
    );

    // Use profile image upload for profile pictures, otherwise use generic upload
    if (opts.type === "profile") {
      return await uploadProfileImage(file, opts.userId);
    } else {
      return await uploadToBunny(file, opts.type || "image");
    }
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
