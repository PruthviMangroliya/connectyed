import{_ as l,e as n,f as s,t as e,F as d,z as c,o as i}from"./app-Cq5k9qoS.js";const a={name:"Overview",data(){return{totalClients:24,activeMatches:8,pendingRequests:3,upcomingMeeting:{name:"John Doe",time:"2 PM on September 22, 2024"},successRate:60,recentClients:[{id:1,name:"Jane Smith",joinedAt:"2024-09-20"},{id:2,name:"John Doe",joinedAt:"2024-09-18"},{id:3,name:"Mary Johnson",joinedAt:"2024-09-17"}],recentActivity:[{id:1,message:"Added Jane Smith to the system."},{id:2,message:"Matched John Doe with Mary Johnson."},{id:3,message:"Completed consultation with Michael Brown."}]}}},h={class:"p-6"},_=s("h1",{class:"text-3xl font-bold mb-6"},"Matchmaker Dashboard",-1),m={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"},r={class:"bg-white shadow-sm rounded-lg p-6"},g=s("h2",{class:"text-xl font-bold mb-2"},"Total Clients",-1),p={class:"text-4xl font-semibold"},u={class:"bg-white shadow-sm rounded-lg p-6"},b=s("h2",{class:"text-xl font-bold mb-2"},"Active Matches",-1),x={class:"text-4xl font-semibold"},f={class:"bg-white shadow-sm rounded-lg p-6"},w=s("h2",{class:"text-xl font-bold mb-2"},"Pending Match Requests",-1),v={class:"text-4xl font-semibold"},M={class:"bg-white shadow-sm rounded-lg p-6"},A=s("h2",{class:"text-xl font-bold mb-2"},"Upcoming Meetings",-1),y={class:"bg-white shadow-sm rounded-lg p-6"},R=s("h2",{class:"text-xl font-bold mb-2"},"Match Success Rate",-1),C={class:"text-4xl font-semibold"},J={class:"bg-white shadow-sm rounded-lg p-6"},k=s("h2",{class:"text-xl font-bold mb-2"},"Recently Added Clients",-1),D={class:"list-disc list-inside"},S={class:"bg-white shadow-sm rounded-lg p-6 mt-6"},j=s("h2",{class:"text-xl font-bold mb-4"},"Recent Activity",-1),B={class:"list-disc list-inside"};function q(F,O,P,z,t,E){return i(),n("div",h,[_,s("div",m,[s("div",r,[g,s("p",p,e(t.totalClients),1)]),s("div",u,[b,s("p",x,e(t.activeMatches),1)]),s("div",f,[w,s("p",v,e(t.pendingRequests),1)]),s("div",M,[A,s("p",null,e(t.upcomingMeeting.name)+" - "+e(t.upcomingMeeting.time),1)]),s("div",y,[R,s("p",C,e(t.successRate)+"%",1)]),s("div",J,[k,s("ul",D,[(i(!0),n(d,null,c(t.recentClients,o=>(i(),n("li",{key:o.id},e(o.name)+" - "+e(o.joinedAt),1))),128))])])]),s("div",S,[j,s("ul",B,[(i(!0),n(d,null,c(t.recentActivity,o=>(i(),n("li",{key:o.id},e(o.message),1))),128))])])])}const N=l(a,[["render",q]]);export{N as default};
