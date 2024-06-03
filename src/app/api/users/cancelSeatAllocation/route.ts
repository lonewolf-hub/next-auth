// cancelSeatAllocation.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        // Ensure the user is authenticated
        if (!userId) {
            return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        }

        // Find the user by ID
        const user = await User.findOne({ _id: userId });

        // Check if the user has an allocated seat
        if (!user || user.allocatedSeat === null) {
            return NextResponse.json({ error: "No seat allocated to cancel" }, { status: 400 });
        }

        // Reset user's allocated seat and expiry time
        user.allocatedSeat = null;
        user.seatAllocationExpiry = null;
        await user.save();

        return NextResponse.json({
            message: `Seat allocation canceled for user ${user.username}`,
        });
    } catch (error: any) {
        console.error('Error canceling seat allocation:', error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
