
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 


export async function GET() {
  try {
    const rooms = await prisma.escapeRoom.findMany({ orderBy: { createdAt: "desc" }});
    return NextResponse.json(rooms);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    const newRoom = await prisma.escapeRoom.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        difficulty: body.difficulty ?? null,
        payload: body.payload ?? Prisma.JsonNull,
      },
    });
    return NextResponse.json(newRoom, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}

