export default {
    namespaced: true,
    state: () => {
        // 상태 부분을 함수로 만들어야 하는 이유
        // 객체 데이터는 배열데이터와 동일하게 하나의 참조형 데이터
        // 데이터의 불변성을 유지하려면 함수로 만들어서 반환해줘야지
        // 그때그때 state에서 사용되는 데이터가 고유해 질 수 있다.
        return { 
            name: 'Seong Jun',
            email: 'sjsj123455@naver.com',
            github: 'https://github.com/Seong-Jun1525',
            phone: '+82-10-1234-5678',
            image: 'https://avatars.githubusercontent.com/u/77059720?v=4'
        }
    }
}