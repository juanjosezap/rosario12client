(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3485f2e4"],{"33f2":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list row"},[n("div",{staticClass:"col-md-8"},[n("div",{staticClass:"input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.nombre,expression:"nombre"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search by nombre"},domProps:{value:t.nombre},on:{input:function(e){e.target.composing||(t.nombre=e.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:t.searchTitle}},[t._v(" Search ")])])])]),n("div",{staticClass:"col-md-6"},[n("h4",[t._v("Lista de clientes")]),n("ul",{staticClass:"list-group"},t._l(t.clients,(function(e,i){return n("li",{key:i,staticClass:"list-group-item",class:{active:i==t.currentIndex},on:{click:function(n){return t.setActiveClient(e,i)}}},[t._v(" "+t._s(e.nombre)+" ")])})),0)]),n("div",{staticClass:"col-md-6"},[t.currentClient?n("div",[n("h4",[t._v("Client")]),n("div",[t._m(0),t._v(" "+t._s(t.currentClient.nombre)+" ")]),n("div",[t._m(1),t._v(" "+t._s(t.currentClient.cuit)+" ")]),n("div",[t._m(2),t._v(" "+t._s(t.currentClient.sujetoExento?"Si":"No")+" ")]),n("div",[t._m(3),t._v(" "+t._s(t.currentClient.dir)+" ")]),n("div",[t._m(4),t._v(" "+t._s(t.currentClient.tel)+" ")]),n("div",[t._m(5),t._v(" "+t._s(t.currentClient.mail)+" ")]),n("a",{staticClass:"badge badge-warning",attrs:{href:"/clients/"+t.currentClient._id}},[t._v(" Edit ")])]):n("div",[n("br"),n("p",[t._v("Please click on a Client...")])])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Nombre:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("CUIT:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Sujeto Exento:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Direcci'on:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Tel'efono:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Mail:")])])}],c=n("e985"),l={name:"clients-list",data:function(){return{clients:[],currentClient:null,currentIndex:-1,nombre:""}},methods:{retrieveClients:function(){var t=this;c["a"].getAll().then((function(e){t.clients=e.data,console.log(e.data)})).catch((function(t){console.log(t)}))},refreshList:function(){this.retrieveClients(),this.currentClient=null,this.currentIndex=-1},setActiveClient:function(t,e){this.currentClient=t,this.currentIndex=e},removeAllClients:function(){var t=this;c["a"].deleteAll().then((function(e){console.log(e.data),t.refreshList()})).catch((function(t){console.log(t)}))},searchTitle:function(){var t=this;c["a"].findByNombre(this.nombre).then((function(e){t.clients=e.data,console.log(e.data)})).catch((function(t){console.log(t)}))}},mounted:function(){this.retrieveClients()}},s=l,a=(n("8221"),n("2877")),o=Object(a["a"])(s,i,r,!1,null,null,null);e["default"]=o.exports},"75f4":function(t,e,n){},8221:function(t,e,n){"use strict";var i=n("75f4"),r=n.n(i);r.a},e985:function(t,e,n){"use strict";var i=n("d4ec"),r=n("bee2"),c=n("c427"),l=function(){function t(){Object(i["a"])(this,t)}return Object(r["a"])(t,[{key:"getAll",value:function(){return c["a"].get("/clients")}},{key:"get",value:function(t){return c["a"].get("/clients/".concat(t))}},{key:"create",value:function(t){return c["a"].post("/clients",t)}},{key:"update",value:function(t,e){return c["a"].put("/clients/".concat(t),e)}},{key:"delete",value:function(t){return c["a"].delete("/clients/".concat(t))}},{key:"deleteAll",value:function(){return c["a"].delete("/clients")}},{key:"findByNombre",value:function(t){return c["a"].get("/clients?nombre=".concat(t))}}]),t}();e["a"]=new l}}]);
//# sourceMappingURL=chunk-3485f2e4.e602f56e.js.map