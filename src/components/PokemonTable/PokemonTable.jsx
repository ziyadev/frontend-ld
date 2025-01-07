import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Container, Card, SimpleGrid, Input, Stack, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Search, HeartPulse } from "lucide-react";
import { usePokemon } from "./usePokemon";

export const PokemonTable = () => {
  const {
    data,
    error,
    isLoading,
    sortStatus,
    setSortStatus,
    page,
    pageSize,
    setPage,
    isValidating,
    totalRecords,
    filter,
    setFilter,
    maxPower,
    minPower,
  } = usePokemon();
  // we add animations to the table
  const [bodyRef] = useAutoAnimate();

  if (error) return <div>failed to load</div>;
  return (
    <Container size="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb={10}>
        <SimpleGrid cols={2}>
          <Input
            placeholder="Search..."
            value={filter.name}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, name: e.target.value }))
            }
            leftSection={<Search size={18} />}
          />
          <Input
            placeholder="Power threshold"
            value={filter.power}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, power: e.target.value }))
            }
            leftSection={<HeartPulse size={18} />}
          />
        </SimpleGrid>
        <Stack gap={1} mt={10}>
          <Text size="sm">Max Power:{maxPower}</Text>
          <Text size="sm">Min Power:{minPower}</Text>
        </Stack>
      </Card>
      <DataTable
        borderRadius="md"
        bodyRef={bodyRef}
        withTableBorder
        striped
        highlightOnHover
        onError={error}
        columns={[
          { accessor: "id", title: "ID", sortable: true },
          { accessor: "name", sortable: true },
          { accessor: "type" },
          { accessor: "hp" },
          { accessor: "attack" },
          { accessor: "defense" },
          { accessor: "special_attack" },
          { accessor: "special_defense" },
          { accessor: "speed", sortable: true },
          { accessor: "power", sortable: true },
        ]}
        fetching={isLoading || isValidating}
        records={data}
        totalRecords={totalRecords}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
      />
    </Container>
  );
};
