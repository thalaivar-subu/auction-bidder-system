import Axios from "axios";
import { AUCTION_SYSTEM_URL, PORT } from "../utils/constants";
import axios from "axios";
import logger from "../utils/logger";

const bidderInfo = {};
const registerBidder = async () => {
  try {
    const response = await axios({
      timeout: 5000,
      method: "POST",
      url: `${AUCTION_SYSTEM_URL}/register`,
      data: {
        url: `http://127.0.0.1:${PORT}/bid`,
      },
    });
    const {
      bidderId,
      bidderUrl,
      existingBidder,
      timeToRespond,
    } = response.data;
    Object.assign(bidderInfo, {
      bidderId,
      bidderUrl,
      existingBidder,
      timeToRespond,
    });
    logger.info("Bidder Info -> ", bidderInfo);
  } catch (error) {
    logger.error("Error in registerBidder -> ", error);
  }
};

export { registerBidder, bidderInfo };
