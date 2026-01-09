type TOptions = {
  page?: number | string;
  limit?: number | string;
  sortOrder?: string;
  sortBy?: string;
};

type TOptionsReturn={
    page:number;
    limit:number;
    skip:number;
    sortBy:string;
    sortOrder:string
}


const paginationSortingHelper = (options: TOptions):TOptionsReturn => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export default paginationSortingHelper;
