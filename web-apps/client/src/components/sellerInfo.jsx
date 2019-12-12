import React from 'react';
import styled from 'styled-components';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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
const SellerInfo = () => {
  const userID = '1';
  const {name, reputation, numberOfRater, latitude, longitude} = {
    name: '여재환',
    reputation: 8,
    numberOfRater: 10,
    latitude: 123.5678,
    longitude: 76.456,
  }; //getUserInfo(userID)

  const getDistanceFromCurrentLocation = (latitude, longitude) => {
    return '2.34km';
  };

  const distance = getDistanceFromCurrentLocation(latitude, longitude);

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
        <div style={{fontSize: '0.8rem'}}>{distance} 떨어져 있음</div>
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
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {resultOfReputation(reputation)}
          </div>
        </div>
        {emoticon(reputation)}
      </div>
    </Information>
  );
};

export default SellerInfo;
