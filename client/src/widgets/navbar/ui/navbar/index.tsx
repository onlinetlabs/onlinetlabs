import { AppShell, UnstyledButton } from "@mantine/core";
import styles from "./styles.module.css";
import { NAVIGATION } from "@entities/navigation";

export const Navbar = () => {
  return (
    <AppShell.Navbar py="md" px={4}>
      {NAVIGATION.map((item) => (
        <UnstyledButton key={item.id} className={styles.control}>
          {item.label}
        </UnstyledButton>
      ))}
    </AppShell.Navbar>
  )
}