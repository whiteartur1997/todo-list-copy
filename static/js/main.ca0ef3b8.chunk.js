(this["webpackJsonptodolist-14"]=this["webpackJsonptodolist-14"]||[]).push([[0],{113:function(t,e,n){},114:function(t,e,n){"use strict";n.r(e);var a=n(5),i=n(0),c=n.n(i),o=n(10),s=n.n(o),d=(n(86),n(154)),r=n(155),l=n(149),u=n(157),j=n(152),b=n(158),O=n(159),f=n(156),T=n(18),h=n(8),k=n(164),g=n(161),S={status:"idle",error:null},p=function(t){return{type:"APP/SET-STATUS",status:t}},v=function(t){return{type:"APP/SET-ERROR",error:t}};function m(t){return Object(a.jsx)(g.a,Object(h.a)({elevation:6,variant:"filled"},t))}function C(){var t=Object(T.c)((function(t){return t.app.error})),e=Object(T.b)();console.log(t);var n=function(t,n){"clickaway"!==n&&e(v(null))};return Object(a.jsx)(k.a,{open:!!t,autoHideDuration:6e3,onClose:n,children:Object(a.jsx)(m,{onClose:n,severity:"error",children:t})})}var I,x,y=n(153),E=n(115),A=n(33),D=n(160),L=n(150),N=c.a.memo((function(t){var e=t.addItem,n=t.disabled,c=void 0!==n&&n,o=Object(i.useState)(""),s=Object(A.a)(o,2),d=s[0],r=s[1],u=Object(i.useState)(null),j=Object(A.a)(u,2),b=j[0],O=j[1],f=function(){""!==d.trim()?(e(d),r("")):O("Title is required")};return Object(a.jsxs)("div",{children:[Object(a.jsx)(D.a,{variant:"outlined",error:!!b,value:d,onChange:function(t){r(t.currentTarget.value)},onKeyPress:function(t){null!==b&&O(null),13===t.charCode&&f()},label:"Title",helperText:b,disabled:c}),Object(a.jsx)(l.a,{color:"primary",onClick:f,disabled:c,children:Object(a.jsx)(L.a,{})})]})})),w=n(46),P=n(21),F=n(70),R=n.n(F).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"12593e8b-a230-49da-8bc0-827e793858c7"}});!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(I||(I={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(x||(x={}));var K=function(){return R.get("todo-lists")},H=function(t){return R.post("todo-lists",{title:t})},U=function(t){return R.delete("todo-lists/".concat(t))},G=function(t,e){return R.put("todo-lists/".concat(t),{title:e})},M=function(t){return R.get("todo-lists/".concat(t,"/tasks"))},V=function(t,e){return R.delete("todo-lists/".concat(t,"/tasks/").concat(e))},Y=function(t,e){return R.post("todo-lists/".concat(t,"/tasks"),{title:e})},B=function(t,e,n){return R.put("todo-lists/".concat(t,"/tasks/").concat(e),n)};function J(t,e){t.messages.length?e(v(t.messages[0])):e(v("Some error occured!")),e(p("failed"))}function q(t,e){e(v(t.message?t.message:"Some error occured")),e(p("failed"))}var z=[],Q=function(t,e){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",id:t,entityStatus:e}},W={},X=function(t,e,n){return{type:"CHANGE-TASK-ENTITY-STATUS",status:e,todolistId:n,taskId:t}},Z=function(t,e,n){return function(a,i){var c=i().tasks[t].find((function(t){return t.id===e}));if(c){var o=Object(h.a)({title:c.title,deadline:c.deadline,description:c.description,priority:c.priority,startDate:c.startDate,status:c.status},n);a(p("loading")),a(X(e,"loading",t)),B(t,e,o).then((function(i){0===i.data.resultCode?(a(function(t,e,n){return{type:"UPDATE-TASK",model:e,todolistId:n,taskId:t}}(e,n,t)),a(p("succeeded")),a(X(e,"succeeded",t))):J(i.data,a)})).catch((function(t){q(t,a)})).finally((function(){a(X(e,"idle",t))}))}else console.warn("No such task")}},$=n(47),_=n(151),tt=c.a.memo((function(t){var e=t.disabled,n=void 0!==e&&e,c=Object($.a)(t,["disabled"]),o=Object(i.useState)(!1),s=Object(A.a)(o,2),d=s[0],r=s[1],l=Object(i.useState)(c.value),u=Object(A.a)(l,2),j=u[0],b=u[1];return d?Object(a.jsx)(D.a,{disabled:n,value:j,onChange:function(t){b(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),c.onChange(j)}}):Object(a.jsx)("span",{onDoubleClick:function(){n||(r(!0),b(c.value))},children:c.value})})),et=n(162),nt=c.a.memo((function(t){var e=Object(i.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(i.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?I.Completed:I.New,t.todolistId)}),[t.task.id,t.todolistId]),c=Object(i.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(a.jsxs)("div",{className:t.task.status===I.Completed?"is-done":"",children:[Object(a.jsx)(et.a,{disabled:"loading"===t.task.entityStatus,checked:t.task.status===I.Completed,color:"primary",onChange:n}),Object(a.jsx)(tt,{disabled:"loading"===t.task.entityStatus,value:t.task.title,onChange:c}),Object(a.jsx)(l.a,{disabled:"loading"===t.task.entityStatus,onClick:e,children:Object(a.jsx)(_.a,{})})]},t.task.id)})),at=c.a.memo((function(t){var e=t.demo,n=void 0!==e&&e,c=Object($.a)(t,["demo"]),o=Object(T.b)();Object(i.useEffect)((function(){var t;n||o((t=c.todolist.id,function(e){e(p("loading")),e(Q(t,"loading")),M(t).then((function(n){e(function(t,e){return{type:"SET-TASKS",todolistId:t,tasks:e}}(t,n.data.items)),e(p("succeeded"))})).catch((function(t){q(t,e)})).finally((function(){e(Q(t,"idle"))}))}))}),[]);var s=Object(i.useCallback)((function(t){c.addTask(t,c.todolist.id)}),[c.addTask,c.todolist.id]),d=Object(i.useCallback)((function(t){c.changeTodolistTitle(c.todolist.id,t)}),[c.todolist.id,c.changeTodolistTitle]),r=Object(i.useCallback)((function(){return c.changeFilter("all",c.todolist.id)}),[c.todolist.id,c.changeFilter]),u=Object(i.useCallback)((function(){return c.changeFilter("active",c.todolist.id)}),[c.todolist.id,c.changeFilter]),b=Object(i.useCallback)((function(){return c.changeFilter("completed",c.todolist.id)}),[c.todolist.id,c.changeFilter]),O=c.tasks;return"active"===c.todolist.filter&&(O=c.tasks.filter((function(t){return t.status===I.New}))),"completed"===c.todolist.filter&&(O=c.tasks.filter((function(t){return t.status===I.Completed}))),Object(a.jsxs)("div",{children:[Object(a.jsxs)("h3",{children:[Object(a.jsx)(tt,{disabled:"loading"===c.todolist.entityStatus,value:c.todolist.title,onChange:d}),Object(a.jsx)(l.a,{onClick:function(){c.removeTodolist(c.todolist.id)},disabled:"loading"===c.todolist.entityStatus,children:Object(a.jsx)(_.a,{})})]}),Object(a.jsx)(N,{addItem:s,disabled:"loading"===c.todolist.entityStatus}),Object(a.jsx)("div",{children:O.map((function(t){return Object(a.jsx)(nt,{task:t,todolistId:c.todolist.id,removeTask:c.removeTask,changeTaskTitle:c.changeTaskTitle,changeTaskStatus:c.changeTaskStatus},t.id)}))}),Object(a.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(a.jsx)(j.a,{variant:"all"===c.todolist.filter?"outlined":"text",onClick:r,color:"default",children:"All"}),Object(a.jsx)(j.a,{variant:"active"===c.todolist.filter?"outlined":"text",onClick:u,color:"primary",children:"Active"}),Object(a.jsx)(j.a,{variant:"completed"===c.todolist.filter?"outlined":"text",onClick:b,color:"secondary",children:"Completed"})]})]})})),it=function(t){var e=t.demo,n=void 0!==e&&e,c=Object(T.c)((function(t){return t.todolists})),o=Object(T.c)((function(t){return t.tasks})),s=Object(T.b)();Object(i.useEffect)((function(){n||s((function(t){t(p("loading")),K().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(p("succeeded"))})).catch((function(e){q(e,t)}))}))}),[]);var d=Object(i.useCallback)((function(t,e){s(function(t,e){return function(n){n(p("loading")),n(X(e,"loading",t)),V(t,e).then((function(a){0===a.data.resultCode?(n(function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(e,t)),n(p("succeeded"))):J(a.data,n)})).catch((function(t){q(t,n)}))}}(e,t))}),[]),r=Object(i.useCallback)((function(t,e){s(function(t,e){return function(n){n(p("loading")),Y(t,e).then((function(t){0===t.data.resultCode?(n({type:"ADD-TASK",task:t.data.data.item}),n(p("succeeded"))):J(t.data,n)})).catch((function(t){q(t,n)}))}}(e,t))}),[]),l=Object(i.useCallback)((function(t,e,n){s(Z(n,t,{status:e}))}),[]),u=Object(i.useCallback)((function(t,e,n){s(Z(n,t,{title:e}))}),[]),j=Object(i.useCallback)((function(t,e){var n={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};s(n)}),[]),b=Object(i.useCallback)((function(t){var e;s((e=t,function(t){t(p("loading")),t(Q(e,"loading")),U(e).then((function(n){0===n.data.resultCode?(t({type:"REMOVE-TODOLIST",id:e}),t(p("succeeded"))):J(n.data,t)})).catch((function(e){q(e,t)})).finally((function(){t(Q(e,"idle"))}))}))}),[]),O=Object(i.useCallback)((function(t,e){s(function(t,e){return function(n){n(p("loading")),n(Q(t,"loading")),G(t,e).then((function(a){0===a.data.resultCode?n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e)):J(a.data,n)})).catch((function(t){q(t,n)})).finally((function(){n(Q(t,"idle"))}))}}(t,e))}),[]),f=Object(i.useCallback)((function(t){s(function(t){return function(e){e(p("loading")),H(t).then((function(t){0===t.data.resultCode?(e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(p("succeeded"))):J(t.data,e)})).catch((function(t){q(t,e)}))}}(t))}),[s]);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(y.a,{container:!0,style:{padding:"20px"},children:Object(a.jsx)(N,{addItem:f})}),Object(a.jsx)(y.a,{container:!0,spacing:3,children:c.map((function(t){var e=o[t.id];return Object(a.jsx)(y.a,{item:!0,children:Object(a.jsx)(E.a,{style:{padding:"10px"},children:Object(a.jsx)(at,{todolist:t,tasks:e,removeTask:d,changeFilter:j,addTask:r,changeTaskStatus:l,removeTodolist:b,changeTaskTitle:u,changeTodolistTitle:O,demo:n})})},t.id)}))})]})};n(113);var ct=function(t){var e=t.demo,n=void 0!==e&&e,i=Object(T.c)((function(t){return t.app.status}));return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(d.a,{position:"static",children:Object(a.jsxs)(r.a,{children:[Object(a.jsx)(l.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(a.jsx)(f.a,{})}),Object(a.jsx)(u.a,{variant:"h6",children:"News"}),Object(a.jsx)(j.a,{color:"inherit",children:"Login"})]})}),"loading"===i&&Object(a.jsx)(b.a,{color:"secondary"}),Object(a.jsx)(O.a,{fixed:!0,children:Object(a.jsx)(it,{demo:n})}),Object(a.jsx)(C,{})]})},ot=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,165)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),a(t),i(t),c(t),o(t)}))},st=n(30),dt=n(71),rt=Object(st.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":var n=Object(h.a)({},t);return e.todolists.forEach((function(t){n[t.id]=[]})),n;case"SET-TASKS":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.todolistId,e.tasks.map((function(t){return Object(h.a)(Object(h.a)({},t),{},{entityStatus:"idle"})}))));case"REMOVE-TASK":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.task.todoListId,[Object(h.a)(Object(h.a)({},e.task),{},{entityStatus:"idle"})].concat(Object(w.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(h.a)(Object(h.a)({},t),e.model):t}))));case"CHANGE-TASK-ENTITY-STATUS":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(h.a)(Object(h.a)({},t),{},{entityStatus:e.status}):t}))));case"ADD-TODOLIST":return Object(h.a)(Object(h.a)({},t),{},Object(P.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(h.a)({},t);return delete a[e.id],a;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(h.a)(Object(h.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(h.a)(Object(h.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(w.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return e.id===t.id?Object(h.a)(Object(h.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return e.id===t.id?Object(h.a)(Object(h.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return e.id===t.id?Object(h.a)(Object(h.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(h.a)(Object(h.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(h.a)(Object(h.a)({},t),{},{error:e.error});default:return t}}}),lt=Object(st.d)(rt,Object(st.a)(dt.a));window.store=lt,s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(T.a,{store:lt,children:Object(a.jsx)(ct,{})})}),document.getElementById("root")),ot()},86:function(t,e,n){}},[[114,1,2]]]);
//# sourceMappingURL=main.ca0ef3b8.chunk.js.map