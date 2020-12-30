import React from 'react';
import { List,  Row, Col } from 'antd';
const Item = (props) => {

  return (
    <div>
      {
        <List.Item style={{ margin: 'auto' }}>
          {''}
          <Row gutter={10}>
            <Col className="gutter-row" span={5}>
              <div>{props.datass[props.count].name} </div>
              </Col>
              <Col className="gutter-row" span={10}>
              <div >{props.datass[props.count].address}</div>
              </Col>
              <Col className="gutter-row" span={8}>
              <div >{props.datass[props.count].menu}</div>
            </Col>
          </Row>
        </List.Item>
      }
    </div>
  );
};

export default Item;
