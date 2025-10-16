import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const room = await prisma.escapeRoom.findUnique({ where: { id } });
  if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(room);
}


export async function PUT(request: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const updated = await prisma.escapeRoom.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description ?? null,
        difficulty: body.difficulty ?? null,
        payload: body.payload ?? Prisma.JsonNull,

      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}


export async function DELETE(_request: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    await prisma.escapeRoom.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
