// import { conn } from '@/libs/mysql'
import ProductCard from '@/components/ProductCard'
import axios from 'axios'

async function loadProducts() {
  // se puede hacer de dos formas
  // const result = await conn.query('SELECT * FROM product')
  const { data } = await axios.get('http://localhost:3000/api/products')

  return data
}

const ProductsPage = async () => {
  const products = await loadProducts()

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsPage
