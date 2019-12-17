import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import {getReputation, getDistanceFromCurrentLocation} from '../utils/index';

const Information = styled.div`
  margin: 1rem;
  border-bottom: 1px solid #ccc;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Saint = styled.div`
  color: Lime;
`;
const GoodPerson = styled.div`
  color: LightSkyBlue;
`;
const NormalPerson = styled.div`
  color: SandyBrown;
`;
const Jerk = styled.div`
  color: red;
`;
const SellerInfo = ({seller, location}) => {
  const [name, setName] = useState('');
  const [reputation, setReputation] = useState(5);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setName(seller && seller.name);
    setReputation(
      seller && getReputation(seller.reputation, seller.numberOfRater),
    );
    getDistanceFromCurrentLocation(location)
      .then((distance) => {
        setDistance(distance);
      })
      .catch((err) => {
        alert(err);
      });
  }, [seller, location]);

  const resultOfReputation = (reputation) => {
    if (reputation === 10) {
      return <Saint>성인군자에요!!</Saint>;
    } else if (reputation >= 7) {
      return <GoodPerson>좋은사람 이네요</GoodPerson>;
    } else if (reputation >= 4) {
      return <NormalPerson>믿어 줘 봐도...?</NormalPerson>;
    } else if (reputation < 4) {
      return <Jerk>인성 무엇....</Jerk>;
    }
    return null;
  };

  const emoticon = (reputation) => {
    if (reputation === 10) {
      return <SentimentVerySatisfiedIcon />;
    } else if (reputation >= 7) {
      return <SentimentSatisfiedAltIcon />;
    } else if (reputation >= 4) {
      return <SentimentSatisfiedIcon />;
    } else if (reputation < 4) {
      return <SentimentVeryDissatisfiedIcon />;
    }
    return null;
  };

  return (
    <Information>
      <div>
        <div>{name}</div>
        <div
          style={{
            fontSize: '0.8rem',
          }}
        >
          {distance}km 떨어져 있음
        </div>
      </div>
      <div
        style={{
          width: '9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div>{reputation}점</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {resultOfReputation(reputation)}
          </div>
        </div>
        {emoticon(reputation)}
      </div>
    </Information>
  );
};

export default SellerInfo;
