import { useState } from "react";

/**
 * Custom hook for managing filters with debouncing.
 * Allows filtering by multiple columns.
 *
 * @param {Object} defaultConfig - The default filter configuration with column keys and initial values.
 * @param {string} [defaultConfig.name=""] - Default filter value for the "name" column.
 *
 * @returns {Object} - The hook's state and utility functions.
 * @returns {Object} filter - The current filtering configuration.
 * @returns {Function} setFilter - Function to update the filtering configuration.
 */
export const useFilter = (defaultConfig = { name: "", power: 0 }) => {
  // Initialize filter state with the provided defaultConfig or default to an empty object
  const [filter, setFilter] = useState(defaultConfig);

  return {
    filter,
    setFilter,
  };
};
