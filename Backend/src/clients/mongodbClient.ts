import { connect, Mongoose } from "mongoose";

export class MongoDBClient {
  private static mongodbConnection: Mongoose;

  private constructor() {}

  public static async createConnectionToMongoDB() {
    try {
      // check if connection not created already
      if (MongoDBClient.mongodbConnection === undefined) {
        // fetch mongodb connection string
        const mongodbConnectionString =
          process.env["MONGODB_CONNECTION_STRING"];
        MongoDBClient.mongodbConnection = await connect(
          mongodbConnectionString ? mongodbConnectionString.trim() : ""
        );
        console.info(
          `created connection to mongodb: ${MongoDBClient.mongodbConnection.connection.name}`
        );
      } else {
        console.info(
          `connection already exists to mongodb: ${MongoDBClient.mongodbConnection.connection.name}`
        );
      }
    } catch (error: unknown) {
      console.error(
        `error creating connection to mongodb: ${JSON.stringify(error)}`
      );
    }
  }
}
