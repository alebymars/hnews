import { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Home, News } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { store } from './store';

const persistor = persistStore(store);

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SplitLayout popout={null}>
          <SplitCol>
            <View activePanel={activePanel}>
              <Home id="home" fetchedUser={fetchedUser} />
              <News id='news/:id' />
            </View>
          </SplitCol>
        </SplitLayout>
      </PersistGate>
    </Provider>
  );
};
