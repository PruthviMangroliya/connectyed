import{u as f,a as k,b as x,c as u,e as s,f as t,g as e,w as n,i as g,F as N,l as C,m as b,o as c,p as l}from"./app-Cq5k9qoS.js";const w={class:"header",id:"navbar"},R=t("div",{class:"d-none d-lg-block bg-connectyed-header-light"},[t("div",{class:"container"},[t("div",{class:"header__top--area"})])],-1),A={class:"header__bottom"},B={class:"container"},V={class:"navbar navbar-expand-lg"},L={class:"navbar-brand",href:"#"},z=t("img",{src:"/assets/images/logo/connectyedlogo.png",alt:"Connectyed Logo",class:"w-[70px]"},null,-1),M=t("button",{class:"navbar-toggler collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler--icon"})],-1),j={class:"navbar-collapse justify-content-end",id:"navbarNavAltMarkup"},D={class:"navbar-nav mainmenu"},F={class:"header__more"},S={key:0,class:"btn"},T={key:1,class:"btn"},E=C('<footer class="footer footer--style2"><div class="footer__bottom"><div class="container"><div class="footer__content text-center"><p class="mb-0"> All Rights Reserved © <a href="#">Connectyed</a> || Design By: Connectyed </p></div></div></div></footer>',1),q={__name:"Layout",setup(H){const o=f(),r=k(),m=x(),h=u(()=>m.name),i=u(()=>o.state.auth.user),d=u(()=>o.state.auth.authorization),p=async()=>{if(d.value&&d.value.token){const v=d.value.token;axios.defaults.headers.common.Authorization=`Bearer ${v}`,await axios.post("/api/user/logout").then(()=>{o.dispatch("auth/logout"),r.push({name:"home"})}).catch(_=>{console.error(_),o.dispatch("auth/logout"),r.push({name:"home"})})}else o.dispatch("auth/logout"),r.push({name:"home"})};return(v,_)=>{const a=b("router-link"),y=b("router-view");return c(),s(N,null,[t("header",w,[R,t("div",A,[t("div",B,[t("nav",V,[t("a",L,[t("h2",null,[e(a,{to:{name:"home"},class:"nav-link"},{default:n(()=>[z]),_:1})])]),M,t("div",j,[t("div",D,[t("ul",null,[t("li",null,[e(a,{to:{name:"home"},class:"nav-link hidden"},{default:n(()=>[l("Home")]),_:1})]),t("li",null,[e(a,{to:{name:"matchmaker"},class:"nav-link"},{default:n(()=>[l("Dashboard")]),_:1})])])]),t("div",F,[h.value==="login"?(c(),s("button",S,[e(a,{to:{name:"register"},class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5"},{default:n(()=>[l(" Register ")]),_:1})])):h.value==="register"||!i.value.name?(c(),s("button",T,[e(a,{to:{name:"login"},class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5"},{default:n(()=>[l(" Login ")]),_:1})])):g("",!0),i.value&&i.value.name?(c(),s("a",{key:2,onClick:p,href:"javascript:void(0)",class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light py-4 px-5"}," Logout ")):g("",!0)])])])])])]),t("main",null,[e(y)]),E],64)}}};export{q as default};