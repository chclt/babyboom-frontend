import {createRootRoute, Link, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">
          memories
        </Link>
        <Link to="/boom">
          Boom
        </Link>
      </nav>
      <Outlet/>
    </>
  ),
})
