import { getDataFromToken } from "@/helpers/getDataFromToken";
// allocateSeat.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { ALLOCATION_DURATION } from "@/app/components/seat-allocation/constants/constant";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        // Ensure the user is authenticated
        if (!userId) {
            return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        }

        const { seatId } = await request.json();

        // Find the user by ID
        const user = await User.findOne({ _id: userId });

        // Check if the seat is available
        if (!user || user.allocatedSeat !== null) {
            return NextResponse.json({ error: "Seat allocation failed" }, { status: 400 });
        }

        // Update user's allocated seat and set expiry time
        user.allocatedSeat = seatId;
        user.seatAllocationExpiry = new Date(Date.now() + ALLOCATION_DURATION);
        await user.save();

        return NextResponse.json({
            message: `Seat ${seatId} allocated to user ${user.username}`,
        });
    } catch (error: any) {
        console.error('Error allocating seat:', error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
