import{F as u,f as _,a as p,b as h,c as x}from"./index.es-BXS0IbKq.js";import{d as s,e,t as r,F as g,l as b,k as v,f as n,j as l,o as a,w}from"./app-Cf285zSj.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={name:"matchmaker",components:{FontAwesomeIcon:u},data(){return{profile:{name:"Jane Smith",avatar:"https://via.placeholder.com/150"},menuItems:[{title:"Dashboard",icon:_,link:"/dashboard"},{title:"My Profile",icon:p,link:"/profile"},{title:"Billing and Subscription",icon:h,link:"/billing"},{title:"Message",icon:x,link:"/message"}]}}},B={class:"mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 items-center justify-center"},C={class:"mx-full shadow-connectyed rounded-xl bg-connectyed-card-mm-light flex flex-col mb-5"},D={class:"flex rounded-xl"},F={class:"bg-[#e7dccf] text-[#333333] flex flex-col fixed md:relative rounded-l-xl w-72"},S={class:"flex items-center p-4 bg-[#213366] text-white"},j=["src"],I={class:"text-lg font-semibold text-connectyed-button-light"},N=e("p",{class:"text-sm text-[#e7dccf]"},"Client",-1),P={class:"mt-6 flex-1"},V={class:"p-4"},A=e("i",{class:"fas fa-sign-out-alt mr-2"},null,-1),E={class:"flex-1 p-6"};function L(c,i,M,T,o,J){const d=l("font-awesome-icon"),m=l("router-link"),f=l("router-view");return a(),s("div",B,[e("div",C,[e("div",D,[e("aside",F,[e("div",S,[e("img",{src:o.profile.avatar,alt:"Profile Picture",class:"w-12 h-12 rounded-full object-cover mr-3"},null,8,j),e("div",null,[e("h2",I,r(o.profile.name),1),N])]),e("nav",P,[e("ul",null,[(a(!0),s(g,null,b(o.menuItems,t=>(a(),s("li",{key:t.title,class:"mb-1"},[n(m,{to:"/client"+t.link,class:"block px-4 py-3 hover:bg-[#333333] hover:text-white transition-colors duration-200","active-class":"bg-connectyed-card-mm-light text-gray-900"},{default:w(()=>[n(d,{icon:t.icon,class:"w-5 h-5 mr-4"},null,8,["icon"]),e("span",null,r(t.title),1)]),_:2},1032,["to"])]))),128))])]),e("div",V,[e("button",{onClick:i[0]||(i[0]=(...t)=>c.logout&&c.logout(...t)),class:"w-full text-left px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md"},[A,v(" Logout ")])])]),e("main",E,[n(f)])])])])}const z=k(y,[["render",L]]);export{z as default};
