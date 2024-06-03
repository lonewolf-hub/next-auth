import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";
import bcyptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, role } = reqBody;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcyptjs.genSalt(10);
        const hashedPassword = await bcyptjs.hash(password, salt);

        // Create new user with role
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user', // Set to 'user' if not specified
        });

        // Save user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}