import Banner from '@/components/common/Banner'
import Card from '@/components/common/Card';
import Categories from '@/components/common/Categories';
import SectionContainer from '@/components/container/SectionContainer';
import React from 'react'
import { myData } from '../../data';
import Service from '@/components/common/Service';

const imageUrls = [
  '/banner_1.png',
  '/banner_2.png',
  '/banner_3.png',
  
];

export const myCat = [
  {
    _id:"1",
    image:"/image 4.png",
    title:"Smart Watches"
  },
  {
    _id:"2",
    image:"/image 5.png",
    title:"Airpods"
  },
  {
    _id:"3",
    image:"/image 6.png",
    title:"Headphones"
  },
]

const page = () => {
  return (
    <div>
      <Banner images={imageUrls}/>
      <SectionContainer className='container py-10 w-full mx-auto' childClassName='md:overflow-hidden overflow-x-auto w-full'   title='FEATURED CATEGORIES' desc='Elevate your tech game with our premium AirPods, delivering superior sound and seamless connectivity, and our stylish smartwatches, packed with advanced health tracking and intuitive smart features.'>
        <Categories categories={myCat}/>
      </SectionContainer>
      <SectionContainer className='container py-5 w-full mx-auto' title='Trending Product'>
        <Card card={myData}/>
      </SectionContainer>
      <SectionContainer className='container py-5 w-full mx-auto' childClassName='flex items-center justify-center'>
        <Service/>
      </SectionContainer>
    </div>
  )
}

export default page