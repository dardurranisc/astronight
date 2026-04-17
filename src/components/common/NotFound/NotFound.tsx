import { useRouter } from "next/router"

import Background from "../Background"
import Section from "../Section"
import Container from "../Container"
import Button from "../Button"

import styles from "./NotFound.module.scss"


const NotFound = () => {
    const router = useRouter()

    const handleBack = () => {
        if(window.history.length > 1){
            router.back()
        }else{
            router.push('/');
        }
    }

    return(
        <>
            <Background
                src="/images/404/background.png"
                alt="background"
                fill
                priority
                opacity={0.2}
            />
            <Section>
                <Container variant="secondary">   
                    <div className={styles.block}>
                        <h1>There{"'"}s nothing there...</h1>
                        <span className={styles.span}>404</span>
                        <Button
                            text=".go back."
                            onClick={() => handleBack()}
                        />
                    </div>
                </Container>
            </Section>
        </>
    )
}

export default NotFound