import React, { Suspense } from 'react'
import Catalog from '@/components/catalog/Catalog'

const CatalogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Catalog />
    </Suspense>
  )
}

export default CatalogPage