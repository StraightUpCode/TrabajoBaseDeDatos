parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Gr1O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createElement=exports.h=r,exports.cloneElement=s,exports.createRef=j,exports.Component=R,exports.render=H,exports.rerender=d,exports.options=exports.default=void 0;var e=function(){},t={};exports.options=t;var n=[],o=[];function r(r,i){var l,a,s,p,c=o;for(p=arguments.length;p-- >2;)n.push(arguments[p]);for(i&&null!=i.children&&(n.length||n.push(i.children),delete i.children);n.length;)if((a=n.pop())&&void 0!==a.pop)for(p=a.length;p--;)n.push(a[p]);else"boolean"==typeof a&&(a=null),(s="function"!=typeof r)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(s=!1)),s&&l?c[c.length-1]+=a:c===o?c=[a]:c.push(a),l=s;var u=new e;return u.nodeName=r,u.children=c,u.attributes=null==i?void 0:i,u.key=null==i?void 0:i.key,void 0!==t.vnode&&t.vnode(u),u}function i(e,t){for(var n in t)e[n]=t[n];return e}function l(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var a="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function s(e,t){return r(e.nodeName,i(i({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,c=[];function u(e){!e._dirty&&(e._dirty=!0)&&1==c.push(e)&&(t.debounceRendering||a)(d)}function d(){for(var e;e=c.pop();)e._dirty&&D(e)}function f(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&v(e,t.nodeName):n||e._componentConstructor===t.nodeName}function v(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function m(e){var t=i({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function _(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.normalizedNodeName=e,n}function h(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)l(n,null),l(o,e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===p.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,b,a):e.removeEventListener(t,b,a),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(c){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var s=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?s?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(s?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function b(e){return this._listeners[e.type](t.event&&t.event(e)||e)}var x=[],g=0,C=!1,N=!1;function w(){for(var e;e=x.shift();)t.afterMount&&t.afterMount(e),e.componentDidMount&&e.componentDidMount()}function k(e,t,n,o,r,i){g++||(C=null!=r&&void 0!==r.ownerSVGElement,N=null!=e&&!("__preactattr_"in e));var l=S(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--g||(N=!1,i||w()),l}function S(e,t,n,o,r){var i=e,l=C;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0))),i.__preactattr_=!0,i;var a=t.nodeName;if("function"==typeof a)return V(e,t,n,o);if(C="svg"===a||"foreignObject"!==a&&C,a=String(a),(!e||!v(e,a))&&(i=_(a,C),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0)}var s=i.firstChild,p=i.__preactattr_,c=t.children;if(null==p){p=i.__preactattr_={};for(var u=i.attributes,d=u.length;d--;)p[u[d].name]=u[d].value}return!N&&c&&1===c.length&&"string"==typeof c[0]&&null!=s&&void 0!==s.splitText&&null==s.nextSibling?s.nodeValue!=c[0]&&(s.nodeValue=c[0]):(c&&c.length||null!=s)&&U(i,c,n,o,N||null!=p.dangerouslySetInnerHTML),L(i,t.attributes,p),C=l,i}function U(e,t,n,o,r){var i,l,a,s,p,c=e.childNodes,u=[],d={},v=0,m=0,_=c.length,y=0,b=t?t.length:0;if(0!==_)for(var x=0;x<_;x++){var g=c[x],C=g.__preactattr_;null!=(N=b&&C?g._component?g._component.__key:C.key:null)?(v++,d[N]=g):(C||(void 0!==g.splitText?!r||g.nodeValue.trim():r))&&(u[y++]=g)}if(0!==b)for(x=0;x<b;x++){var N;if(p=null,null!=(N=(s=t[x]).key))v&&void 0!==d[N]&&(p=d[N],d[N]=void 0,v--);else if(m<y)for(i=m;i<y;i++)if(void 0!==u[i]&&f(l=u[i],s,r)){p=l,u[i]=void 0,i===y-1&&y--,i===m&&m++;break}p=S(p,s,n,o),a=c[x],p&&p!==e&&p!==a&&(null==a?e.appendChild(p):p===a.nextSibling?h(a):e.insertBefore(p,a))}if(v)for(var x in d)void 0!==d[x]&&P(d[x],!1);for(;m<=y;)void 0!==(p=u[y--])&&P(p,!1)}function P(e,t){var n=e._component;n?A(n):(null!=e.__preactattr_&&l(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||h(e),B(e))}function B(e){for(e=e.lastChild;e;){var t=e.previousSibling;P(e,!0),e=t}}function L(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||y(e,o,n[o],n[o]=void 0,C);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||y(e,o,n[o],n[o]=t[o],C)}var M=[];function T(e,t,n){var o,r=M.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),R.call(o,t,n)):((o=new R(t,n)).constructor=e,o.render=E);r--;)if(M[r].constructor===e)return o.nextBase=M[r].nextBase,M.splice(r,1),o;return o}function E(e,t,n){return this.constructor(e,n)}function W(e,n,o,r,i){e._disable||(e._disable=!0,e.__ref=n.ref,e.__key=n.key,delete n.ref,delete n.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(n,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=n,e._disable=!1,0!==o&&(1!==o&&!1===t.syncComponentUpdates&&e.base?u(e):D(e,1,i)),l(e.__ref,e))}function D(e,n,o,r){if(!e._disable){var l,a,s,p=e.props,c=e.state,u=e.context,d=e.prevProps||p,f=e.prevState||c,v=e.prevContext||u,_=e.base,h=e.nextBase,y=_||h,b=e._component,C=!1,N=v;if(e.constructor.getDerivedStateFromProps&&(c=i(i({},c),e.constructor.getDerivedStateFromProps(p,c)),e.state=c),_&&(e.props=d,e.state=f,e.context=v,2!==n&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(p,c,u)?C=!0:e.componentWillUpdate&&e.componentWillUpdate(p,c,u),e.props=p,e.state=c,e.context=u),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!C){l=e.render(p,c,u),e.getChildContext&&(u=i(i({},u),e.getChildContext())),_&&e.getSnapshotBeforeUpdate&&(N=e.getSnapshotBeforeUpdate(d,f));var S,U,B=l&&l.nodeName;if("function"==typeof B){var L=m(l);(a=b)&&a.constructor===B&&L.key==a.__key?W(a,L,1,u,!1):(S=a,e._component=a=T(B,L,u),a.nextBase=a.nextBase||h,a._parentComponent=e,W(a,L,0,u,!1),D(a,1,o,!0)),U=a.base}else s=y,(S=b)&&(s=e._component=null),(y||1===n)&&(s&&(s._component=null),U=k(s,l,u,o||!_,y&&y.parentNode,!0));if(y&&U!==y&&a!==b){var M=y.parentNode;M&&U!==M&&(M.replaceChild(U,y),S||(y._component=null,P(y,!1)))}if(S&&A(S),e.base=U,U&&!r){for(var E=e,V=e;V=V._parentComponent;)(E=V).base=U;U._component=E,U._componentConstructor=E.constructor}}for(!_||o?x.push(e):C||(e.componentDidUpdate&&e.componentDidUpdate(d,f,N),t.afterUpdate&&t.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);g||r||w()}}function V(e,t,n,o){for(var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,s=a,p=m(t);r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(W(r,p,3,n,o),e=r.base):(i&&!a&&(A(i),e=l=null),r=T(t.nodeName,p,n),e&&!r.nextBase&&(r.nextBase=e,l=null),W(r,p,1,n,o),e=r.base,l&&e!==l&&(l._component=null,P(l,!1))),e}function A(e){t.beforeUnmount&&t.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;o?A(o):n&&(null!=n.__preactattr_&&l(n.__preactattr_.ref,null),e.nextBase=n,h(n),M.push(e),B(n)),l(e.__ref,null)}function R(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function H(e,t,n){return k(n,e,{},!1,t,!1)}function j(){return{}}i(R.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=i(i({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),u(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),D(this,2)},render:function(){}});var z={h:r,createElement:r,cloneElement:s,createRef:j,Component:R,render:H,rerender:d,options:t},F=z;exports.default=F;
},{}],"vGb1":[function(require,module,exports) {
"use strict";function t(t,e,r,s){for(s=0,e=e.split?e.split("."):e;t&&s<e.length;)t=t[e[s++]];return void 0===t?r:t}function e(e,r,s){var o=r.split("."),a=e.__lsc||(e.__lsc={});return a[r+s]||(a[r+s]=function(r){for(var a=r&&r.target||this,n={},i=n,l="string"==typeof s?t(r,s):a.nodeName?a.type.match(/^che|rad/)?a.checked:a.value:r,c=0;c<o.length-1;c++)i=i[o[c]]||(i[o[c]]=!c&&e.state[o[c]]||{});i[o[c]]=l,e.setState(n)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=e;exports.default=r;
},{}],"K+Iv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("preact");function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function t(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){a(e,n,t[n])})}return e}function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}function c(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?u(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&s(e,n)}function s(e,n){return(s=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var d=function(n){function r(){var e;return o(this,r),(e=c(this,l(r).call(this))).state={cargos:[],diasDePago:[],frecuenciaDePago:[],infoTrabajador:{},changedValues:{}},e.cargarTrabajador=e.cargarTrabajador.bind(u(e)),e.handleSubmit=e.handleSubmit.bind(u(e)),e.handleChange=e.handleChange.bind(u(e)),e}return h(r,e.Component),i(r,[{key:"componentDidMount",value:function(){var e=this;this.cargarTrabajador(),fetch("http://localhost:3000/api/cargo").then(function(e){return e.json()}).then(function(n){e.setState({cargos:n})}).catch(function(e){return console.error(e)}),fetch("http://localhost:3000/api/diasDePago").then(function(e){return e.json()}).then(function(n){return e.setState({diasDePago:n})}).catch(function(e){return console.error(e)}),fetch("http://localhost:3000/api/frecuenciaDePago").then(function(e){return e.json()}).then(function(n){e.setState({frecuenciaDePago:n})}).catch(function(e){return console.log(e)})}},{key:"handleChange",value:function(e){var n=this;this.setState(function(n){return console.log(n),{infoTrabajador:t({},n.infoTrabajador,a({},e.target.name,e.target.value)),changedValues:a({},e.target.name,e.target.value)}},function(){console.log(n.state)})}},{key:"cargarTrabajador",value:function(){var e=this;fetch("http://localhost:3000/api/trabajador/".concat(this.props.idTrabajador)).then(function(e){return e.json()}).then(function(n){console.log(n),e.setState({infoTrabajador:n})}).catch(function(e){return console.error(e)})}},{key:"handleSubmit",value:function(e){var n=this;e.preventDefault();var t=this.state,a=t.changedValues,o=t.infoTrabajador;console.log(a),console.log(o),fetch("http://localhost:3000/api/trabajador/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({changedValues:a,idTrabajador:o.idTrabajador})}).then(function(e){return e.json()}).then(function(e){n.props.actualizar(),console.log(e)})}},{key:"render",value:function(n,t){var a=t.cargos,o=t.diasDePago,r=t.frecuenciaDePago,i=t.infoTrabajador;return console.log(i),console.log(i.porcentajeComision),(0,e.h)("form",{onSubmit:this.handleSubmit,method:"POST"},(0,e.h)("input",{onChange:this.handleChange,type:"text",name:"nombre",value:i.nombre}),(0,e.h)("input",{onChange:this.handleChange,type:"text",name:"apellido",value:i.apellido}),(0,e.h)("input",{onChange:this.handleChange,type:"text",name:"cedula",value:i.cedula}),(0,e.h)("label",null,"Cargo:"),(0,e.h)("select",{onChange:this.handleChange,id:"cargos",name:"idCargo"},a.map(function(n){return n.idCargo==i.idTrabajador?(0,e.h)("option",{selected:"selected",value:n.idCargo},n.nombre):(0,e.h)("option",{value:n.idCargo}," ",n.nombre)})),(0,e.h)("label",null,"Pago:"),(0,e.h)("select",{onChange:this.handleChange,name:"salarioPorHora"},(0,e.h)("option",{value:"false"},"Mensual"),(0,e.h)("option",{value:"true"},"Hora")),(0,e.h)("label",null,"Salario Base:"),(0,e.h)("input",{type:"number",step:"any",value:i.salario,name:"salario",placeholder:"Salario",max:"1000000"}),i.porcentajeComision&&(0,e.h)("div",null,(0,e.h)("label",null,"Porcentaje Comision:"),(0,e.h)("input",{onChange:this.handleChange,type:"number",step:"any",value:i.porcentajeComision,name:"salario",placeholder:"Porcentaje Comision",max:"100"})),(0,e.h)("label",null,"Fecha Pago:"),(0,e.h)("select",{onChange:this.handleChange,id:"fechaPagos",name:"idDiaPago"},o.map(function(n){return n.idCargo==i.idTrabajador?(0,e.h)("option",{selected:"selected",value:n.idDia_de_Pago},n.diaPago):(0,e.h)("option",{value:n.idDia_de_Pago}," ",n.diaPago)})),(0,e.h)("label",null,"Frecuencia de Pago"),(0,e.h)("select",{onChange:this.handleChange,id:"frecuenciaDePagos",name:"idFrecuenciaDePago"},r.map(function(n){return n.idFrecuenciaDePago==i.idFrecuenciaDePago?(0,e.h)("option",{selected:"selected",value:n.idFrecuenciaDePago}," ",n.nombre):(0,e.h)("option",{value:n.idFrecuenciaDePago},n.nombre)})),(0,e.h)("button",{onSubmit:this.handleSubmit},"Guardar "))}}]),r}(),f=d;exports.default=f;
},{"preact":"Gr1O"}],"2+cq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=require("preact");function o(r){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function t(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function n(r,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function e(r,o,t){return o&&n(r.prototype,o),t&&n(r,t),r}function a(r,t){return!t||"object"!==o(t)&&"function"!=typeof t?u(r):t}function i(r){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)})(r)}function u(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function c(r,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(o&&o.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),o&&l(r,o)}function l(r,o){return(l=Object.setPrototypeOf||function(r,o){return r.__proto__=o,r})(r,o)}var s=function(o){function n(){var r;return t(this,n),(r=a(this,i(n).call(this))).state={mostrarAgregarHorario:!1},r.cargarHorarios=r.cargarHorarios.bind(u(r)),r.handleChange=r.handleChange.bind(u(r)),r}return c(n,r.Component),e(n,[{key:"cargarHorarios",value:function(){var r=this;fetch("http://localhost:3000/api/horarios").then(function(r){return r.json()}).then(function(o){console.log(o),r.setState({horarioAAsignar:o,mostrarAgregarHorario:!0})})}},{key:"handleChange",value:function(r){var o=this;console.log(this.props);var t=JSON.stringify({idTrabajador:this.props.idTrabajador,idHorario:Number.parseInt(r.target.value)});console.log(t),fetch("http://localhost:3000/api/trabajador/".concat(this.props.idTrabajador,"/asignarHorario"),{method:"POST",headers:{"Content-Type":"application/json"},body:t}).then(function(r){return r.json()}).then(function(r){o.setState({nuevoHorario:r})})}},{key:"render",value:function(o,t){var n=o.horario,e=t.horarioAAsignar,a=t.mostrarAgregarHorario,i=t.nuevoHorario||n;return(0,r.h)("div",{class:"horarios"},(0,r.h)("button",{onClick:this.cargarHorarios},"Asignar Horario"),a&&(0,r.h)("select",{onChange:this.handleChange},(0,r.h)("option",{selected:!0,value:""},"Escoger una Opcion"),e.map(function(o){return(0,r.h)("option",{value:o.idHorario},"".concat(o.horaEntrada," - ").concat(o.horaSalida))})),(0,r.h)("table",null,(0,r.h)("thead",null,(0,r.h)("th",null," Hora Entrada"),(0,r.h)("th",null," Hora Salida")),(0,r.h)("tbody",null,i.map(function(o){return(0,r.h)("tr",null,(0,r.h)("td",null,o.horaEntrada),(0,r.h)("td",null,o.horaSalida))}))))}}]),n}(),h=s;exports.default=h;
},{"preact":"Gr1O"}],"Wdha":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=require("preact"),o=e(require("./FormularioTrabajador")),t=e(require("./Horarios"));function e(r){return r&&r.__esModule?r:{default:r}}function a(r){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function n(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function i(r,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,e.key,e)}}function u(r,o,t){return o&&i(r.prototype,o),t&&i(r,t),r}function l(r,o){return!o||"object"!==a(o)&&"function"!=typeof o?c(r):o}function s(r){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)})(r)}function c(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function f(r,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(o&&o.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),o&&b(r,o)}function b(r,o){return(b=Object.setPrototypeOf||function(r,o){return r.__proto__=o,r})(r,o)}var d=function(e){function a(){var r;return n(this,a),(r=l(this,s(a).call(this))).state={showHorario:!1,showPopUpTrabajador:!1},r.mostrarHorario=r.mostrarHorario.bind(c(r)),r.mostrarTrabajadorEditable=r.mostrarTrabajadorEditable.bind(c(r)),r.eliminarUsuario=r.eliminarUsuario.bind(c(r)),r}return f(a,r.Component),u(a,[{key:"componentDidMount",value:function(){console.log("Elemento Trabajador")}},{key:"mostrarHorario",value:function(){this.setState(function(r){return{showHorario:!r.showHorario}})}},{key:"mostrarTrabajadorEditable",value:function(){this.setState(function(r){return{showPopUpTrabajador:!r.showPopUpTrabajador}})}},{key:"eliminarUsuario",value:function(){var r=this;fetch("http://localhost:3000/api/trabajador/".concat(this.props.trabajador.idTrabajador,"/delete")).then(function(o){r.props.reload()})}},{key:"render",value:function(e,a){var n=e.trabajador,i=n.idTrabajador,u=n.nombre,l=n.apellido,s=n.horario,c=a.showHorario,f=a.showPopUpTrabajador;return(0,r.h)("div",null,(0,r.h)("div",{class:"header"},(0,r.h)("h2",null,u," ",l),(0,r.h)("div",null,(0,r.h)("button",{onClick:this.mostrarHorario},"Mostrar Horario"),(0,r.h)("button",{onClick:this.mostrarTrabajadorEditable},"Editar"),(0,r.h)("button",{onClick:this.eliminarUsuario},"Eliminar"))),c&&(0,r.h)(t.default,{horario:s,idTrabajador:i}),f&&(0,r.h)(o.default,{idTrabajador:i,actualizar:this.props.reload}))}}]),a}(),p=d;exports.default=p;
},{"preact":"Gr1O","./FormularioTrabajador":"K+Iv","./Horarios":"2+cq"}],"/7UU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=require("preact"),e=a(require("linkstate")),t=a(require("./ElementoTrabajador"));function a(r){return r&&r.__esModule?r:{default:r}}function o(r){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function n(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function u(r,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(r,a.key,a)}}function i(r,e,t){return e&&u(r.prototype,e),t&&u(r,t),r}function s(r,e){return!e||"object"!==o(e)&&"function"!=typeof e?d(r):e}function l(r){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)})(r)}function d(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function b(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&c(r,e)}function c(r,e){return(c=Object.setPrototypeOf||function(r,e){return r.__proto__=e,r})(r,e)}var f=function(a){function o(){var r;return n(this,o),(r=s(this,l(o).call(this))).state={queryInProgress:!1,nombreTrabajador:"",idTrabajador:null,busquedaTrabajadores:[],listaTrabajadores:[],trabajadoresFiltrados:[]},r.clearBusqueda=r.clearBusqueda.bind(d(r)),r.loadTrabajadores=r.loadTrabajadores.bind(d(r)),r.filterTrabajadores=r.filterTrabajadores.bind(d(r)),r}return b(o,r.Component),i(o,[{key:"componentDidMount",value:function(){this.loadTrabajadores()}},{key:"loadTrabajadores",value:function(){var r=this;fetch("http://localhost:3000/api/trabajador?horario=true").then(function(r){return r.json()}).then(function(e){r.setState({listaTrabajadores:e})}).catch(function(r){return console.error(r)})}},{key:"componentDidUpdate",value:function(r,e){var t=this;e.nombreTrabajador.length>=0&&e.nombreTrabajador.length!=this.state.nombreTrabajador.length&&0==e.queryInProgress&&this.setState(function(r){return t.getTrabajadores(),{queryInProgress:!0,nQuery:r.nQuery++}}),0==e.nombreTrabajador.length&&this.state.busquedaTrabajadores.length&&this.setState(function(r){return{busquedaTrabajadores:[]}})}},{key:"getTrabajadores",value:function(){var r=this;this.state.queryInProgress||fetch("http://localhost:3000/api/trabajador?name=".concat(this.state.nombreTrabajador)).then(function(r){return r.json()}).then(function(e){r.setState({busquedaTrabajadores:e,queryInProgress:!1}),r.filterTrabajadores()}).catch(function(r){return console.log(r)})}},{key:"getTrabajadorId",value:function(r){this.setState({idTrabajador:r.target.value,nombreTrabajador:r.target.label})}},{key:"filterTrabajadores",value:function(){var r=this.state,e=r.idTrabajador,t=r.nombreTrabajador,a=r.listaTrabajadores;e?this.setState(function(r){return{trabajadoresFiltrados:a.filter(function(r){return r.idTrabajador==e})}}):this.setState(function(r){return{trabajadoresFiltrados:a.filter(function(r){var e=r.nombre.includes(t)||r.apellido.includes(t);return console.log("Incluye el Nombre",e),e})}})}},{key:"clearBusqueda",value:function(){this.setState({idTrabajador:null,nombreTrabajador:"",trabajadoresFiltrados:[]})}},{key:"render",value:function(a,o){var n=this,u=o.nombreTrabajador,i=o.busquedaTrabajadores,s=o.listaTrabajadores,l=o.trabajadoresFiltrados,d=l.length>0?l:s;return(0,r.h)("div",null,(0,r.h)("input",{placeholder:"Buscar",value:u,onInput:(0,e.default)(this,"nombreTrabajador")}),i.map(function(e){return(0,r.h)("option",{value:e.idTrabajador,onClick:n.getTrabajadorId.bind(n)}," ","".concat(e.nombre," ").concat(e.apellido))}),(0,r.h)("div",{onClick:this.clearBusqueda},"X"),(0,r.h)("div",null,(0,r.h)("h2",null," Trabajadores "),d.map(function(e){return(0,r.h)(t.default,{trabajador:e,reload:n.loadTrabajadores})})))}}]),o}(),j=f;exports.default=j;
},{"preact":"Gr1O","linkstate":"vGb1","./ElementoTrabajador":"Wdha"}],"VnLS":[function(require,module,exports) {
"use strict";var e=require("preact"),r=o(require("./TrabajadorHoraComponents/Container"));function o(e){return e&&e.__esModule?e:{default:e}}var n=document.getElementById("root");console.log(n),console.log(e.render),console.log(r.default),(0,e.render)((0,e.h)(r.default,null),n,n.firstChild);
},{"preact":"Gr1O","./TrabajadorHoraComponents/Container":"/7UU"}]},{},["VnLS"], null)
//# sourceMappingURL=/trabajadorHora.map