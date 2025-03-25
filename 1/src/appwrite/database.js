import config from '../config/config'
import { Client, Databases, ID, Storage, Query } from 'appwrite'
import authServicObject from './auth';

export class Database {
    Client = new Client()
    databases;
    bucket;
    ID;

    constructor() {
        this.Client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)

    }

    async createPost({ title, content, FeatureiMage, status, userid, slug }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeatureiMage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, FeatureiMage, status, userid, }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeatureiMage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deltePost(slug) {
        try {

            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getOnePost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getAllPosts(queries = []) {
        try {
            const user = await authServicObject.getUserCurrent();
            if (!user) {
                console.log("User not authenticated, attempting guest access");
            }

            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries.length ? queries : [Query.equal('status', 'active')]
            );
        } catch (error) {
            if (error?.code === 401) {
                console.log("Not authorized. Check collection permissions.");
            }
            console.error("getAllPosts error:", error);
            return { documents: [] };
        }
    }

    //file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileID
        )
    }

}

const database = new Database()

export default database