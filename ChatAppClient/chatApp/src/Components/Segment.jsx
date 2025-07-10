import React from 'react';
import { Card, Typography, Avatar } from 'antd';
import '../styles.css';

const { Title, Text } = Typography;

const Segment = ({ fname, place }) => {
  return (
    <div className="Segment" style={{ display: 'block', width: '100%' }}>
      <Card hoverable>
        <div className="container" style={{ display: 'flex', width: '100%' }}>
          <div className="Imagebox">
            {<Avatar style={{ alignItems: 'center' }}>{<img />}</Avatar>}
          </div>
          <div className="Titlebox">
            <Title level={5} style={{ margin: 'auto' }}>
              {fname}
            </Title>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Segment;
