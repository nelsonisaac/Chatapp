import React from 'react';
import Segment from './Segment';

const data = [
  { id: 1, fname: 'nelson', place: 'hyd' },
  { id: 2, fname: 'isaac', place: 'ksa' },
  { id: 3, fname: 'DNI', place: 'bah' },
  { id: 4, fname: 'what', place: 'dubai' },
  { id: 5, fname: 'ever', place: 'philippines' },
];

const ListSegment = () => {
  return (
    <div className="ListSegment">
      {data.map((item) => (
        <Segment key={item.id} fname={item.place} place={item.place} />
      ))}
    </div>
  );
};

export default ListSegment;
