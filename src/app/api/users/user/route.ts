import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        // Ensure the user is authenticated
        if (!userId) {
            return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            // User not found
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        });
    } catch (error: any) {
        console.error('Error fetching user:', error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
