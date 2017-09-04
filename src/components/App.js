// 1 导入 react
import React from 'react'

// 2 导入 antd 的组件
// Layout 布局组件
// Menu   菜单组件
// Breadcrumb 面包屑导航组件
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

// 导入 自定义样式
import '../css/app.css'

// 3 导入 路由组件
import {
  // BrowserRouter as Router,
  HashRouter as Router,     // 路由组件的容器，包裹整个组件树
  Route,                    // 路由的出口（路由内容展示的位置）
  Link                      // 相当于ng中的a标签，点击实现路由跳转
} from 'react-router-dom'

// 4 导入 三个组件
import HomeContainer from './Home/Home'
import MovieContainer from './Movie/Movie'
import AboutContainer from './About/About'

export default class MovieApp extends React.Component {
  constructor(props) {
    super(props)
    
    // 让菜单选中的思路说明：
    // 1 获取到location.hash，每一个菜单的hash值是唯一的
    // 2 将每个菜单的key设置为菜单的hash值
    // 3 在 constructor中通过location获取到hash值，并截取除（#）外的内容
    // 4 将获取到的字符串设置state
    // 5 在Menu组件的 defaultSelectedKeys 中使用设置的state
    console.log(location.hash.substr(1) + '...............');
    
    this.state = {
      selectedMenu: location.hash.substr(1)
    }
  }
  
  
  render() {
    return (
      <Router>
        
        <Layout className="layout">
          <Header>
            <div className="logo" />
            {/* 处理菜单默认选中哪一个 */}
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.state.selectedMenu]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="/"><Link to="/">首页</Link></Menu.Item>
              <Menu.Item key="/movie/in_theaters"><Link to="/movie/in_theaters">电影</Link></Menu.Item>
              <Menu.Item key="/about"><Link to="/about">关于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div style={{ background: '#fff', minHeight: 280 }}>
              {/* 路由内容的展示位置 */}
              {/* exact 属性用于指定路由使用 完全匹配，也就是 Link中to属性的值与 path的值完全相同才匹配 */}
              <Route path="/" exact component={ HomeContainer }></Route>
              <Route path="/movie" component={ MovieContainer }></Route>
              <Route path="/about" component={ AboutContainer }></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2017
          </Footer>
        </Layout>
      
      </Router>
    )
  }
}
