// Import necessary modules and models
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // Use the user model for both users and admins
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

// Connect to the database
connect();

// Handle POST request for admin login
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if admin exists (using the same model)
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return NextResponse.json({ error: "Admin does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, admin.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data with admin role
        const tokenData = {
            id: admin._id,
            username: admin.username, // Adjust based on your user model
            email: admin.email,
            role: admin.role || 'admin', // Assume default role is 'admin'
        };

        // Create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "7d" });

        // Create a JSON response with success message and set the token as a cookie
        const response = NextResponse.json({
            message: "Admin Login Successful",
            success: true,
            
        });

        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        // Handle any errors and return an appropriate response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
