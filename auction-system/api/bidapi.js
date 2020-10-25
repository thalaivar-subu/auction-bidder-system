import logger from "../../utils/logger";
import models from "../../models";

const initiateBid = async (auction_id) => {
  try {
    return { status: 200, data: {} };
  } catch (error) {
    logger.error("Error while initiating Bid", error);
    return { status: 500, message: "Oops! Something Went wrong" };
  }
};

export { initiateBid };
