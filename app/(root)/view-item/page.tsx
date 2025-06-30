import React, { Suspense } from 'react'
import ViewItem from '@/components/catalog/ViewItem'

const ItemPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ViewItem />
    </Suspense>
  )
}

export default ItemPage