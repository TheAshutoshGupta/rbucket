import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=> {
    // Your code here
    return NextResponse.json("hello");
}