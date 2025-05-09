import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Build the Nominatim URL with Greece filter
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=15&accept-language=en&countrycodes=gr`;

    // Make server-side request to Nominatim
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "TransferApp/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim API responded with ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Location search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}
