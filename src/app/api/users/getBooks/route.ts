import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";

connect();

export async function GET(request: NextRequest) {
    try {
        // Retrieve all books from the database
        const allBooks = await Book.find();

        return NextResponse.json({
            message: "Books retrieved successfully",
            data: allBooks,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
