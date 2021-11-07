// 페이지를 관리해주는 하나의 구성 파일
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter ({
    // hash mode, history mode 중에서 hash mode 사용
    // hash mode를 사용하는 것은 특정 페이지에서 새로고침 했을 때
    // '페이지를 찾을 수 없다'라는 메시지를 방지할 수 있다.
    // hash mode를 사용하지 않기 위해서는 history mode를 사용해야 하는데
    // 그러면 서버에 셋팅을 해야하기 때문에 일단은 hash mode를 사용
    history: createWebHashHistory(),

    scrollBehavior() {
        return { top: 0 }
    },

    // pages
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            // 꼭 pathMatch라고 작성하지 않아도 됨.
            path: '/:NotFound(.*)',
            component: NotFound
        }
    ]
})