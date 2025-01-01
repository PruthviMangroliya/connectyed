import{_ as l,M as c,x as s,e as d,f as e,t as h,o as u,q as p,s as g}from"./app-DHpn0u2P.js";const m={name:"Billing",data(){return{totalEarnings:0}},computed:{...c({authToken:t=>t.auth.authorization.token})},mounted(){this.fetchEarnings()},methods:{async fetchEarnings(){try{const t=await s.get("/api/matchmaker/earnings",{headers:{Authorization:`Bearer ${this.authToken}`}});this.totalEarnings=t.data.totalEarnings}catch(t){console.error("Error fetching earnings:",t)}},async requestWithdrawal(){try{const t=await s.post("/api/matchmaker/request-withdrawal",{},{headers:{Authorization:`Bearer ${this.authToken}`}});alert("Withdrawal request sent successfully.")}catch(t){console.error("Error requesting withdrawal:",t),alert("An error occurred while requesting withdrawal.")}}}},o=t=>(p("data-v-9e0fd454"),t=t(),g(),t),w=o(()=>e("h2",{class:"text-xl font-bold mb-4"},"Billing",-1)),f=o(()=>e("h2",{class:"text-xl font-semibold mt-6"},"Earnings",-1));function _(t,a,x,E,n,r){return u(),d("div",null,[w,f,e("p",null,"Total Earnings: $"+h(n.totalEarnings.toFixed(2)),1),e("button",{onClick:a[0]||(a[0]=(...i)=>r.requestWithdrawal&&r.requestWithdrawal(...i)),class:"mt-4 py-2 px-4 bg-green-500 text-white rounded"}," Request Withdrawal ")])}const q=l(m,[["render",_],["__scopeId","data-v-9e0fd454"]]);export{q as default};
