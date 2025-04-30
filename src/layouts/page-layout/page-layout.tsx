import { ReactNode } from "react"

import { NavBar } from "~components/nav-bar"

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flex: '1',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch',
  },
  content: {
    flex: '1',
    padding: '1rem',
  },
}


export interface PageLayoutProps {
  children: ReactNode
  withNavBar?: boolean
}

export function PageLayout({ withNavBar = true, children }: PageLayoutProps) {
  return (
    <div style={styles.container}>
      {withNavBar && (
        <div style={styles.navBar}>
          <NavBar />
        </div>
      )}

      <div style={styles.content}>
      {children}
      </div>
    </div>
  )
}