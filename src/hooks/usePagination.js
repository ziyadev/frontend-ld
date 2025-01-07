import { useState } from "react";

/**
 * A custom hook for managing pagination.
 *
 * @param {*} defaultConfig - The default configuration for pagination.
 * @param {number} [defaultConfig.page=1] - The initial page number.
 * @param {number} [defaultConfig.pageSize=10] - The number of items per page.
 *
 * @returns {Object} - The hook's state and utility functions.
 * @returns {number} page - The current page number.
 * @returns {number} pageSize - The number of items per page.
 * @returns {Function} setPage - Function to update the page number.
 * @returns {Function} setPageSize - Function to update the number of items per page.
 */
export const usePagination = (defaultConfig = {}) => {
  const { page = 1, pageSize = 10 } = defaultConfig;
  const [pagination, setPagination] = useState({
    page,
    pageSize,
  });

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    setPage: (page) => setPagination((prev) => ({ ...prev, page })),
    setPageSize: (pageSize) => setPagination((prev) => ({ ...prev, pageSize })),
  };
};
