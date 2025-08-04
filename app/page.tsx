import Image from 'next/image'
import Header from './ui/shared/header'
import NewArrivals from './components/new-arrivals'
import Discounts from './components/discounts'

export default function Home() {
  return (
    <>
      <NewArrivals />
      <Discounts />
    </>
  )
}
