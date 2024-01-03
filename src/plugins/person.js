export default {
  install(app, options) {
    const person = {
      name: '이름',
      say() {
        alert(this.name);
      },
      ...options,
    };
    //전역변수로 $person 추가
    app.config.globalProperties.$person = person;
    app.provide('person', person);
  },
};
