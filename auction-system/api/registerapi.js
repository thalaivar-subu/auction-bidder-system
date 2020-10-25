import logger from "../../utils/logger";
import { Op } from "sequelize";
import { bidder } from "../../models";
import { TIME_TO_RESPOND } from "../../utils/constants";
import crypto from "crypto";
import { get } from "../../utils/common";

const registerBidder = async (url) => {
  try {
    let response = {};
    const bidderRecord = await bidder.findOne({
      attributes: ["bidderId"],
      where: {
        bidderUrl: {
          [Op.eq]: url,
        },
      },
    });
    if (!bidderRecord) {
      const bidderId = crypto.createHash("sha256").update(url).digest("hex");
      const createBidder = await bidder.create({
        bidderId: bidderId,
        bidderUrl: url,
      });
      response = {
        bidderId,
        bidderUrl: url,
        existingBidder: false,
        timeToRespond: TIME_TO_RESPOND,
      };
      logger.info("Bidder Registered -> ", createBidder);
    } else {
      const bidderId = get(bidderRecord, "dataValues.bidderId");
      response = {
        bidderId,
        bidderUrl: url,
        existingBidder: false,
        timeToRespond: TIME_TO_RESPOND,
      };
      logger.info("Existing Bidder -> ", bidderRecord);
    }
    return { status: 200, data: { ...response } };
  } catch (error) {
    logger.error("Error while registering Bid", error);
    return { status: 500, message: "Oops! Something Went wrong" };
  }
};

export { registerBidder };
