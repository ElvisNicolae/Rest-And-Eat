import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MenuPage from "./components/MenuPage/MenuPage";
import ReservationPage from "./components/ReservationPage/ReservationPage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://restandeat.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');  

  return {
    headers: {
      ...headers,
      Authorization: `Bearer 0dbd86e626e621157d22763fe18aeb7343e95d41eff75dfe3b2b75e45c85f9592bf885ba3f5897c3a0222281f3403bf978a903cb3b5d933a4c77787117d1d215281b20fc309e6892a093af400d8ad50b247f6fb5ee1ccb26c7f81506125736a731b0b090c58c3231877a2cec9b39186e0131ce6ce1857fd8e131b54d9709eee0`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/menu" element={<MenuPage />}></Route>
          <Route path="/reservation" element={<ReservationPage />}></Route>
        </Routes>
        <Footer />
      </ApolloProvider>
   </BrowserRouter>
  );
}

export default App;
