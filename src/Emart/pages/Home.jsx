import "../../assets/css/home.css";
import Category from "../components/Category";
import HeroSection from "../components/HeroSection";
import HomePageProductCard from "../components/HomePageProductCard";
import Layout from "../components/Layout";
import Testimonial from "../components/Testimonial";
import Track from "../components/Track";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection />
        <Category />
        <HomePageProductCard />
        <Track />
        <Testimonial />
      </Layout>
    </>
  );
};

export default Home;
