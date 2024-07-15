import axios from "axios";

const BASE_URL = "https://techunlock.pythonanywhere.com";

export async function getCourses() {
  try {
    const response = await axios.get(`${BASE_URL}/course/courses/`);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);

    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An error occurred while signing in."
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else if (error instanceof z.ZodError) {
      // Validation error
      throw new Error(error.errors.map((err) => err.message).join(", "));
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred.");
    }
  }
}
