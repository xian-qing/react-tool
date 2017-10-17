webpackJsonp([6],{234:function(e,t,n){"use strict";function r(e){return{type:i.USER,user:e}}function o(){return{type:i.LOGIN_OUT}}function u(e){return{type:i.ACCOUNT,account:e}}function c(e){return{type:i.SETPHONE,phone:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.saveUser=r,t.LoginOut=o,t.setAccount=u,t.setPhone=c;var i=t.actionType={USER:"USER",LOGIN_OUT:"LOGIN_OUT",ACCOUNT:"ACCOUNT",SETPHONE:"SETPHONE"}},236:function(e,t,n){"use strict";function r(e){return{type:c.USER,user:e}}function o(){return{type:c.LOGIN_OUT}}function u(e){return{type:c.ADD_LIST,obj:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.saveUser=r,t.LoginOut=o,t.addList=u;var c=t.actionType={USER:"USER",LOGIN_OUT:"LOGIN_OUT",ADD_LIST:"ADD_LIST"}},238:function(e,t,n){n(239),n(441),e.exports=n(444)},444:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(14),u=r(o),c=n(459),i=r(c),a=n(233),f=n(99),l=n(561),s=r(l),p=n(566),d=r(p),O=n(599),y=(0,f.createStore)(s.default),h=function(e){i.default.render(u.default.createElement(O.AppContainer,null,u.default.createElement(a.Provider,{store:y},u.default.createElement(e,null))),document.getElementById("box"))};h(d.default)},561:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(99),u=n(562),c=r(u),i=n(564),a=r(i),f=n(565),l=r(f),s=(0,o.combineReducers)({todo:c.default,global:a.default,user:l.default});t.default=s},562:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var o=n(563);e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];switch(t.type){case o.actionType.ADD_TODO:return[].concat(r(e),[{text:t.text,completed:!1}]);case o.actionType.REMOVE_TODO:return e.forEach(function(n,r){n.text==t.idx&&e.splice(r,1)}),[].concat(r(e));case o.actionType.REMOVE_TODO_IDX:return e.forEach(function(n,r){r==t.idx&&e.splice(r,1)}),[].concat(r(e));default:return e}}},563:function(e,t,n){"use strict";function r(e){return{type:c.ADD_TODO,text:e}}function o(e){return{type:c.REMOVE_TODO,idx:e}}function u(e){return{type:c.REMOVE_TODO_IDX,idx:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addTodo=r,t.removeTodo=o,t.removeTodoIdx=u;var c=t.actionType={ADD_TODO:"ADD_TODO",REMOVE_TODO:"REMOVE_TODO",REMOVE_TODO_IDX:"REMOVE_TODO_IDX"}},564:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=n(236);e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLogin:!1,user:{},list:[]},t=arguments[1];switch(t.type){case u.actionType.ADD_LIST:var n=e.list||[];return e.list=[].concat(r(n),[t.obj]),o({},e);case u.actionType.USER:return e.user=t.user,e.isLogin=!0,o({},e);case u.actionType.LOGIN_OUT:return e.isLogin=!1,e.user={},o({},e);default:return e}}},565:function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(234);e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLogin:!1,user:{},account:{}},t=arguments[1];switch(t.type){case o.actionType.USER:return e.user=t.user,e.isLogin=!0,r({},e);case o.actionType.LOGIN_OUT:return e.isLogin=!1,e.user={},r({},e);case o.actionType.ACCOUNT:return e.account=t.account,r({},e);case o.actionType.SETPHONE:return e.user.telephone=t.phone,r({},e);default:return e}}},566:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(14),f=r(a),l=n(235);n(591);var s=n(593),p=r(s),d=n(594),O=r(d),y=n(595),h=r(y),_=n(596),v=r(_),b=n(597),E=r(b),T=n(598),m=r(T),D={app:O.default,shopCart:h.default,share:v.default,page:E.default,login:m.default},g=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return c(t,e),i(t,[{key:"render",value:function(){var e=[];for(var t in D)!function(t){var n=D[t],r="app"!=t?"/"+t:"/";e.push(f.default.createElement(l.Route,{key:t,exact:"app"==t,path:r,component:function(){return f.default.createElement(p.default,{load:n},function(e){return f.default.createElement(e,null)})}}))}(t);return f.default.createElement(l.BrowserRouter,{basename:"/"},f.default.createElement(l.Switch,null,e,f.default.createElement(l.Route,{component:j})))}}]),t}(a.Component),j=function(e){var t=e.location;return f.default.createElement("div",null,f.default.createElement("h3",null,"未找到",f.default.createElement("code",null,t.pathname)))};t.default=g},591:function(e,t){},593:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(14),a=(function(e){e&&e.__esModule}(i),function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={mod:null},e}return u(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this;this.props.load(function(t){e.setState({mod:t.default||t})})}},{key:"render",value:function(){return this.state.mod?this.props.children(this.state.mod):null}}]),t}(i.Component));t.default=a},594:function(e,t,n){"use strict";e.exports=function(e){n.e(0).then(function(t){e(n(606))}.bind(null,n)).catch(n.oe)}},595:function(e,t,n){"use strict";e.exports=function(e){n.e(2).then(function(t){e(n(607))}.bind(null,n)).catch(n.oe)}},596:function(e,t,n){"use strict";e.exports=function(e){n.e(1).then(function(t){e(n(608))}.bind(null,n)).catch(n.oe)}},597:function(e,t,n){"use strict";e.exports=function(e){n.e(4).then(function(t){e(n(609))}.bind(null,n)).catch(n.oe)}},598:function(e,t,n){"use strict";e.exports=function(e){n.e(3).then(function(t){e(n(610))}.bind(null,n)).catch(n.oe)}}},[238]);