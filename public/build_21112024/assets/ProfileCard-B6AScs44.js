import{_ as S,d as y,c as h,G as C,o as i,e as s,f as t,t as c,i as l,p as v,n as A,F as k,z as w,x as L,q as D,s as I}from"./app-DHpn0u2P.js";const T={name:"ProfileCard",props:{matchmaker:{type:Object,required:!0}},setup(n){const d=y([]),o=y(!1),a=6,p=h(()=>{var e;return((e=n.matchmaker.profile)==null?void 0:e.profile_image1)||"/upload/images/profiles/default.png"}),b=h(()=>{const e=n.matchmaker.profile;return e?[e.city,e.state,e.country].filter(Boolean).join(", ")||"Location not specified":null}),f=h(()=>{var m;const e=(m=n.matchmaker.profile)==null?void 0:m.bio;return e&&e.length>120}),u=h(()=>d.value.slice(0,a)),g=h(()=>{var e;return((e=n.matchmaker.availability)==null?void 0:e.slice(0,3))||[]}),x=e=>{if(!e.start_date)return"Schedule not specified";const m=new Date(e.start_date).toLocaleDateString(void 0,{month:"short",day:"numeric"}),B=e.start_time?new Date(`1970-01-01T${e.start_time}Z`).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"All Day";return`${m} at ${B}`},r=async()=>{try{const e=await L.get(`/api/public/matchmaker/clients/${n.matchmaker.id}`);e.data.success&&(d.value=e.data.data)}catch(e){console.error("Error fetching clients:",e)}};return C(()=>{r()}),{clients:d,expandBio:o,hasLongBio:f,profileImage:p,location:b,displayedClients:u,limitedAvailability:g,formatAvailability:x}}},_=n=>(D("data-v-b7cad294"),n=n(),I(),n),E={class:"profile-card bg-white rounded-lg shadow-lg overflow-hidden"},j={class:"profile-image w-full h-56 overflow-hidden"},N=["src","alt"],M={class:"profile-info p-4"},P={class:"text-xl font-semibold text-gray-800 mb-2 truncate"},V={class:"info-grid mb-3"},q={key:0,class:"flex items-center text-sm"},z=_(()=>t("span",{class:"font-medium mr-2"},"📍",-1)),F={class:"truncate"},G={key:1,class:"flex items-center text-sm"},O=_(()=>t("span",{class:"font-medium mr-2"},"Age:",-1)),X={key:2,class:"flex items-center text-sm"},Y=_(()=>t("span",{class:"font-medium mr-2"},"Experience:",-1)),Z={class:"bio-section mb-3"},H={key:0,class:"mb-3"},J=_(()=>t("h4",{class:"text-sm font-medium text-gray-700 mb-2"},"Clients",-1)),K={class:"flex flex-wrap gap-2"},Q=["src","alt"],R={class:"client-info absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded"},U={key:1,class:"availability-section"},W=_(()=>t("h4",{class:"text-sm font-medium text-gray-700 mb-1"},"Available Times",-1)),$={class:"availability-container max-h-20 overflow-y-auto"},ee={class:"text-xs text-gray-600 space-y-1"};function te(n,d,o,a,p,b){var f,u,g,x;return i(),s("div",E,[t("div",j,[t("img",{src:a.profileImage,alt:o.matchmaker.name,class:"w-full h-full object-cover transition-transform duration-300 hover:scale-105"},null,8,N)]),t("div",M,[t("h3",P,c(o.matchmaker.name),1),t("div",V,[a.location?(i(),s("p",q,[z,t("span",F,c(a.location),1)])):l("",!0),(f=o.matchmaker.profile)!=null&&f.age?(i(),s("p",G,[O,v(" "+c(o.matchmaker.profile.age),1)])):l("",!0),(u=o.matchmaker.profile)!=null&&u.yearsexperience?(i(),s("p",X,[Y,v(" "+c(o.matchmaker.profile.yearsexperience)+" years ",1)])):l("",!0)]),t("div",Z,[(g=o.matchmaker.profile)!=null&&g.bio?(i(),s("p",{key:0,class:A(["text-sm text-gray-600",{"line-clamp-3":!a.expandBio}])},c(o.matchmaker.profile.bio),3)):l("",!0),a.hasLongBio?(i(),s("button",{key:1,onClick:d[0]||(d[0]=r=>a.expandBio=!a.expandBio),class:"text-xs text-blue-500 mt-1 hover:underline"},c(a.expandBio?"Show Less":"Show More"),1)):l("",!0)]),a.clients.length?(i(),s("div",H,[J,t("div",K,[(i(!0),s(k,null,w(a.displayedClients,r=>(i(),s("div",{key:r.id,class:"client-thumbnail relative"},[t("img",{src:r.thumbnail_image||"/upload/images/profiles/default-client-image.png",alt:r.name,class:"w-10 h-10 rounded-full object-cover border-2 border-white"},null,8,Q),t("div",R,c(r.age),1)]))),128))])])):l("",!0),(x=o.matchmaker.availability)!=null&&x.length?(i(),s("div",U,[W,t("div",$,[t("div",ee,[(i(!0),s(k,null,w(a.limitedAvailability,(r,e)=>(i(),s("p",{key:e,class:"line-clamp-1"},c(a.formatAvailability(r)),1))),128))])])])):l("",!0)])])}const ie=S(T,[["render",te],["__scopeId","data-v-b7cad294"]]);export{ie as m};
