import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-3 bg-sky-500'>
      <Link href={'/'}>
        <h3 className='text-2xl font-bold'>NextMySql</h3>
      </Link>
      <ul className='flex gap-x-2'>
        <li className='p-2 rounded-lg cursor-pointer hover:bg-sky-950'>
          <Link className='text-xl' href={'/'}>
            Products
          </Link>
        </li>
        <li className='p-2 rounded-lg cursor-pointer hover:bg-sky-950'>
          <Link className='text-xl' href={'/new'}>
            New
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
