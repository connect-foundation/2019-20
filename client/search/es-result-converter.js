/**
 * 본 메소드는 서버로부터 받은 데이터를 클라이언트 환경에 맞게 변환하는 메소드입니다.
 * 서버에서 데이터를 받은 후 서버에서 가공하는 방법도 있지만 이 방법보다 서버에서 처리하는 시간을
 * 줄이고(공개해서는 안되는 정보를 필터링을 거치고)
 * 클라이언트(프론트)에서 처리하는 것이 여러 요청이 왔을 때 처리하는 것이 좋다고 생각되어
 * 여기서 변환하도록 하였습니다.
 * 
 * 지금은 단순히 연동이 되는지 확인하기 위해 임시로 만들어두었습니다.
 */
const convertESResultToSimpleList = (data) => ({ title: data._source.title, id: data._id });

export default convertESResultToSimpleList;
