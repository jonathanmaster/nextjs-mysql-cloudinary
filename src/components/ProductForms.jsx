/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'

const ProductForms = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
  })

  const [file, setFile] = useState(null)

  const router = useRouter()
  const form = useRef(null)
  const params = useParams()

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        })
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('description', product.description)

    if (file) {
      formData.append('image', file)
    }

    if (!params.id) {
      const res = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      const res = await axios.put(`/api/products/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(res)
    }

    form.current.reset()
    router.push('/products')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className='px-8 pt-6 pb-8 text-black bg-white rounded-md shadow-md'
    >
      <label
        htmlFor='name'
        className='block mb-2 text-sm font-bold text-gray-700'
      >
        Product name
      </label>
      <input
        name='name'
        type='text'
        autoFocus
        placeholder='name'
        onChange={handleChange}
        value={product.name}
        className='w-full px-3 py-2 border rounded shadow appearance-none'
      />

      <label
        htmlFor='price'
        className='block mb-2 text-sm font-bold text-gray-700'
      >
        Product price
      </label>
      <input
        name='price'
        type='text'
        placeholder='00.00'
        onChange={handleChange}
        value={product.price}
        className='w-full px-3 py-2 border rounded shadow appearance-none'
      />

      <label
        htmlFor='description'
        className='block mb-2 text-sm font-bold text-gray-700'
      >
        Product Description
      </label>
      <textarea
        rows={3}
        name='description'
        placeholder='description'
        onChange={handleChange}
        value={product.description}
        className='w-full px-3 py-2 border rounded shadow appearance-none'
      />

      <label
        htmlFor='description'
        className='block mb-2 text-sm font-bold text-gray-700'
      >
        Product Image
      </label>
      <input
        type='file'
        className='w-full px-3 py-2 border rounded shadow appearance-none'
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className='object-contain my-4 w-96'
        />
      )}

      <button className='px-4 py-2 mb-2 text-white rounded bg-sky-700 hover:bg-blue-700'>
        {params.id ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}

export default ProductForms
