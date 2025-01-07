import { useState } from "react";

/**
 * A custom hook for managing sorting.
 *
 * @param {Object} defaultConfig - The default configuration for sorting.
 * @param {string} [defaultConfig.columnAccessor="id"] - The column by which to sort data (e.g., "id", "name").
 * @param {"asc"|"desc"} [defaultConfig.direction="desc"] - The direction of sorting (ascending or descending).
 *
 * @returns {Object} - The hook's state and utility functions.
 * @returns {Object} sortStatus - The current sorting configuration.
 * @returns {Function} setSortStatus - Function to update the sorting configuration.
 */
export const useSort = (defaultConfig = {}) => {
  const { columnAccessor = "id", direction = "desc" } = defaultConfig;

  const [sortStatus, setSortStatus] = useState({
    columnAccessor,
    direction,
  });

  return {
    sortStatus,
    setSortStatus,
  };
};
