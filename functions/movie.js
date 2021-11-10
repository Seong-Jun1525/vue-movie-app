// 서버리스 함수는 꼭 비동기 함수로 만들어야지 동작한다
// import 브라우저에서 동작하는 js파일을 만들때 사용 내보낼때는 export
// nodejs환경에서 동작하는 js는 require함수와 exports라는 내보내기 객체로 관리
// 서버리스 함수는 nodejs환경에서 동작
const axios = require('axios')
// const OMDB_API_KEY = process.env.OMDB_API_KEY
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
    // 실제로 네트워크상으로 데이터를 주고 받을 때는 메모리상의 문제라던가
    // 용량의 문제 등으로 데이터를 전부 다 문자 데이터로 변경해서 사용
    console.log(event)
    const payload = JSON.parse(event.body)
    const {title, type, year, page, id} = payload
    const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

    try {
        const { data } = await axios.get(url)
        // url변수로 요청을 omdb api서버로 보냄 이때 await 키워드가 필요
        // 그렇게 받아진 데이터를 변수로 받아서 사용할 수 있음
        // 하지만 data속성만 가지고 와서 사용할 것이기 때문에
        // 변수로 작성하지 않고 구조분해해서 사용
        if(data.Error) {
            return {
                statusCode: 400, // 잘못된 요청 처리에 대한 errorCode
                body: data.Error
            }
        }
        return {
            statusCode: 200, // 정상적인 반환
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: error.response.status,
            body: error.message
        }
    }

    // https://github.com/axios/axios#handling-errors
}