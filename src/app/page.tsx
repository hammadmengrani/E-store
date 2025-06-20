import Banner from "@/components/common/Banner";
import Categories from "@/components/common/Categories";
import SectionContainer from "@/components/container/SectionContainer";
import Service from "@/components/common/Service";
import Card from "@/components/common/Card";
import { fetchProducts } from "@/graphql/product"; // ✅ API function import
import PopupWrapper from "@/components/container/PopupWrapper";

const imageUrls = ["/banner_1.png", "/banner_2.png", "/banner_3.png"];

export const myCat = [
  { _id: "1", image: "/image 4.png", title: "Smart Watches" },
  { _id: "2", image: "/image 5.png", title: "Airpods" },
  { _id: "3", image: "/image 6.png", title: "Headphones" },
];

const Page = async () => {
  const products = await fetchProducts(); // ✅ API Call in Server Component

  return (
    <div>
      <PopupWrapper/>
      <Banner images={imageUrls} />
      <SectionContainer
        className="container py-10 w-full mx-auto"
        childClassName="md:overflow-hidden overflow-x-auto w-full"
        title="FEATURED CATEGORIES"
        desc="Elevate your tech game with our premium AirPods, delivering superior sound and seamless connectivity, and our stylish smartwatches, packed with advanced health tracking and intuitive smart features."
      >
        <Categories categories={myCat} />
      </SectionContainer>
      <SectionContainer className="container py-5 w-full mx-auto" title="Trending Product">
        <Card slice={true} card={products} className="grid grid-cols-2 overflow-hidden sm:grid-cols-2 md:grid-cols-4 gap-4 p-5"  /> {/* ✅ Passing Data as Props */}
      </SectionContainer>
      <SectionContainer className="container py-5 w-full mx-auto" childClassName="flex items-center justify-center">
        <Service />
      </SectionContainer>
    </div>
  );
};

export default Page;
