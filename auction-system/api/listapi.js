import logger from "../../utils/logger";
import safeStringify from "fast-safe-stringify";
import { isValidArray } from "../../utils/common";

const listEndPoints = async (app) => {
  try {
    const availableRoutes = [];
    if (isValidArray(app._router.stack)) {
      app._router.stack.map(({ route }) => {
        if (route) availableRoutes.push(route);
      });
    }
    return { status: 200, data: availableRoutes };
  } catch (error) {
    logger.error("Error in listEndPoints", error);
    return { status: 500, message: "Oops! Something Went Wrong " };
  }
};

export { listEndPoints };
