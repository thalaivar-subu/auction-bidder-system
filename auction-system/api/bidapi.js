import logger from "../../utils/logger";
import { auction, bidder } from "../../models";
import sequelize, { Op } from "sequelize";
import { isValidArray, promiseTimeout } from "../../utils/common";
import { TIME_TO_RESPOND } from "../../utils/constants";
import axios from "axios";

const initiateBid = async (auctionId) => {
  try {
    let response = {};
    const auctionRecord = await auction.findOne({
      attributes: [
        "auctionId",
        "bidderId",
        [sequelize.fn("MAX", sequelize.col("bid_ammount")), "bidAmmount"],
      ],
      where: {
        auctionId: {
          [Op.eq]: auctionId,
        },
      },
      group: ["bidderId"],
    });
    if (auctionRecord) {
      response = {
        ...auctionRecord.dataValues,
        message: "Auction Already Bidded",
      };
    } else {
      const allRecords = await bidder.findAll({
        attribute: ["bidderUrl", "bidderId", "auctionId"],
      });
      if (isValidArray(allRecords)) {
        await Promise.allSettled(
          allRecords.map(
            async ({ dataValues: { bidderUrl, bidderId } = {} }) => {
              return axios({
                method: "GET",
                timeout: TIME_TO_RESPOND,
                params: {
                  timeToRespond: TIME_TO_RESPOND,
                  auctionId,
                  bidderId,
                },
                url: bidderUrl,
              })
                .then(async ({ data: { price, bidderId } = {} }) => {
                  await auction.create({
                    auctionId,
                    bidderId,
                    bidAmmount: price,
                  });
                })
                .catch((error) => {
                  logger.error("Error while calling Bidder -> ", error);
                });
            }
          )
        );
        const auctionRecord = await auction.findOne({
          attributes: [
            "auctionId",
            "bidderId",
            [sequelize.fn("MAX", sequelize.col("bid_ammount")), "bidAmmount"],
          ],
          where: {
            auctionId: {
              [Op.eq]: auctionId,
            },
          },
          group: ["bidderId"],
        });
        if (auctionRecord) {
          response = {
            ...auctionRecord.dataValues,
            message: "New Auction Result",
          };
        }
      }
    }
    return { status: 200, data: { ...response } };
  } catch (error) {
    logger.error("Error while initiating Bid", error);
    return { status: 500, message: "Oops! Something Went wrong" };
  }
};

export { initiateBid };
