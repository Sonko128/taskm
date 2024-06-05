import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLink {
  lnk: string;
  name: string;
  sublnks?: NavLink[]
}

const lnks: NavLink[] = [
    {lnk: '/', name: 'Home'},
    {lnk: '/student', name: "Students"},
    {lnk: '/teacher', name: "Teachers"},
    {lnk: '/assign', name: 'Assignmenet',
    sublnks: [
      {lnk: '/assign', name: 'Upload Assignmenet'},
      {lnk: '/view', name: "Submitted work"},
    ] 
    },
    {lnk: '/notes', name: 'Notes'},
    {lnk: '/profile', name: 'Profile'},
    {lnk: '/login', name: 'Logout'},
]

export default function Navbar() {
  const smallScreen = window.matchMedia('(max-width: 700px)');
  const [hidden, setHidden] = useState(smallScreen.matches)

  return(
    <section className="md:lg:w-60 p-2 bg-slate-900 text-white">
      {smallScreen.matches && 
        <button className="text-xl p-2 w-10 rounded-md ring-1 ring-slate-200" onClick={() => setHidden(!hidden)}>
          {hidden ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
      </svg>
        : '-'}
        </button>
      }
      <div className="flex flex-col" >
        <span className="mx-auto" hidden={hidden}>
        <img className="mx-auto h-20 w-auto rounded-full item-center" src="" alt="" />
        </span>
        <span className="mx-auto" hidden={hidden}>
          TMS
        </span>
      </div>
      <nav className="mt-4 w-full" hidden={hidden}>
        <ul>
          {lnks.map(lnk =>
            <LinkItem key={lnk.lnk} l={lnk} />
          )}
        </ul>
      </nav>
      <div className="w-full fixed flex-col bottom-0">
      <span className="mx-auto" hidden={hidden}>
            Version 1.0.0.0
        </span>
      </div>
    </section>
  );
}

function LinkItem({l}: {l: NavLink}) {
  const [hidden, setHidden] = useState(true);
  const current = useLocation();

  return(
    <li className={`w-full ${current.pathname === l.lnk && 'bg-blue-200'} rounded-md`}>
      {l.sublnks ? 
        <span className="cursor-pointer" onClick={() => setHidden(!hidden)}>
          <span className="hover:bg-slate-400 p-2 rounded-md text-xl font-bold flex justify-between">
            <span>{l.name}</span>
            {hidden ? '+' : '-'}
          </span>
          <ul className="font-light" hidden={hidden}>
            {l.sublnks.map(sl =>
            <li key={sl.lnk} className="w-full">
              <Link className="hover:bg-slate-200 rounded-md ml-3 w-full p-2" to={sl.lnk}>
                {sl.name}
              </Link>
            </li>
            )}
          </ul>
        </span>
        :
      <Link className="hover:bg-slate-100 my-2 rounded-md p-2 text-xl font-bold block" 
        to={l.lnk}>{l.name}
      </Link>
        
      }
    </li>
  )
}