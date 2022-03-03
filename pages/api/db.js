import { MongoClient } from "https://deno.land/x/mongo@v0.23.1/mod.ts";

export class DB {
  public client: MongoClient;

  private dbName: string;
  private dbUsername: string;
  private dbPassword: string;
  private dbUrl1: string;
  private dbUrl2: string;
  private dbUrl3: string;

  constructor() {
    this.dbName = Deno.env.get("DB_NAME") || "";
    if (!this.dbName) {
      throw new Error("db name should be defined");
    }

    this.dbUsername = Deno.env.get("DB_USERNAME") || "";
    if (!this.dbUsername) {
      throw new Error("db username should be defined");
    }

    this.dbPassword = Deno.env.get("DB_PASSWORD") || "";
    if (!this.dbPassword) {
      throw new Error("db password should be defined");
    }

    this.dbUrl1 = Deno.env.get("DB_URL_1") || "";
    if (!this.dbPassword) {
      throw new Error("db url 1 should be defined");
    }

    this.dbUrl2 = Deno.env.get("DB_URL_2") || "";
    if (!this.dbPassword) {
      throw new Error("db url 2 should be defined");
    }

    this.dbUrl3 = Deno.env.get("DB_URL_3") || "";
    if (!this.dbPassword) {
      throw new Error("db url 3 should be defined");
    }

    this.client = {};
  }

  async connect() {
    const client = new MongoClient();

    await client.connect({
      db: this.dbName,
      tls: true,
      servers: [
        {
          host: this.dbUrl2,
          port: 27017,
        },
        // This causes errors when it is in there that the wrong db is targeted
        // {
        //   host: this.dbUrl1,
        //   port: 27017,
        // },
        // {
        //   host: this.dbUrl3,
        //   port: 27017,
        // },
      ],
      credential: {
        username: this.dbUsername,
        password: this.dbPassword,
        db: this.dbName,
        mechanism: "SCRAM-SHA-1",
      },
    });
    console.log("database connected");

    this.client = client;
  }

  public getDatebase(databaseName: string) {
    return this.client.database(databaseName);
  }
}

const db = new DB();

export default db;
