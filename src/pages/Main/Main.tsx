
import styles from "./styles.module.css"
import NewsBanner from "../../components/NewsBanner/NewsBanner.tsx";
import {useEffect, useState} from "react";
import {getNews} from "../../api/apiNews.ts";
import NewsList from "../../components/NewsList/NewsList.tsx";

const Main = () => {
const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async() => {
            try {
                const response = await getNews();
                console.log("response", response);
               setNews(response.news);
            }
            catch (error){
                console.error(error);
            }
        }
        fetchNews();
    },[])
    return (
        <main className={styles.main}>
            {news.length > 0 ? <NewsBanner item={news[0]} /> : null}

        <NewsList news={news} />
        </main>
    );
};

export default Main;