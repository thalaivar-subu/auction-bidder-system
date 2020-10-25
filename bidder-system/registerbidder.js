import { Op } from "sequelize";
import { AUCTION_SYSTEM_URL, PORT } from "../utils/constants";
import axios from "axios";
import logger from "../utils/logger";
import { bidder } from "../models";
const bidderInfo = {};
const registerBidder = async () => {
  try {
    const url = `http://127.0.0.1:${PORT}/bid`;
    logger.info("URL: -> ", { url });
    const bidderRecord = await bidder.findOne({
      where: {
        bidderUrl: {
          [Op.eq]: url,
        },
      },
    });
    if (bidderRecord) {
      const { bidderId, bidderUrl } = bidderRecord.dataValues;
      Object.assign(bidderInfo, {
        bidderId,
        bidderUrl,
        existingBidder: true,
      });
      logger.info("Existing Bidder");
    } else {
      const response = await axios({
        timeout: 5000,
        method: "POST",
        url: `${AUCTION_SYSTEM_URL}/register`,
        data: {
          url,
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
      logger.info("New bidder");
    }

    logger.info("Bidder Info -> ", bidderInfo);
  } catch (error) {
    logger.error("Error in registerBidder -> ", error);
  }
};

export { registerBidder, bidderInfo };
