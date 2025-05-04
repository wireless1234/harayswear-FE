'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import TabNavigation from './tabs';
import { toast } from 'react-toastify';
import { tabs, Product } from "@/lib/productCategoryData";
import { ProductSkeleton } from '@/lib/skeletonLoader';
import { useCart } from '@/hooks/useCart';

const OtherProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(tabs[0].id); 
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const [page, setPage] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart, sessionKey } = useCart();

  const handleScroll =() =>{
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleAddToCart = async (productId: number) => {
    setAddingToCart(productId);
    try {
      await addToCart({ items: [{ productId, quantity: 1 }], sessionKey });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart.");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async (append: boolean = false) => {
      try {
        setLoading(true);
        // Reset products when tab changes
        if (page === 1) {
          setProducts([]);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/products/?page=${page}&page_size=3&category=${activeTab}`
        );

        if (!res.ok) {
          let errorMessage = '';
        
          switch (res.status) {
            case 400:
              errorMessage = 'Bad Request - The server could not understand the request.';
              break;
            case 401:
              errorMessage = 'Unauthorized - Please log in to access this resource.';
              break;
            case 403:
              errorMessage = 'Forbidden - You do not have permission to access this.';
              break;
            case 404:
              errorMessage = 'Not Found - The requested resource could not be found.';
              break;
            case 500:
              errorMessage = 'Internal Server Error - Something went wrong on the server.';
              break;
            case 503:
              errorMessage = 'Service Unavailable - The server is temporarily unavailable.';
              break;
            default:
              errorMessage = `Unexpected error! Status: ${res.status}`;
          }
        
          throw new Error(errorMessage);
        }
        

        const data = await res.json();

        if (data.data.results.length < 3) {
          setHasMore(false); // No more products
        }

        // Check if data is valid and then append products
        if (data?.data?.results && data.data.results.length > 0) {
          setProducts(prev => append ? [...prev, ...data.data.results] : data.data.results);
        }
      
        if (append) {
          setLoading(true);
        } else {
          setLoading(false);
        }
        

      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(`Error: ${err.message}`);
        } else {
          toast.error('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab, page]);

  // Reset page when tab changes
  


  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeTab]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to fetch more
    }
    handleScroll();
  };

  const goBack = () => {
    if (!loading && page > 1) {
      setPage((prevPage) => prevPage - 1);
      setHasMore(true);
      setLoading(true);
      handleScroll();
    }
  };

  return (
    <section ref={sectionRef} id='otherProducts' >
      <div className='max-w-[1440px] mx-auto overflow-hidden px-6 py-5 lg:px-[3.88rem]'>
        <div className='bg-gradient-to-b from-black via-black to-white mb-5
        text-transparent bg-clip-text uppercase text-4xl md:text-7xl xl:text-[100px] md:text-center w-fit md:mx-auto font-bold'>
          meals
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <p className='md:text-center mt-3 md:mt-10 text-gray-500 font-normal text-lg md:text-xl lg:text-2xl xl:text-3xl mb-7 md:mb-[75px] mx-auto lg:w-[93%]'>
          Javcorp offers a wide range of mouthwatering options, including delicious burgers, 
          steaks, and more. Our dishes are made with the freshest ingredients and are delivered straignt to your door.
        </p>
        {loading ? <ProductSkeleton/>
        :
          <div className=' mt-5 md:mt-20 h-fit'>
            {products[0] && (
                <div className=' grid grid-cols-1 md:grid-cols-2'>
                  <Image 
                  className='mt-5 md:mt-[106px] rounded-4xl' 
                  alt={products[0].name} 
                  width={613.2} 
                  height={409} 
                  layout='responsive'
                  src={'https://res.cloudinary.com/dti5ce0mx/'+products[0].images}
                  />
                  <div className="flex mt-7 flex-col space-y-4 text-black px-8 w-full max-w-lg">
                    {/* Product Title */}
                    <h1 className="text-4xl uppercase text-center md:text-left md:text-6xl font-bold">{products[0].name}</h1>

                    {/* Delivery Info */}
                    <p className="text-lg text-center md:text-left xl:text-[22px] font-semibold">{products[0].short_description}</p>

                    {/* Price */}
                    <p className="text-lg xl:text-[22px] text-center md:text-left font-semibold">
                      ${products[0]?.price ?? '0'}
                    </p>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => handleAddToCart(products[0].id)} 
                      disabled={addingToCart === products[0].id}
                      className={`group mx-auto md:mx-0 flex w-fit items-center justify-center gap-2 px-9 py-2.5 border border-[#A70D13] rounded-full text-black hover:bg-[#A70D13] transition ${
                        addingToCart === products[0].id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="text-lg group-hover:text-white">
                        {addingToCart === products[0].id ? "Adding..." : "Add to cart"}
                      </span>
                      <IoIosArrowDown className="w-5 h-5 text-[#A70D13] group-hover:text-white" />
                    </button>
                  </div>
                </div>
                
            )}
            {products[1] && (
              <>
                <div className='relative z-10'>
                  <div className='absolute w-[350%] md:w-[200%] lg:w-[170%] bottom-0 md:bottom-6 lg:bottom-14 xl:bottom-28 z-10 -left-32 -rotate-12 bg-[var(--color-purple)] text-xs md:text-lg xl:text-[22px] gap-[75.63px] flex items-center py-2.5 text-white border border-dashed border-white'>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:pl-[62px] mt-10 md:mt-0 lg:-mt-10 xl:-mt-20'>
                  
                  <div className="order-2 md:order-1 flex md:mt-20 lg:mt-28 xl:mt-[187px] flex-col space-y-4 text-black px-8 w-full max-w-lg">
                    {/* Product Title */}
                    <h1 className="text-4xl text-center uppercase md:text-left md:text-6xl font-bold">{products[1].name}</h1>

                    {/* Delivery Info */}
                    <p className="text-lg xl:text-[22px] text-center md:text-left font-semibold">{products[1].short_description}</p>

                    {/* Price */}
                    <p className="text-lg xl:text-[22px] text-center md:text-left font-semibold">
                      ${products[1]?.price ?? '0'}
                    </p>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => handleAddToCart(products[1].id)} 
                      disabled={addingToCart === products[1].id}
                      className={`group flex mx-auto md:mx-0 w-fit items-center justify-center gap-2 px-9 py-2.5 border border-[#72BEE8] rounded-full text-black hover:bg-[#72BEE8] transition ${
                        addingToCart === products[1].id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="text-lg group-hover:text-white">
                        {addingToCart === products[1].id ? "Adding..." : "Add to cart"}
                      </span>
                      <IoIosArrowDown className="w-5 h-5 text-[#72BEE8] group-hover:text-white" />
                    </button>
                  </div>
                  <Image 
                  className='mt-8 md:mt-0 z-10 order-1 md:order-2 rounded-4xl' 
                  alt={products[1].name} 
                  width={613.2} 
                  height={409} 
                  layout='responsive'
                  src={'https://res.cloudinary.com/dti5ce0mx/'+products[1].images}
                  />
                </div>
                
              </>
            )}
            {products[2] && (
              <>
                <div className='relative z-10'>
                  <div className='absolute md:w-[200%] lg:w-[170%] z-10 -top-5 md:-top-12 lg:-top-5 xl:top-10 -left-56 -rotate-12 bg-[var(--color-purple)] w-[350%] text-xs md:text-lg xl:text-[22px] gap-[75.63px] flex items-center py-2.5 text-white border border-dashed border-white'>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                    <p>INTERNATIONAL VERSION </p>
                    <GoDotFill className='size-[11px] my-auto'/>
                  </div>
                </div>
                <div className='mt-16 md:mt-20 lg:28 xl:mt-52 grid grid-cols-1 md:grid-cols-2 lg:pl-[129px]'>
                  <Image 
                    className=' z-10 rounded-4xl' 
                    alt={products[2].name} 
                    width={613.2} 
                    height={409} 
                    layout='responsive'
                    src={'https://res.cloudinary.com/dti5ce0mx/'+products[2].images}
                  />
                  <div className="flex mt-8 lg:ml-10 md:mt-0 flex-col space-y-4 text-black px-8 pl-8 w-full max-w-lg">
                    {/* Product Title */}
                    <h1 className="text-4xl text-center uppercase md:text-left md:text-6xl font-bold">{products[2].name}</h1>

                    {/* Delivery Info */}
                    <p className="text-lg xl:text-[22px] text-center md:text-left font-semibold">{products[2].short_description}</p>

                    {/* Price */}
                    <p className="text-lg xl:text-[22px] text-center md:text-left font-semibold">
                      ${products[2]?.price ?? '0'}
                    </p>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => handleAddToCart(products[2].id)} 
                      disabled={addingToCart === products[2].id}
                      className={`group flex mx-auto md:mx-0 w-fit items-center justify-center gap-2 px-9 py-2.5 border border-[#1B9548] rounded-full text-black hover:bg-[#1B9548] transition ${
                        addingToCart === products[2].id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="text-lg group-hover:text-white">
                        {addingToCart === products[2].id ? "Adding..." : "Add to cart"}
                      </span>
                      <IoIosArrowDown className="w-5 h-5 text-[#1B9548] group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
            

            
            
          </div>
        }
        {/* Load more button */}
          
        <div className="flex items-center justify-between text-center py-8 mt-5">
            {page > 1 &&
              <button 
                onClick={goBack}
                disabled={loading}
                className="px-6 py-3 flex items-center gap-2 bg-[var(--color-purple)] group text-white rounded-full hover:opacity-90 transition"
              >
                <IoIosArrowBack className="w-5 h-5 text-white " />
                <span className='hidden md:block'>Prev</span>
              </button>
            }
            {hasMore && (
              <button 
                onClick={loadMore}
                disabled={loading}
                className="self-end flex items-center gap-2 px-6 py-3 bg-[var(--color-purple)] text-white rounded-full hover:opacity-90 transition"
              >
                <span className='hidden md:block'>Next</span>
                <IoIosArrowForward className="w-5 h-5 text-white " />
              </button>
            )}
          </div>
      </div>
    </section>
  )
}

export default OtherProducts

