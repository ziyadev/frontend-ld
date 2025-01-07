import { usePagination } from "@/hooks/usePagination";
import { useFetcher } from "@/hooks/useFetcher";
import { useSort } from "@/hooks/useSort";
import { useFilter } from "@/hooks/useFilter";
import { useMemo } from "react";
import sortBy from "lodash/sortBy";

export const usePokemon = (defaultConfig) => {
  const { data: pokemon, ...rest } = useFetcher("pokemon.json");
  const { sortStatus, setSortStatus } = useSort(defaultConfig?.sortStatus);
  const { page, pageSize, setPage, setPageSize } = usePagination(
    defaultConfig?.pagination
  );
  const calculatePower = (row) => {
    const { hp, attack, defense, special_attack, special_defense, speed } = row;
    return hp + attack + defense + special_attack + special_defense + speed;
  };
  const { filter, setFilter } = useFilter(defaultConfig?.filter);
  const { data, totalRecords } = useMemo(() => {
    if (!pokemon || pokemon.length === 0) return []; // Handle case when pokemon is undefined or empty

    // add power column
    pokemon.forEach((pokemon) => {
      pokemon.power = calculatePower(pokemon);
    });
    //   Sort the data
    const sorted = sortBy(pokemon, sortStatus.columnAccessor);
    const sortedData =
      sortStatus.direction === "desc" ? [...sorted].reverse() : sorted;

    //   Apply filtering (if filter exists and has a valid value)
    const filteredData = (() => {
      let filtered = sortedData;
      // We get the keys of the filter object
      const keys = Object.keys(filter);
      // For each key in the filter object, we check if it's a columnAccessor and filter accordingly
      for (const key of keys) {
        const normalizedKey = key.toLowerCase();
        if (normalizedKey === "power") {
          // If filtering by power, we get the data where the power is greater than or equal to the filter value
          filtered = filtered.filter((row) => row.power >= filter[key]);
        }
        // For other columns, check if the row's value contains the filter value (case-insensitive)
        filtered = filtered.filter((row) => {
          const value = row[key]?.toString().toLowerCase();
          if (value !== undefined && value !== "") {
            return value.includes(filter[key]?.toString().toLowerCase());
          }
          return true;
        });
      }
      return filtered;
    })();

    //   Apply pagination
    const from = (page - 1) * pageSize; // Calculate start index
    const to = from + pageSize; // Calculate end index
    return {
      totalRecords: filteredData.length,
      data: filteredData.slice(from, to), // Return paginated data
    };
  }, [pokemon, sortStatus, page, pageSize, filter]);

  const power = useMemo(() => {
    if (!data) return 0;
    const powers = data.map(
      (row) =>
        row.hp +
        row.attack +
        row.defense +
        row.special_attack +
        row.special_defense +
        row.speed
    );
    return {
      minPower: Math.min(...powers),
      maxPower: Math.max(...powers),
    };
  }, [data]);

  return {
    ...rest,
    sortStatus,
    setSortStatus,
    page,
    pageSize,
    setPage,
    setPageSize,
    minPower: power.minPower,
    maxPower: power.maxPower,
    setFilter,
    filter,
    totalRecords,
    data,
  };
};
