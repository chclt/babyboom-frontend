import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import IconBookPenFill from "../assets/IconBookPenFill.tsx";
import IconGiftOutline from "../assets/IconGiftOutline.tsx";

export const Route = createRootRoute({
  component: PageComponent,
})


function PageComponent() {
  return (
    <div className='max-w-md'>
      <Outlet/>

      <nav className='fixed inset-x-0 bottom-0 h-[59px] bg-[#F0DFCE]/80'>
        <menu className='h-full grid grid-cols-2 text-[#A6AAB2]'>
          <li>
            <Link to="/memories" className="w-full h-full flex flex-col justify-center items-center group">
              <IconBookPenFill className='group-[.active]:text-black'/>
              <span className="group-[.active]:text-[#2A88FF]">回忆</span>
            </Link>
          </li>
          <li>
            <Link to="/boom" className="w-full h-full flex flex-col justify-center items-center group">
              <IconGiftOutline className='group-[.active]:text-black'/>
              <span className='group-[.active]:text-[#2A88FF]'>boom</span>
            </Link>
          </li>
        </menu>
      </nav>
    </div>
  )
}