import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const styles = {
  link: {
  },
}

export interface RouterLinkProps {
  to: string
  children: string
  style?: React.CSSProperties
  external?: boolean
}

export function RouterLink({ to, children, style, external = false }: RouterLinkProps) {
  const linkStyle = useMemo(() => ({ ...styles.link, ...style }), [style])

  if (external) {
    return (
      <a href={to} style={linkStyle} className="external">
        {children}
      </a>
    )
  } else {
    return (
      <Link to={to} style={linkStyle} className="internal">
        {children}
      </Link>
    )
  }
}