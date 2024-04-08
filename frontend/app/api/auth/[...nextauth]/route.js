import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Ofertar",
      credentials: {
        loginEmail: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        loginPassword: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { loginEmail, loginPassword } = credentials;
        let res;

        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
          method: "POST",
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
          headers: {
            cache: "no-store",
            "Content-Type": "application/json",
          },
        }).catch((error) => {
          console.error("Error:", error);
          throw new Error("Error");
        });

        const user = await res.json();

        if (user.statusCode >= 400 || user.error) {
          throw new Error(btoa(user.message) || "Error");
        }

        const infoUser = [
          {
            id: user.user._id,
            email: user.user.email,
            rol: user.user.rol,
            token: user.token,
          },
        ];
        return infoUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, trigger, user, session }) {
      if (user) {
        token.provider = "credentials"; //Provider
        token.accessToken = user[0].token; //Token generado por nuestro Backend
        token.user = user[0]; //Datos del usuario
        token.accessToken = user[0].token;
      }
      return token;
    },
    async session({ session, token }) {
      session.provider = token.provider; //Provider
      session.accessToken = token.accessToken; //Token generado por nuestro Backend
      session.user = token?.user; //Datos del usuario
      return session;
    },
    async signIn({ account, profile }) {
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
