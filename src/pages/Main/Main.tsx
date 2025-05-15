import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner.tsx";
import { useEffect, useState } from "react";
import { getNews } from "../../api/apiNews.ts";
import NewsList from "../../components/NewsList/NewsList.tsx";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";

interface NewsItem {
    id: string;
    title: string;
    image: string;
    // добавь остальные поля, если есть
}

const Main = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const response = await getNews(currentPage, pageSize);
            setNews(response.news);
        } catch (error) {
            console.error("Ошибка при получении новостей:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handlePageClick = (pageNumber: any) => {
            setCurrentPage(pageNumber);
    }
    return (
        <main className={styles.main}>
            {!isLoading && news.length > 0 ? (
                <NewsBanner item={news[0]} />
            ) : (
                <Skeleton count={1} type="banner" />
            )}
            <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageClick={handlePageClick} totalPages={totalPages} currentPage={currentPage} />
            {!isLoading ? (
                <NewsList news={news} />
            ) : (
                <Skeleton type="item" count={10} />
            )}
            <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageClick={handlePageClick} totalPages={totalPages} currentPage={currentPage} />
        </main>
    );
};

export default Main;
