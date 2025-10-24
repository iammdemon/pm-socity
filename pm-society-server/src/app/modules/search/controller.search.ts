import catchAsync from "../../utils/catchAsync";
import { searchService } from "./service.search";

const search = catchAsync(async (req, res) => {
  const query = req.query.q as string;
  const result = await searchService.searchAll(query);

  res.status(200).json({
    status: "success",
    query,
    data: result,
  });
});

export const searchController = {
  search,
};
