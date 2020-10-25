import logger from "../../utils/logger";
import models from "../../models";

const registerBidder = async (url) => {
  try {
    return { status: 200, data: {} };
  } catch (error) {
    logger.error("Error while registering Bid", error);
    return { status: 500, message: "Oops! Something Went wrong" };
  }
};

export { registerBidder };
