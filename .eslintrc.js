module.exports = {
    env: {
        browser: true,
        node: true
        // eslint를 통해서 우리의 코드검사를 브라우저 환경에서 동작하는 여러가지 전역 개념들,
        // nodejs환경에서 동작하는 여러가지 전역개념들을 모두 코드검사를 할 것인지 그것에 대해서 설정하는 부분.
    },
    extends: [
        // code검사를 할 기본적인 규칙들을 명시

        // vue에대한 기본적인 코드 규칙
        // 'plugin:vue/vue3-essential', // Lv1
        'plugin:vue/vue3-strongly-recommended', // Lv2
        // 'plugin:vue/vue3-recommended', // Lv3: 가장 엄격함.

        // js에 대한 기본적인 코드 규칙
        'eslint:recommended'
    ],
    parserOptions: {
        // 기본적인 코드를 분석할 수 있는 분석기를 지정해줘야 함.
        parser: 'babel-eslint' // babel : es6이상의 문법을 구번에서도 동작할 수 있게 es5로 변경시켜주는 역할을 함.
    },
    rules: {
        // 기본적인 코드 규칙들을 따를 때는 따로 지정하지 않아도 됨.
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
            "void": "always",
            "normal": "never",
            "component": "always"
            },
            "svg": "always",
            "math": "always"
        }]
    }
}