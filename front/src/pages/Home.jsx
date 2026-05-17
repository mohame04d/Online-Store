import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Categories'
import Offer from '../components/Offer'
import Footer from '../components/Footer'
import { Section } from 'lucide-react'
const Home = () => {
  return (
    <div>
      {/* home */}
      <section id='home'>
        <Hero/>
      </section>

      {/* features */}
      <section id='features'>
        <Features/>
      </section>

      {/* categories */}
      <section id="categories">
        <Categories/>
      </section>

      {/* offer */}
      <section id='shop'>
        <Offer/>
      </section>

      { /*footer*/ }
      <section id='contact'>
        <Footer/>
      </section>
      
    </div>
  )
}

export default Home
