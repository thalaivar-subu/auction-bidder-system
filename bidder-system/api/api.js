import { bid } from "./bidapi";
const apis = async (app) => {
  // Starts bid
  app.get("/bid", async (req, res) => {
    const { timeToRespond, auctionId, bidderId } = req.query;
    const { status, data, message } = await bid(
      timeToRespond,
      auctionId,
      bidderId
    );
    res.status(status).json(data || message);
  });
};
export default apis;
