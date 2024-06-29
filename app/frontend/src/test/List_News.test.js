import React from 'react';
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import {List} from '../components/List_News';
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom'
var history;
const mockDataHome = 
  {
    category: 'Tech',
    title: 'New Tech Trends',
    imgPath: './public/images/tech.jpg',
    resume: 'A quick summary of tech trends.',
    id: '1',
    imgName: 'Tech Image'
  }
;

const mockDataOther = 
  {
    category: 'World',
    title: 'Global News',
    imgPath: './public/images/world.jpg',
    content: 'A quick summary of global news.',
    id: '2',
    imgName: 'World Image'
  }


describe('List Component', () => {
    beforeAll(()=>{
         history = createMemoryHistory();
    })
    it('should render Home type news correctly', () => {
        render(
            <Router location={history.location} navigator={history}>
            <List typeNews="Home" datas={[mockDataHome]} />
        </Router>
        );
        const HomeList = screen.queryByTestId("list_home")
        const OneNewsList = screen.queryByTestId("itens_news")
        const HomeImg = screen.queryByTestId("home_img")
        const HomeContent = screen.queryByTestId("home_content")
        expect(HomeList).toBeInTheDocument()
        expect(OneNewsList).not.toBeInTheDocument()
        expect(HomeImg.querySelector('a').href.split('localhost')[1]).toEqual(`/news/pages/${mockDataHome.id}`)
        expect(HomeContent.querySelector('a').href.split('localhost')[1]).toEqual(`/news/pages/${mockDataHome.id}`)
        expect(HomeContent.querySelector('a').textContent).toEqual(mockDataHome.resume)
        
    });

    it('should render Other type news correctly', () => {
        render(
            <Router location={history.location} navigator={history}>
            <List typeNews="Other" datas={[mockDataOther]} />
        </Router>
        );
        const HomeList = screen.queryByTestId("list_home")
        const OneNewsList = screen.queryByTestId("itens_news")
        const OneNewsTitle = screen.queryByTestId("title_news")
        const OneNewsContent = screen.queryByTestId("content_news")

        expect(HomeList).not.toBeInTheDocument()
        expect(OneNewsList).toBeInTheDocument()
        expect(OneNewsTitle.querySelector('h1').textContent).toEqual(mockDataOther.title)
        expect(OneNewsContent.querySelector('p').textContent).toEqual(mockDataOther.content)
    });
});
