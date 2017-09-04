import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
// 导入 fetchJsonp
import fetchJsonp from 'fetch-jsonp'

export default class MovieDetial extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: {}
    }
  }

  componentWillMount() {
    fetchJsonp(`https://api.douban.com/v2/movie/subject/${this.props.match.params.id}`)
      .then(function(data) {
        return data.json()
      })
      .then(rep => {
        
        this.setState({
          detail: rep
        })
      })
  }

  render() {
    console.log(this.state.detail)
    const detail = this.state.detail
    if( this.state.detail.title ) {
      return (
        <div>
          <Button type="primary" onClick={ () => { this.props.history.goBack() } }>
            <Icon type="left" />返回电影列表
          </Button>

          <Row>
            {/* span 表示占了 12格， offset 表示偏移6格 */}
            <Col span={12} offset={6}>
              <h1 style={{ textAlign: 'center' }}>{ detail.title }</h1>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6} style={{ textAlign: 'center' }}>
              <img src={detail.images.large} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p>主要演员：</p>
              <div style={{display: 'flex', flexWrap: 'wrap', textAlign: 'center'}}>
                {
                  detail.casts.map( (value, index) => {
                    return (
                      <div key={index} style={{ margin: 10 }}>
                        <img src={value.avatars.small} />
                        <p>{value.name}</p>
                      </div>
                    )
                  } )
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p>剧情介绍：</p>
              <p style={{ textIndent: '2em'}}>{ detail.summary }</p>
            </Col>
          </Row>
        </div>
      )
    }
    
    return <div>数据加载中..</div>
  }
}