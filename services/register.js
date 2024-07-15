import { apiClient } from "@/helpers/apiClient";

/**
 * This function sends a request to add a new course to the server.
 *
 * @param {Object} data - The data for the new course to be added.
 * @param {string} data.courseName - The name of the course.
 * @param {string} data.courseDescription - The description of the course.
 * @param {number} data.courseDuration - The duration of the course in hours.
 * @param {string} data.courseInstructor - The instructor of the course.
 * @param {string} data.courseCategory - The category of the course.
 * @param {string} data.courseLanguage - The language of the course.
 * @param {string} data.courseLevel - The level of the course.
 * @param {string} data.courseImage - The image URL of the course.
 * @param {string} data.courseVideo - The video URL of the course.
 * @param {string} data.courseCertificate - The certificate URL of the course.
 * @param {string} data.courseSyllabus - The syllabus URL of the course.
 * @param {string} data.courseStatus - The status of the course.
 *
 * @returns {Promise<Object>} - A promise that resolves with the server response data.
 * @throws {Error} - Throws an error if the request fails or encounters validation errors.
 */
export async function addCourse(data) {
  try {
    // console.log("Validating data for adding course...");

    console.log("Data validated. Sending add course request...");

    const response = await apiClient.post(`/course/add-courses/`, data);

    console.log("Add course response received:", response.data);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during adding course:", error);

    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message ||
          "An error occurred while adding the course."
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
