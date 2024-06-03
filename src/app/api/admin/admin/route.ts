// adminController.ts
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        
        if (user.role !== 'admin') {
            // Deny access if the user is not an admin
            return NextResponse.json({ error: "Access Denied" }, { status: 403 });
        }

        return NextResponse.json({
            message: "Admin Found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
