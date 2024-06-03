import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjZDA4OGU3LTIyZGUtNGE0OC1iYTc5LTEzNTZhN2FkMzI1ZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImlhbXNodWtsYWphaUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNzE0MDU3NSwiZXhwIjoxNzE3NzQ1Mzc1fQ.l4YOSW_7i-uWRwXcd0if5z-AyJx6DI06qsaZcwnEjs4")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("ss",decodedToken);
        
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
