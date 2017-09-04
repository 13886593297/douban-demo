import React from 'react'
// 导入 antd 组件
import {Card, Rate, Spin, Alert, Pagination} from 'antd'
// 导入自定义样式
import '../../css/movielist.css'
// 导入 fetchJsonp
import fetchJsonp from 'fetch-jsonp'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 电影类型
      movieType: props.match.params.movieType,
      // 加载中
      isLoading: true,
      // 获取数据失败
      isError: false,
      // 获取的电影数据（总条数、当前页、电影列表数据）
      movieData: {}
    }
  }
  
  componentWillMount() {
    // 获取数据
    this.fetchMovieList(this.state.movieType)
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: true,
      // 此处，需要重新设置电影类型，否则，获取的电影类型还是上一次的电影类型
      movieType: nextProps.match.params.movieType
    })
    
    const {movieType, page} = nextProps.match.params
    
    // 获取数据
    this.fetchMovieList(movieType, page)
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading..." style={{width: '100%'}}>
          <Alert
            message="提示"
            description="电影正在疯狂地加载中，请稍后..."
            type="info"
          />
        </Spin>
      )
    } else if (this.state.isError) {
      return <Alert message="数据加载失败，请稍后再试" type="error"/>
    }
    
    // console.log(this.state.movieData.total)
    // 数据加载完成，展示电影列表数据
    return (
      <div>
        {/* 电影列表 */}
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {this.renderList()}
        </div>
        
        {/* 分页 */}
        <Pagination
          total={this.state.movieData.total}
          defaultCurrent={this.props.match.params.page - 0 || 1}
          defaultPageSize={6}
          onChange={(page, pageSize) => {
            {/* console.log(this.state.movieType, page, pageSize); */
            }
            // 实现路由跳转（作用：类似于鼠标点击 a 链接，实现URL中hash值的跳转）
            this.props.history.push(`/movie/${this.state.movieType}/${page}`)
          }}/>
      </div>
    )
  }
  
  fetchMovieList(movieType, page = 1, pageSize = 6) {
    const start = (page - 1) * pageSize
    const FETCH_MOVIE_LIST_URL = `https://api.douban.com/v2/movie/${movieType}?start=${start}&count=${pageSize}`
    
    fetchJsonp(FETCH_MOVIE_LIST_URL)
      .then(data => data.json())
      .then(rep => {
        this.setState({
          movieData: rep,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          isError: true
        })
      })
  }
  
  // 根据 state 中的数据，渲染电影列表
  renderList() {
    const movieList = this.state.movieData.subjects
    
    return movieList.map(value => (
      <Card key={value.id} style={{width: 200, padding: 10, textAlign: 'center', margin: 10}} bodyStyle={{padding: 0}}
            onClick={() => {
              this.props.history.push(`/movie/movieDetial/${value.id}`)
            }}>
        <div className="custom-image">
          <img alt="example" src={value.images.medium}/>
        </div>
        <div className="custom-card">
          <h3>{value.title}</h3>
          <p>电影类型：{value.genres.join(',')}</p>
          <p>上映年份：{value.year}</p>
          <Rate disabled defaultValue={value.rating.average / 2}/>
        </div>
      </Card>)
    )
  }
  
}
