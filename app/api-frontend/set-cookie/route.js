import { serialize } from "cookie";
import { NextResponse } from "next/server";

/**
 * POST request handler for setting a cookie.
 *
 * @param {Request} req - The incoming request object.
 * @param {NextApiResponse} res - The response object to send back.
 *
 * @returns {NextResponse} - A Next.js response object with JSON content.
 */
export async function POST(req) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Parse the request body as JSON and extract the token
    const { token } = await req.json();

    // Check if the token is provided
    if (token) {
      // Serialize the cookie with the provided token
      const serialized = serialize("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 60 minutes
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      });

      // Create a Next.js response object with JSON content
      const response = NextResponse.json({
        headers: { "Set-Cookie": serialized },
      });

      // Set the serialized cookie in the response headers again
      response.headers.set("Set-Cookie", serialized);

      // Send a success response with a JSON message
      NextResponse.json(
        { message: "Cookie set successfully" },
        { status: 200 }
      );

      // Return the Next.js response object
      return response;
    } else {
      // Send a bad request response with a JSON message
      NextResponse.json({ message: "Token is required" }, { status: 404 });
    }
  } else {
    // Send a method not allowed response
    NextResponse.json({ message: "Method not allowed" }, { status: 405 }); // Method Not Allowed
  }
}
