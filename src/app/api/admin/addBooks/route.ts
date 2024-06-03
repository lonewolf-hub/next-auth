import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import User from "@/models/userModel";

interface BookRequestBody {
    title: string;
    authors: string[];
    ISBN: string;
    publisher: string;
    genre: string;
    language?: string;
    description?: string;
    coverImage?: string;
    numberOfPages?: number;
    totalCopies?: number;
    tags?: string[];
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
        const requestBody: BookRequestBody = await request.json();

        // Create a new book instance
        const newBook = new Book({
            ...requestBody,
            _id: undefined, // Allow MongoDB to generate a new UUID for the book
            copiesAvailable: 0, // Set initial copiesAvailable to 0
        });

        // Save the book to the database
        const savedBook = await newBook.save();

        return NextResponse.json({
            message: "Book Created Successfully",
            data: savedBook
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
