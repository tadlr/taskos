// Importing NextResponse from 'next/server' for handling API responses.
import { NextResponse } from "next/server";

// Define an asynchronous function named POST that handles HTTP POST requests.
export async function POST(req: Request) {
  // Extract the JSON body of the request and destructure it into key and userId variables.
  const { key, userId } = await req.json();

  // Check if either key or userId is missing and return a bad request response with an error message if true.
  if (!key || !userId) {
    return NextResponse.json(
      { success: false, error: "Missing key or userId" },
      { status: 400 }, // Set the HTTP status code to 400 (Bad Request).
    );
  }

  // Check if both key length is greater than 10 and userId includes '@' character.
  if (key.length > 10 && userId.includes("@")) {
    return NextResponse.json({ success: true }); // Return a successful response.
  } else {
    // If either condition fails, return a bad request response with an error message.
    return NextResponse.json(
      { success: false, error: "Invalid key or userId" },
      { status: 400 }, // Set the HTTP status code to 400 (Bad Request).
    );
  }
}
