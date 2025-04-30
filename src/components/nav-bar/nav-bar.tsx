import { RouterLink } from "~components/router-link"
import { routes } from "~routing/routes"

const styles = {
  container: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  item: {
    padding: '0.5em',
    borderBottom: '1px solid white',
  },
  current: {},
}

export interface NavBarProps {}

export function NavBar({}: NavBarProps) {
  return (
    <div style={styles.container}>
      <RouterLink to={routes.v1} style={styles.item}>v1</RouterLink>
      <RouterLink to={routes.v2} style={styles.item}>v2</RouterLink>
    </div>
  )
}
