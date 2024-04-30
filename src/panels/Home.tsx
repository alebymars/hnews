import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Cards from '@components/Cards';
import { Icon28RefreshOutline } from '@vkontakte/icons';
import { Card } from '@/types/card';
import { getAllNewStories } from '@/utils/getAllNewStories';
import { getItem } from '@/utils/getItem';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllNewStories();
        const allNews = await Promise.all(data.map(async (id: number) => await getItem(id)));
        setCards(allNews);
      } catch (error) {
        if (error) {
          console.error(error);
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Group header={<Header mode="secondary">VK (Авторизоваться на Hacker News?)</Header>}>
        <Cell before={<Avatar src="https://www.onlinetambov.ru/upload/iblock/ab9/2gls6o6oh99zrcvo27928lrn6ektvqa3.jpg" />} subtitle="Moscow">
          Ivanov Ivan
        </Cell>
      </Group>

      <Group header={
        <Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", paddingRight: 10 }}>
          <Header mode="secondary">Новости</Header>
          <Button mode="tertiary" before={<Icon28RefreshOutline />} onClick={() => console.log("refresh")} />
        </Group>
      }>
        <Cards cards={cards} />
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('news/1')}>
            Покажите Новости, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

