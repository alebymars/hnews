import { FC } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useParams, useRouteNavigator, useSearchParams } from '@vkontakte/vk-mini-apps-router';

export const News: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const newsId = useParams();
    // const [par, setPar] = useSearchParams();

    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                News
            </PanelHeader>
            <Placeholder>News {newsId?.id} </Placeholder>
            {/* <Placeholder>Search Params: {par.get("test")} </Placeholder> */}
        </Panel>
    );
};
