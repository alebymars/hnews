import { FC, useEffect, useState, useCallback } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  NavIdProps,
  ScreenSpinner,
  Div,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import Cards from '@components/Cards';
import { Icon28RefreshOutline } from '@vkontakte/icons';
import { getItem } from '@/utils/getItem';
import { getAllNewStories } from '@/utils/getAllNewStories';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { setNews } from '@/store/slices/rootSlice';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.root.news);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (!news.length) {
        setLoading(true);
      }

      const data = await getAllNewStories();
      const allNews = await Promise.all(data.map(async (id: number) => await getItem(id)));
      const filteredNull = allNews.filter((item) => item !== null);
      dispatch(setNews(filteredNull));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [news.length, dispatch]);

  useEffect(() => {
    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Group
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 0,
        }}
        header={
          <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
            <Header mode="secondary">Новости</Header>
            <Button mode="tertiary" before={<Icon28RefreshOutline />} onClick={() => {
              dispatch(setNews([]));
              fetchData();
            }}>
              Обновить
            </Button>
          </Div>
        }
      >
        {!loading ? (
          <Cards cards={news} />
        ) : (
          <ScreenSpinner size="large" />
        )}
      </Group>
    </Panel>
  );
};