import connectMongo from "../../../database/conn";
import {
  getHistorys,
  postHistory,
  putHistory,
  deleteHistory,
} from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getHistorys(req, res);
      break;
    case "POST":
      postHistory(req, res);
      break;
    case "PUT":
      putHistory(req, res);
      break;
    case "DELETE":
      deleteHistory(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
