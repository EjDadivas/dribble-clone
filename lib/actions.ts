import { ProjectForm } from '@/common.types';
import { createUserMutation, getUserQuery } from '@/graphql';
import {GraphQLClient} from 'graphql-request'

const isProduction = process.env.NODE_ENV === 'production';

// pnpx grafbase dev - start grafbase environment and gives endpoint u can target
const apiURL = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

const client = new GraphQLClient(apiURL)

// accepts query and variables
const makeGraphQLRequest = async (query: string,
    variables = {}) => {
        try {
            // make connection to database using client.request
            // client is a connection to the database
            return await client.request(query, variables)
        } catch (error) {
            throw error;
    }
}

// Get user
export const getUser = (email: string) => {
    //add the api key
    client.setHeader('x-api-key', apiKey);

    //all queries at graphql folder
    return makeGraphQLRequest(getUserQuery, {email})
}

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);

    const variables = {
        input: {
            name, email, avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation, variables)

}

export const uploadImage = async (imagePath:string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`)
    } catch (error) {
        
    }
}
// components/ProjectForm.tsx
export const createNewProject = async (form: ProjectForm, createId: string, token: string)=>{

    // upload image to  cloudinary
    const imageurl = await uploadImage(form.image)
}