// all the data about the currently logged in user
import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import {JWT} from 'next-auth/jwt'
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
    // define all the providers
    // ! it could be undefined
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
       encode: ({secret, token}) => {
        // get the encoded token
        const encodedToken = jsonwebtoken.sign(
        // payload
            {
            ...token,
            issuer: 'grafbase',
            expire: Math.floor(Date.now() / 1000) + 60 *60 //13hours
            }, 
            // secret/private key
            secret
        )
        return encodedToken
       },
       decode: async ({secret, token}) => {
        const decodedToken = jsonwebtoken.verify(token!, secret);
        return decodedToken as JWT
       } 
    }, 
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    // most important part
    callbacks: {
        //function that gets triggered everytime user visits the page
        // we start new session for the user
        async session({session}) {
            // return google user info (name, email, avatarURL) and from our project( projects, description, githubURL, linkedUrl). We need to merge them

            // merging the 2 users
            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as {user?: UserProfile} 
                // open a new session
                // connecting the 2
                const newSession = {
                    ...session,
                    // this is where we take both parts
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }
                return newSession
            } catch (error) {
                console.log('Error retrieving user data', error)
                return session
            }
           
        },
        // whenever the user signs in, we get their info in user object
        async signIn({user} : {user: AdapterUser | User}) {
            try {
                // THIS WILL BE WITH INTERACTING WITH GRAFBASE
                // get the user if they exist
                const userExists = await getUser(user?.email as string) as {user?: UserProfile}
                // if they don't exist, create them
                if(!userExists.user){
                    await createUser(
                        user.name as string,
                        user.email as string,
                        user.image as string)
                }
                return true
            } catch (error: any) {
                console.log(error);
                return false;
            }
        }
    }
}

// for the Navbar session
export async function getCurrentUser(){
    // SessionInterface extends session and adds google properties
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}

