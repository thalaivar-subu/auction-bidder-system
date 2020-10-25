import { getRandomInt } from "../../utils/common";
import logger from "../../utils/logger";

const bid = async (timeToRespond, auctionId, bidderId) => {
  try {
    const price = getRandomInt(0, timeToRespond + getRandomInt(0, 10));
    
    // To test delay
    // await new Promise(function (resolve, reject) {
    //   setTimeout(resolve, 2000);
    // }).then(function () {
    //   logger.info("Wrapped setTimeout after 2000ms");
    // });
    
    const response = { status: 200, data: { price, auctionId, bidderId } };
    logger.info("Response -> ", response);
    return response;
  } catch (error) {
    logger.error("Error while bidding -> ", error);
    return { status: 200, message: "Oops! Something Went Wrong" };
  }
};
export { bid };
