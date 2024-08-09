import React from 'react';

export interface myCat {
    _id: string;
    image: string;
    title: string;
}

export interface myCategories {
    categories: myCat[];
}

const Categories = (props: myCategories) => {
    return (
        <div className='w-full overflow-x-auto py-2'>
            <div className='flex items-center md:justify-center md:px-0 px-5 gap-3'>
                {props.categories.map((item, key) => (
                    <div
                        key={key}
                        className='min-w-[386px] h-[329px] flex-shrink-0 flex items-center justify-center'
                        style={{
                            background: 'radial-gradient(circle, #059DDE 46%, #0077AB 100%)' // Radial gradient
                        }}
                    >
                        <div className='flex flex-col gap-5 justify-center items-center'>
                            <img src={item.image} alt={item.title} /> {/* Added meaningful alt text */}
                            <h3 className='mt-2 text-white text-[18px]'>{item.title}</h3> {/* Optional styling for better visibility */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
