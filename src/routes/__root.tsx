import {createRootRoute, Link, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='max-w-md'>
      <Outlet/>

      <nav className='fixed inset-x-0 bottom-0'>
        <menu className='grid grid-cols-2'>
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
    </div>
  ),
})
