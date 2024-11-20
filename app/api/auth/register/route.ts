import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export default async function POST(request: Request) {
    const { email, password } = await request.json();
  
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
  
    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
  }