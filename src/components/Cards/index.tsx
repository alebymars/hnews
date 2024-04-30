import { Card } from "@/types/card";
import { Card as VKCard, Div, Paragraph, Title, Group, Text } from "@vkontakte/vkui";
import styles from "./Cards.module.css";
import { RouterLink } from "@vkontakte/vk-mini-apps-router";

interface CardsProps {
    cards: Card[];
}

const Cards = ({ cards }: CardsProps) => {
    return (
        <Div className={styles.cards}>
            {cards.map((card) =>
                <RouterLink to={`/news/${card.id}`} key={card.id}>
                    <VKCard className={styles.card}>
                        <Title level="3" weight="2" className={styles.title}>{card.title}</Title>
                        <Paragraph weight="1" className={styles.author}>Author: {card.by}</Paragraph>
                        <Group className={styles.cardFooter}>
                            <Paragraph weight="1" className={styles.date}>{card.time}</Paragraph>
                            <Paragraph weight="1" className={styles.rating}>⭐{card.score}</Paragraph>
                        </Group>
                    </VKCard>
                </RouterLink>
            )}
        </Div>
    )
};

export default Cards;