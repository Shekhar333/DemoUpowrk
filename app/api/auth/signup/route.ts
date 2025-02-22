import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { log } from "console";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// console.log("supabase: ", supabase);
console.log("process.env.SUPABASE_URL: ", process.env.SUPABASE_URL);
console.log("process.env.SUPABASE_ANON_KEY: ", process.env.SUPABASE_ANON_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const { data: newUser, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("This is a error from supabase: ", error);
      return NextResponse.json(
        { message: "Error creating user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
