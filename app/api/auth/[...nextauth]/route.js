import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDB from '@/Database/mongodb';
import User from '@/models/User';
const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == 'github') {
                try {
                    await connectDB();
                    const currentUser = await User.findOne({ email: user.email });
                    console.log('User found in database, not creating one again \n------------\n', currentUser);
                    if (!currentUser) {
                        const newUser = await User.create({
                            email: user.email,
                            username: user.email.split('@')[0],
                        });
                        console.log('User Created with Details:', newUser);
                    }
                    return true;
                } catch (error) {
                    console.error('Error signing in:', error);
                    return false;
                }
            }
        },
        async session({ session, user, token }) {
            try {
                const dbUser = await User.findOne({ email: session.user.email });
                console.log("Database User: ", dbUser);
                session.user.name = dbUser.username;
                return session;
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        }
    }

});

export { handler as GET, handler as POST }