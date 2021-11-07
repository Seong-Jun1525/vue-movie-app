// 직접 구성옵션을 작성해야함.
// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {

    resolve: {
        extensions: ['.js', '.vue'],
        // 경로 별칭
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets')
        }
    },


    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/main.js',

    // 결과물(번들)을 반환하는 설정
    output: {
        // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역변수
        // path: path.resolve(__dirname, 'dist'), // 절대 경로 명시
        // // __dirname : 현재 파일이 있는 그 경로를 지칭.
        // filename: 'main.js',
        clean: true // 기존에 있던 파일을 제거함.
    },

    // 모듈 처리 방식을 설정
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    // 순서 중요
                    'vue-style-loader', // 가장 마지막에 해석
                    // 'style-loader', // 해석된 로더가 실제로 어디선가 사용되어야 하는데 그때 style-loader가 html부분에 style tag부분에 해석된 내용을 삽입시켜줌. 
                    'css-loader', // 먼저 해석되는 loader. js파일에서 css파일을 해석하는 용도로 사용.
                    'postcss-loader',
                    // 'sass-loader', 이렇게 작성하면 scss폴더가 필요할 때 마다 import를 해줘야한다
                    {
                        loader: 'sass-loader',
                        options: {
                        additionalData: '@import "~/scss/main";'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 제외할 경로
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: 'file-loader'
            }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'static'}
            ]
        }),
        new VueLoaderPlugin()
    ],

    devServer: {
        host: 'localhost'
    }
}