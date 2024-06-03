import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // Use the user model for both users and admins
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

// Connect to the database
connect();

// Handle POST request for user login
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data with user role
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role || 'user', // Assume default role is 'user'
        };

        // Create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "7d" });

        // Create a JSON response with user details, token, message, and success
        const response = NextResponse.json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
            role:user.role,
            message: "Login Successful",
            success: true,
        });

        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        // Handle any errors and return an appropriate response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
