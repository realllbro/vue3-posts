/* 객체로 plugin 작성 */
const objPlugins = {
  //매개변수로 app, options 를 받을 수 있다.
  install(app, options) {
    console.log('objPlugins app : ', app);
    console.log('objPlugins options : ', options);

    // app.config.globalProperties  전역 애플리케이션 인스턴스에 속성 추가
    // app.provide()   다양한 리소스를 자식 컴포넌트에서 사용할 수 있도록 추가할 수 있다. 앱 전체에 리소스(메서드 또는 데이터)를 주입할 때
    // app.component() 전역 컴포넌트
    // app.directive() 커스텀 디렉티브
  },
};

export default objPlugins;
