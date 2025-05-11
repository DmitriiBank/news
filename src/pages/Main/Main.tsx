
import styles from "./styles.module.css"
import NewsBanner from "../../components/NewsBanner/NewsBanner.tsx";
import {useEffect, useState} from "react";
import {getNews} from "../../api/apiNews.ts";
import NewsList from "../../components/NewsList/NewsList.tsx";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";

const Main = () => {
const [news, setNews] = useState([]);
const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async() => {
            try {
                setIsLoading(true);
                const response = await getNews();
                console.log("response", response);
               setNews(response.news);
               setIsLoading(false);
            }
            catch (error){
                console.error(error);
            }
        }
        fetchNews();
    },[])

    return (
        <main className={styles.main}>
            {news.length > 0 && !isloading ? (<NewsBanner item={news[0]} /> ): (<Skeleton count={1} type={'banner'} />)}
            {!isloading ? <NewsList news={news} /> : <Skeleton type={'item'} count={10}/>}
        <NewsList news={news} />
        </main>
    );
};

export default Main;