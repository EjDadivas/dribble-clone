import NextAuth from "next-auth";

import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);

// allows us to use GET and POST request using nextauth
export {handler as GET, handler as POST};