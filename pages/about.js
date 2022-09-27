import Image from 'next/image'
import PageLayout from '../components/PageLayout'
import Link from 'next/link'
import styles from '../styles/about.module.css'

export default function Home({ props }) {
    return (
        <PageLayout title='NewsApp - About'>
            <div className={styles.container}>
                <h2 className={styles.title}>{props.login}</h2>
                <p className={styles.link}>
                    {props.name} <Link href={props.html_url}>ir al perfil...</Link>
                </p>
                <Image
                className={styles.image}
                    src={`/api/imageproxy?url=${encodeURIComponent(props.avatar_url)}`}
                    alt={`image for the gitHub ${props.login}`}
                    width={'600px'}
                    height={'350px'}
                    layout='responsive'
                />
            </div>
        </PageLayout>
    )
}

export async function getStaticProps() {
    const response = await fetch('https://api.github.com/users/TobiasGonzalezz')

    const props = await response.json()

    return {
        props: {
            props
        }
    }
}