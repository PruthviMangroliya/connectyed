import{u as f,a as k,b as x,c as w,r as N,d as s,e as t,f as e,w as n,g as _,h as v,F as C,i as b,j as g,o as c,k as r}from"./app-Cf285zSj.js";const R={class:"header",id:"navbar"},A=b('<div class="d-none d-lg-block bg-connectyed-header-light"><div class="container"><div class="header__top--area"><div class="header__top--left p-4"></div><div class="header__top--right"></div></div></div></div>',1),B={class:"header bg-[#213366]"},V={class:"navbar navbar-expand-lg"},L={class:"navbar-brand",href:"#"},S=t("img",{src:"/assets/images/logo/connectyedlogo.png",alt:"Connectyed Logo",class:"w-[70px]"},null,-1),j=t("button",{class:"navbar-toggler collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler--icon"})],-1),z={class:"navbar-collapse justify-content-end",id:"navbarNavAltMarkup"},M={class:"navbar-nav mainmenu"},D={href:"#"},F={href:"#"},I={class:"header__more"},T={key:0,class:"btn",type:"button"},E={key:1,class:"btn",type:"button"},H=b('<footer class="footer footer--style2"><div class="footer__bottom wow fadeInUp" data-wow-duration="1.5s"><div class="container"><div class="footer__content text-center"><p class="mb-0">All Rights Reserved © <a href="index.html">Connectyed</a> || Design By: Connectyed</p></div></div></div></footer>',1),$={__name:"Layout",setup(J){const l=f(),i=k(),p=x(),d=w(()=>p.name),u=N(l.state.auth),h=u.user,m=async()=>{u.authorization.token,await axios.post("/api/user/logout").then(({data:o})=>{localStorage.getItem("user",JSON.stringify(o)),axios.defaults.headers.common.Authorization=`Bearer ${o.authorization.token}`,l.dispatch("auth/logout"),i.push({name:"home"})}).catch(o=>{console.error(o),l.dispatch("auth/logout"),i.push({name:"home"})})};return(o,O)=>{const a=g("router-link"),y=g("router-view");return c(),s(C,null,[t("header",R,[A,t("div",B,[t("nav",V,[t("a",L,[t("h2",null,[e(a,{to:{name:"home"},class:"nav-link"},{default:n(()=>[S]),_:1})])]),j,t("div",z,[t("div",M,[t("ul",null,[t("li",null,[t("a",D,[e(a,{to:{name:"home"},class:"nav-link hidden"},{default:n(()=>[r("Home")]),_:1})])]),t("li",null,[t("a",F,[e(a,{to:{name:"admin"},class:"nav-link"},{default:n(()=>[r("Dashboard")]),_:1})])])])]),t("div",I,[d.value=="login"?(c(),s("button",T,[e(a,{to:{name:"register"},class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5"},{default:n(()=>[r("Register")]),_:1})])):d.value=="register"||!_(h).user.name?(c(),s("button",E,[e(a,{to:{name:"login"},class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5"},{default:n(()=>[r("Login")]),_:1})])):v("",!0),_(h).user.name?(c(),s("a",{key:2,onClick:m,href:"javascript:void(0)",class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5","aria-current":"page"},"Logout")):v("",!0)])])])])]),t("main",null,[e(y)]),H],64)}}};export{$ as default};