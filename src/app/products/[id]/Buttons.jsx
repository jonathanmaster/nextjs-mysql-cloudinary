'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

const Buttons = ({ productId }) => {
  const router = useRouter()

  return (
    <div className='flex justify-end mt-2 gap-x-2'>
      <button
        className='px-3 py-2 text-white bg-red-500 hover:bg-red-700'
        onClick={async () => {
          if (confirm('are you sure you want to delete thos product?')) {
            const result = await axios.delete(`/api/products/${productId}`)

            if (result.status === 204) {
              router.push('/')
              router.refresh()
            }
          }
        }}
      >
        Delete
      </button>
      <button
        className='px-3 py-2 text-white bg-gray-500 hover:bg-gray-700'
        onClick={() => {
          router.push(`/products/edit/${productId}`)
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Buttons
