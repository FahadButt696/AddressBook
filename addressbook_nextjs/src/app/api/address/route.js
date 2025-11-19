import { connectDB } from "@/lib/db";
import Address from "@/lib/models/Address";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    verifyToken(req);
    await connectDB();

    const body = await req.json();
    const address = await Address.create(body);

    return Response.json(address, { status: 201 });
  } catch (error) {
    if (error.message.includes("token") || error.message.includes("Token") || error.message.includes("No token")) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const addresses = await Address.find();
    return Response.json(addresses);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    verifyToken(req);
    await connectDB();

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json({ error: "Address ID is required" }, { status: 400 });
    }

    const address = await Address.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!address) {
      return Response.json({ error: "Address not found" }, { status: 404 });
    }

    return Response.json(address);
  } catch (error) {
    if (error.message.includes("token") || error.message.includes("Token") || error.message.includes("No token")) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    if (error.name === "CastError") {
      return Response.json({ error: "Invalid address ID format" }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    verifyToken(req);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Address ID is required" }, { status: 400 });
    }

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return Response.json({ error: "Address not found" }, { status: 404 });
    }

    return Response.json({ message: "Address deleted successfully" });
  } catch (error) {
    // Check if it's an authentication error
    if (error.message.includes("token") || error.message.includes("Token") || error.message.includes("No token")) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    // Check if it's a MongoDB cast error (invalid ID format)
    if (error.name === "CastError") {
      return Response.json({ error: "Invalid address ID format" }, { status: 400 });
    }
    // Other errors
    return Response.json({ error: error.message }, { status: 500 });
  }
}
