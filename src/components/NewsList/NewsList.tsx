import NewsItem from "../NewsItem/NewsItem";
import styles from "./styles.module.css";


// @ts-ignore
const NewsList = ({ news }) => {
    // if (!news.length) {
    //     return <p className={styles.empty}>Don't have news</p>;
    // }

    return (
        <ul className={styles.list}>
            {news.map((item: any) => {
                return <NewsItem key={item.id} item={item} />
            })}
        </ul>
    );
};

export default NewsList;
