import React from 'react'
import { NavLink } from 'react-router-dom'
import type { NavLinkProps } from 'react-router-dom'

const AnchorLink: React.FC<NavLinkProps> & {
  scrollToAnchor: (anchor: string) => void
} = (props) => {
  const hash = (props.to as string).match(/(#.+)$/)?.[1] || ''

  return (
    <NavLink
      {...props}
      onClick={() => AnchorLink.scrollToAnchor(hash.substring(1))}
    />
  )
}

AnchorLink.scrollToAnchor = (anchor: string) => {
  if (!anchor) return
  // wait for dom update
  window.requestAnimationFrame(() => {
    const elm = document.getElementById(decodeURIComponent(anchor))

    if (elm) {
      // compatible in Edge
      window.scrollTo(0, getElmScrollPosition(elm) - 20)
    }
  })
}

export default AnchorLink

function getElmScrollPosition(elm: HTMLElement): number {
  return (
    elm.offsetTop +
    (elm.offsetParent
      ? getElmScrollPosition(elm.offsetParent as HTMLElement)
      : 0)
  )
}
