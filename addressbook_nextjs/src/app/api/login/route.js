import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    if (!process.env.JWT_SECRET) {
      return Response.json({ error: "Server configuration error: JWT_SECRET not set" }, { status: 500 });
    }

    if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
      return Response.json({ error: "Server configuration error: Admin credentials not set" }, { status: 500 });
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "Username and password are required" }, { status: 400 });
    }

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return Response.json({ token });
    }

    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
