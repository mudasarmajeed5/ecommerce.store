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
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions:{
                timeout:10000,
            }
        })
    ],
    callbacks: {
        async signIn({ user, account}) {
            if (account.provider == 'github' || account.provider == 'google') {
                try {
                    await connectDB();
                    const currentUser = await User.findOne({ email: user.email });
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