import Cookies from "cookies";
import Cors from "cors";
import initMiddleware from "./initMiddelware";
const { MongoClient, ServerApiVersion } = require("mongodb");

const setSignedCookie = (req, res) => {
  const cookies = new Cookies(req, res);

  const date = new Date();
  cookies.set("signed", "true", {
    name: "signed",
    value: "true",
    expires: new Date(date.setFullYear(date.getFullYear() + 1)),
    domain: "localhost",
    secure: false,
    sameSite: "Strict",
    path: "/",
  });
};

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST", "OPTIONS"],
    origin: "https://goofy-darwin-b44948.netlify.app",
  })
);

export default async function handler(req, res) {
  const f = Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: "POST, OPTIONS",
    origin: true,
  });

  f(req, res, (result) => {
    console.log(result);
  });

  await cors(req, res);

  if (req.headers["content-type"] !== "application/json") {
    return res.status(422).send("Invalid body");
  }
  const body = await req.body;

  if (!Object.keys(body).length) {
    return res.status(400).send("Request body can not be empty!");
  }

  const { visitorId } = body;

  if (!visitorId) {
    return res.status(400).send("VisitorId should be defined");
  }

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fbnrc.mongodb.net/tester?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();

  const signatures = client.db("whatsapp-petition").collection("signatures");

  // Not worried about scallability here since the db handles this query
  // If this ever gets slow indexing the database should be the solution to make it faster
  const signatuesWithCurrentFingerprint = await signatures
    .find({ visitorId: { $eq: visitorId } }, { noCursorTimeout: false })
    .toArray();

  if (signatuesWithCurrentFingerprint.length > 0) {
    setSignedCookie(req, res);
    return res.status(403).send("User has already signed the petition");
  }
  // TODO: figure out how to handle race conditions.
  //  When the API is called multiple times in succession with the same visitorId
  await signatures.insertOne({
    timestamp: new Date(),
    visitorId,
  });

  setSignedCookie(req, res);

  return res.status(201).send("Succesfull");
}
