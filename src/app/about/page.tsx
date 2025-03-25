import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center  px-6">
      <div className="max-w-4xl w-full  p-8 text-center mx-auto">
        {/* Website Image */}
        <img 
          src="/estore-banner.jpg" 
          alt="Estore Banner" 
          className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
        />

        {/* About Section */}
        <h1 className="text-4xl font-bold text-gray-800 mt-6">Welcome to Estore</h1>
        <p className="mt-3 text-gray-600">
          Your ultimate destination for premium gadgets, accessories, and lifestyle products at unbeatable prices.
        </p>

        {/* Our Mission */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">🌟 Our Mission</h2>
          <p className="mt-2 text-gray-600">
            At Estore, we aim to bring the latest and most innovative products to our customers. Our goal is to make online shopping effortless, enjoyable, and affordable. 
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">🔥 Why Choose Estore?</h2>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>🚀 **Latest Trends** – Stay ahead with cutting-edge gadgets and accessories.</li>
            <li>💰 **Affordable Prices** – Best deals and discounts on top-quality products.</li>
            <li>🚚 **Fast & Secure Delivery** – We ensure your orders reach you on time.</li>
            <li>📞 **24/7 Customer Support** – Our team is always here to assist you.</li>
          </ul>
        </div>

        {/* Our Product Categories */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">🛍️ Explore Our Categories</h2>
          <p className="mt-2 text-gray-600">
            We offer a wide range of products, including:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>🎧 Earbuds & Headphones</li>
            <li>⌚ Smart Watches & Fitness Bands</li>
            <li>📱 Mobile Accessories</li>
            <li>💻 Tech Gadgets & More</li>
          </ul>
        </div>

        {/* Customer Satisfaction */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">😊 Customer Satisfaction</h2>
          <p className="mt-2 text-gray-600">
            Your trust is our priority. We focus on providing top-notch service, ensuring that each customer has a seamless shopping experience with us.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">🛒 Start Shopping Today!</h2>
          <p className="mt-2 text-gray-600">
            Browse our collection and find the perfect products for your lifestyle. Happy shopping at Estore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
