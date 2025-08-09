import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy authentication logic (replace with your logic)
  if (email === "test@example.com" && password === "password123") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { message: "Invalid email or password" },
    { status: 401 }
  );
}
