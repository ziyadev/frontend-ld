import classes from "./index.module.css";
import { PokemonTable } from "@/components/PokemonTable/PokemonTable";
const HomePage = () => {
  return (
    <main>
      <header className={classes.header}>
        <h1 className={classes.title}>Welcome to Pokemon Frontend</h1>
      </header>
      <PokemonTable />
    </main>
  );
};

export default HomePage;
