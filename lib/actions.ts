import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

// pnpx grafbase dev - start grafbase environment and gives endpoint u can target
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const clientOptions = {
  headers: {
    "x-api-key": apiKey,
  },
};
// const client = new GraphQLClient(apiUrl);
const client = new GraphQLClient(apiUrl, clientOptions);

// accepts query and variables
const makeGraphQLRequest = async (
  query: string,
  variables = {},
  headers = {}
) => {
  try {
    // make connection to database using client.request
    // client is a connection to the database
    return await client.request(query, variables, headers);
    // return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

// Get user
export const getUser = (email: string) => {
  //add the api key
  client.setHeader("x-api-key", apiKey);

  //all queries at graphql folder
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

// fetching the token
export const fetchToken = async () => {
  try {
    // next-auth automatically publishes your token by default
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    console.log("fetchToken error:", error);
    throw error;
  }
};

// image name
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
// components/ProjectForm.tsx
export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  // upload image to  cloudinary
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    // so that not anyone can upload
    // client.setHeader("Authorization", `Bearer ${token}`);
    const headers = { Authorization: `Bearer ${token}` };
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };
    console.log("project mutation: ", createProjectMutation);
    console.log("variables", variables);
    // return makeGraphQLRequest(createProjectMutation, variables);
    return makeGraphQLRequest(createProjectMutation, variables, headers);
  }
};
