import {createRootRoute, Link, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <menu>
          <li>
            <Link to="/welcome">
              welcome
            </Link>
          </li>
          <li>
            <Link to="/memories">
              memories
            </Link>
          </li>

          <li>
            <Link to="/boom">
              Boom
            </Link>
          </li>
        </menu>
      </nav>

      <Outlet/>
    </>
  ),
})
