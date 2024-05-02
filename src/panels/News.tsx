import { FC, useCallback, useEffect, useState } from 'react';
import { Accordion, Avatar, Button, Card, Div, NavIdProps, Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, Snackbar, Text, Title } from '@vkontakte/vkui';
import { useMetaParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getItem } from '@/utils/getItem';
import { formatTime } from '@/utils/formatTime';
import { Icon16Done, Icon24Copy, Icon28RefreshOutline } from '@vkontakte/icons';
import { Comment, News as NewsI } from '@/store/types';

type CommentsProps = { id: number };

const Comments = ({ id }: CommentsProps) => {
    const [comment, setComment] = useState<Comment | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const fetchedComment = await getItem(id);
            setComment(fetchedComment);
        } catch (error) {
            console.error(error);
        }
    }, [id]);


    useEffect(() => {
        fetchData();
    }, [id, fetchData]);

    return comment ? (
        <Card mode="shadow" style={{ padding: 10, marginLeft: 15, height: '100%', marginBottom: 10 }}>
            <Accordion key={comment.id}>
                <Accordion.Summary open iconPosition='after'>{comment.text}</Accordion.Summary>
                <Accordion.Content style={{ overflow: 'auto', height: '100%' }}>
                    <Card style={{ gap: 10, display: 'flex', flexDirection: 'column', padding: 10 }}>
                        <Text weight='2'>{comment.text}</Text>
                        <Text weight='1'>Автор: {comment.by}</Text>
                        <Text weight='1'>Дата и время: {formatTime(comment.time)}</Text>
                        {comment.kids?.map((id) => (
                            <Comments key={id} id={id} />
                        ))}
                    </Card>
                </Accordion.Content>
            </Accordion>
        </Card>
    ) : null;
};

type NewsProps = NavIdProps;

export const News: FC<NewsProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const params = useMetaParams<NewsI>();

    const [comments, setComments] = useState<Comment[]>([]);
    const [snackbar, setSnackbar] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const data = params?.kids;
            if (!data) return;

            const allComments = await Promise.all(data.map(getItem));
            setComments(allComments.filter((comment) => comment !== null));
        } catch (error) {
            console.error(error);
        }
    }, [params?.kids]);


    useEffect(() => {
        fetchData();
    }, [params?.kids, fetchData]);

    const handleRefresh = () => {
        setComments([]);
        fetchData();
    };

    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                News
            </PanelHeader>
            <Card mode="shadow" style={{ padding: 10, margin: 10, display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
                <Title weight='1'>{params?.title} </Title>
                <Div style={{ display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'space-between' }}>
                    <Text weight='1'>Автор: {params?.by}</Text>
                    <Text weight='1'>{formatTime(params?.time)}</Text>
                </Div>
                <Button mode='primary' size='m' before={<Icon24Copy />} onClick={() => {
                    if (params?.url) {
                        navigator.clipboard.writeText(params?.url);
                        setSnackbar(true);
                    }
                }}>{params?.url}</Button>
            </Card>

            <Div style={{ gap: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Div style={{ gap: 10, display: 'flex', flexDirection: 'row', padding: 0, justifyContent: "space-between" }}>
                    <Title>Комментарии ({params?.descendants})</Title>
                    <Button mode="tertiary" size="s" stretched={false} onClick={handleRefresh} before={<Icon28RefreshOutline />}>Обновить</Button>
                </Div>
                {params?.descendants && params.descendants > 0 ? (
                    comments.map((comment) => {
                        if (comment.deleted) return null;
                        return (
                            <Card
                                key={comment.id}
                                style={{ gap: 10, display: 'flex', flexDirection: 'column', padding: 10, height: '100%' }}
                                mode='shadow'
                            >
                                <Text weight='2'>{comment.text}</Text>
                                <Text weight='1'>Автор: {comment.by}</Text>
                                <Text weight='1'>Дата и время: {formatTime(comment.time)}</Text>
                                {comment.kids?.map((id) => (
                                    <Comments key={id} id={id} />
                                ))}
                            </Card>
                        );
                    })
                ) : params?.descendants !== 0 ? (
                    <ScreenSpinner size="large" />
                ) : (
                    <Text weight='1' style={{ textAlign: 'center' }}>Нет комментариев</Text>
                )}
            </Div>
            {snackbar && (
                <Snackbar
                    onClose={() => setSnackbar(false)}
                    before={
                        <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
                            <Icon16Done fill="#fff" width={14} height={14} />
                        </Avatar>
                    }
                >
                    Ссылка скопирована
                </Snackbar>
            )}
        </Panel>
    );
};


