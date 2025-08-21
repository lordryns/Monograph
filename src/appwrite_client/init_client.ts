import { Client, Databases } from "appwrite"

export const databaseId = "67b9b8db00288cb3b0ec";
export const bookCollectionId = "67b9b8e90009de0b198e";


const client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject("67b9b83d0025fda6fe0f")

export const databases = new Databases(client)
