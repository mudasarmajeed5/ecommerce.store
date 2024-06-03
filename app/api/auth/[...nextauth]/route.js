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
        async session({ session, user, token }) {
            try {
                await connectDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    console.log("Database User: ", dbUser);
                    session.user = {
                        id: dbUser._id,
                        name: dbUser.name,
                        email: dbUser.email,
                        username: dbUser.username,
                        image:session.user.image,
                    };
                } else {
                    console.log('User not found in session callback');
                }
                return session;
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        },
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == 'github') {
                try {
                    await connectDB();
                    const currentUser = await User.findOne({ email: user.email });
                    console.log('User found in database', currentUser);
                    if (!currentUser) {
                        const newUser = await User.create({
                            name:user.name,
                            email: user.email,
                            username: user.email.split('@')[0],
                        });
                    }
                    return true;
                } catch (error) {
                    console.error('Error signing in:', error);
                    return false;
                }
            }
            return true;
        },
        
    }

});

export { handler as GET, handler as POST }