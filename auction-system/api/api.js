import { listEndPoints } from "./listapi";
import { initiateBid } from "./bidapi";
import { registerBidder } from "./registerapi";
const apis = async (app) => {
  // Starts Auction
  app.get("/bid/:auction_id", async (req, res) => {
    const { status, data, message } = await initiateBid(req.params.auction_id);
    res.status(status).json(data || message);
  });

  // Register Bidder
  app.post("/register", async (req, res) => {
    const { url } = req.body;
    const { status, data, message } = await registerBidder(url);
    res.status(status).json(data || message);
  });

  // Lists endpoint present in Auction application
  app.get("/list", async (req, res) => {
    const { status, data, message } = await listEndPoints(app);
    res.status(status).json(data || message);
  });
};
export default apis;
