import { Card } from "@/types/card";
import { Card as VKCard, Div, Paragraph, Title, Tappable } from "@vkontakte/vkui";
import styles from "./Cards.module.css";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface CardsProps {
    cards: Card[];
}

const Cards = ({ cards }: CardsProps) => {
    const navigation = useRouteNavigator();

    return (
        <Div className={styles.cards}>
            {cards.map((card, index: number) => {
                const dateNews = new Date(card.time * 1000).toLocaleString("ru");
                const PATH = `/news/${card.id}`;

                return (
                    <Tappable
                        key={card.id}
                        onClick={() => navigation.push(PATH, { state: { ...card } })}>
                        <VKCard className={styles.card}>
                            <Title level="3" weight="2" className={styles.title}>{index + 1}. {card.title}</Title>
                            <Paragraph weight="1" className={styles.author}>Author: {card.by}</Paragraph>
                            <Div className={styles.cardFooter}>
                                <Paragraph weight="1" className={styles.date}>{dateNews}</Paragraph>
                                <Paragraph weight="1" className={styles.rating}>⭐{card.score}</Paragraph>
                            </Div>
                        </VKCard>
                    </Tappable>
                )
            })}
        </Div>
    )
};

export default Cards;