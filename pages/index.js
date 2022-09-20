import styles from '../styles/Home.module.css'
import Image from 'next/image'
import PageLayout from '../components/PageLayout'
import Link from 'next/link'

export default function Home({ articles }) {
  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos articulos</p>}
        {articles.length > 0 && articles.map((articles, index) => (
          <div key={index}>
            <h2 className={styles.h2}>{articles.title}</h2>
            <Image
            className={styles.image}
            src={`/api/imageproxy?url=${encodeURIComponent(articles.urlToImage)}`}
            alt={`image for the articles ${articles.title}`} 
            width={'450px'}
            height={'300px'}
            layout='responsive'
            property={index < 2}
            />
            <p>
              {articles.description} <Link href={articles.url}>seguir leyendo...</Link>
            </p>

          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=7f9cc0212a914e08aeb001980d97b781')
  const { articles } = await response.json()

  return {
    props: {
      articles
    }
  }
}