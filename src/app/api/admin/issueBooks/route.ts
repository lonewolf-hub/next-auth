// issueBookController.ts
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import IssuedBook from "@/models/bookIssueModel"; // Adjust the path accordingly
import User from "@/models/userModel";
import Book from "@/models/bookModel";

interface IssueBookRequestBody {
    bookId: string;
    userId: string;
}

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract admin ID from the token
        const adminId = await getDataFromToken(request);

        // Find the user with the extracted admin ID
        const admin = await User.findOne({ _id: adminId }).select("-password");

        // Check if the user is an admin
        if (admin?.role !== 'admin') {
            return NextResponse.json({ error: "Access Denied" }, { status: 403 });
        }
        // Parse the JSON body of the request
        const requestBody: IssueBookRequestBody = await request.json();
        // Find the book and user based on the provided IDs
        const book = await Book.findById(requestBody.bookId);
        const user = await User.findById(requestBody.userId);

        // Check if the book and user exist
        if (!book || !user) {
            return NextResponse.json({ error: "Book or user not found" }, { status: 404 });
        }

        // Create a new issued book instance
        const issuedBook = new IssuedBook({
            book: requestBody.bookId,
            user: requestBody.userId,
        });

        // Save the issued book to the database
        const savedIssuedBook = await issuedBook.save();

        return NextResponse.json({
            message: "Book Issued Successfully",
            data: savedIssuedBook
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
