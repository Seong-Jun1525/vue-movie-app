// 꼭 비동기 함수로 만들어야지 동작한다
exports.handler = async function (event, context) {
    return {
        statusCode: 200 // 정상적인 응답을 의미
        // body: 'Hello'
        // body 부분은 서버리스 함수로 응답시켜줄 데이터를 명시
        // 문자데이터가 반환되는 구조일 수도 있고 객체 데이터를 사용할 수도 있다
        // body부분은 문자 데이터만 할당이 가능하다
        // 만약 객체데이터를 할당하고 싶으면 JSON.stringify({}) 메소드를
        // 이용해서 하나의 객체 데이터를 문자로 변환시켜서 할당을 할 수 있음
        body: JSON.stringify({
            name: 'Seong Jun',
            age: 22,
            email: 'sjsj123455@naver.com'
        })
    }
}