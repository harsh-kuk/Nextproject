import Link from "next/link"
import classes from "./page.module.css"
import { getmeals } from "@/lib/meals"
import Mealgrid from "@/meal-grid"
import { Suspense } from "react"

export const metadata = {
    title: 'All meals',
    description: 'Browse all delicious meals by our vibrant community.',
  };
async function Meals(){
    const meals= await getmeals()
   return <Mealgrid meals={meals}/>

}

export default  function meals(){
    return(<> 
        <header  className={classes.header}>
            <h1>Delicious food serve here{``}<span className={classes.highlight}>by you </span></h1>
            <p>choose your favourite recipe and cook it when you want</p>
            <p className={classes.cta}>
                <Link href="/meals/share">share your favourite meals</Link>
            </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<p  className={classes.loading}>
            Loading Meals...</p>}>
            <Meals/>
            </Suspense>
        </main>
        </>
    )
}