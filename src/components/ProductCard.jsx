import Link from 'next/link'

const ProductCard = ({ product }) => {
  return (
    <Link
      className='mb-3 text-black bg-white border rounded-lg cursor-pointer boder-gray-800 hover:bg-gray-200'
      href={`/products/${product.id}`}
    >
      {product.image && (
        <img src={product.image} className='w-full rounded-t-lg' />
      )}

      <div className='p-4'>
        <h1 className='text-lg font-bold'>{product.name}</h1>
        <h2 className='text-2xl text-slate-600'>{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  )
}

export default ProductCard
