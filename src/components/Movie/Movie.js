import React from 'react';

import {Layout, Menu, Icon} from 'antd';
const {Content, Sider} = Layout;

// 引入 自定义样式
import '../../css/movie.css'

import {
  Route,                    // 路由的出口（路由内容展示的位置）
  Link                      // 相当于ng中的a标签，点击实现路由跳转
} from 'react-router-dom'

// 导入电影列表组件
import MovieList from './MovieList'
import MovieDetial from './MovieDetial'

export default class MovieContainer extends React.Component {
  render() {
    return (
      <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}
            >
              <Menu.Item key="1"><Link to="/movie/in_theaters">正在热映</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movie/coming_soon">即将上映</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/movie/top250">top250</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              {/*
                : 表示路由参数，通过路由参数，可以匹配到 符合这种规则的 多个具体的路由
  
                /movie/:movieType 路由规则，能够匹配：
                '/movie/in_theaters'
                '/movie/coming_soon'
                '/movie/top250'
              */}
              <Route exact path="/movie/:movieType/:page?" component={ MovieList }></Route>
              <Route path="/movie/movieDetial/:id" component={ MovieDetial }></Route>
            </Content>
        </Layout>
      </Layout>
    )
  }
}