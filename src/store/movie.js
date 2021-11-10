import axios from 'axios'
// import { get } from 'lodash'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
    // module - 하나의 스토어에서 모듈화되서 사용할 수 있다는 것을 명시적으로 나타내는 옵션
    namespaced: true, 
    // data - 실제로 취급해야되는 각각의 데이터들 의미
    state: function() {
        return {
            movies: [],
            message: _defaultMessage,
            loading: false,
            theMovie: {}
        }
    },
    // computed - 계산된 상태를 만드는 것
    getters: {},
    // methods
    // 변이
    mutations: {
        // assignMovies (state, Search) {
        //     state.movies = Search
        // },

        // 통합적으로 state라는 데이터들을 갱신할 수 있는 로직
        // payload : 하나의 객체 데이터
        updateState(state, payload) {
            // Object.keys : 객체데이터 속성의 이름들만 가지고 새로운 배열 데이터를 만든다.
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                // state.movies = payload.movies
                // state.message = payload.message
                // state.message = payload.loading

                // state.movies = payload['movies']
                // state.message = payload['message']
                // state.message = payload['loading']

                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            // resetMovies라는 변이 메소드가 mutations 안에 작성되어 있기 때문에
            // 이것을 store에 dispatch가 아니고 commit 메소드로 실행해야 한다
            // 이 내용은 main 페이지로 이동했을 때 초기화가 되어야 하기 때문에
            // routes안에 Home.vue 컴포넌트에서 실행해야 한다
            state.movies = [] // state의 movies를 빈 배열로 초기화 해주는 작업
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 비동기
    actions: {
        // context : state, getters, mutations를 활용할 수 있는 몇가지 내용들이 들어있다.
        // payload : searchMovies가 실행될 때 인수로 들어오는 어떤 특정한 데이터들을 받는다.
        async searchMovies({ state, commit }, payload) {
            if (state.loading) return

            commit('updateState', {
                message: '',
                loading: true
            })

            try {
                const result = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = result.data
                // context.commit('assignMovies', Search)
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
                console.log(totalResults) // 갯수
                console.log(typeof totalResults) // string

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                // 추가 요청!
                if(pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        if(page > (payload.number / 10)) break

                        const result = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const { Search } = result.data
                        commit('updateState', {
                            movies: [
                                ...state.movies,
                                ..._uniqBy(Search, 'imdbID')
                            ]
                        })
                    }
                }
            } catch ({ message }) {
                commit('updateState', {
                    movies: [],
                    message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state, commit }, payload) {
            // const { id } = payload
            if (state.loading) return

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try {
                const result = await _fetchMovie(payload)
                console.log(result.data)
                commit('updateState', {
                    theMovie: result.data
                })
            } catch (error) {
                commit('updateState', {
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

async function _fetchMovie(payload) {
    // const {title, type, year, page, id} = payload
    // const OMDB_API_KEY = '7035c60c'
    // const url = id
    // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    // : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

    // return new Promise((resolve, reject) => {
    //     axios.get(url)
    //     .then((result) => {
    //         if(result.data.Error) {
    //             reject(result.data.Error)
    //         }
    //         resolve(result)
    //     })
    //     .catch((error) => {
    //         reject(error.message)
    //     })
    // })

    return await axios.post('/.netlify/functions/movie', payload)
    // post도 비동기로 동작

    // post() vs get()
    // get을 사용 할때 주소 부분에
    // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 이런식으로
    // title의 값은 무엇이고 page의 값은 무엇인지 명시를 해줘야 함
    // post는 QueryString으로 풀어서 작성하지 않고
    // 바로 두번째 인수로 포함해서 전송함
    // payload는 body라는 속성에 포함되서 전송이 됨

    // 요약
    // get은 필요로 하는 정보들을 QueryString으로 작성해서 즉, 요청하는 주소의 정보를 포함해서 전송
    // post는 데이터를 요청할 때 그것을 body 속성에 담아서 전송
}