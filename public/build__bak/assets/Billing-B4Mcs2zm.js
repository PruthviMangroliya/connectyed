import{_ as m,x as h,e as n,f as t,t as i,k as u,v as g,F as p,z as w,i as x,o as r,n as b}from"./app-Cq5k9qoS.js";import{f as _}from"./index-_1v56OQN.js";const y={name:"MatchmakerBilling",data(){return{availableBalance:0,totalEarned:0,pendingEarnings:0,withdrawalEmail:"",withdrawalAmount:null,recentEarnings:[],loading:!1}},computed:{canRequestWithdrawal(){return this.withdrawalEmail&&this.withdrawalAmount>0&&this.withdrawalAmount<=this.availableBalance}},methods:{formatDate(a){return _(new Date(a),"MMM d, yyyy")},getStatusClass(a){return{pending:"bg-yellow-100 text-yellow-800",available:"bg-green-100 text-green-800",withdrawn:"bg-blue-100 text-blue-800"}[a]||"bg-gray-100 text-gray-800"},async fetchEarnings(){try{this.loading=!0;const a=await h.get("/api/matchmaker/earnings");if(a.data.success&&a.data.data){const{availableBalance:l,totalEarned:d,pendingEarnings:c,recentEarnings:e}=a.data.data;this.availableBalance=l||0,this.totalEarned=d||0,this.pendingEarnings=c||0,this.recentEarnings=e||[]}}catch(a){console.error("Error fetching earnings:",a),this.$toast.error("Failed to fetch earnings data"),this.availableBalance=0,this.totalEarned=0,this.pendingEarnings=0,this.recentEarnings=[]}finally{this.loading=!1}},async requestWithdrawal(){if(this.canRequestWithdrawal)try{this.loading=!0,await h.post("/api/matchmaker/request-withdrawal",{amount:this.withdrawalAmount,payment_email:this.withdrawalEmail}),this.$toast.success("Withdrawal request submitted successfully"),this.withdrawalAmount=null,await this.fetchEarnings()}catch(a){console.error("Error requesting withdrawal:",a),this.$toast.error("Failed to submit withdrawal request")}finally{this.loading=!1}}},mounted(){this.fetchEarnings()}},f={class:"p-6"},v=t("h2",{class:"text-2xl font-bold mb-6"},"Billing & Earnings",-1),E={class:"bg-white rounded-lg shadow p-6 mb-6"},k={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},B={class:"bg-blue-50 p-4 rounded-lg"},q=t("h3",{class:"text-lg font-semibold text-blue-900"},"Available Balance",-1),A={class:"text-2xl font-bold text-blue-600"},W={class:"bg-green-50 p-4 rounded-lg"},F=t("h3",{class:"text-lg font-semibold text-green-900"},"Total Earned",-1),M={class:"text-2xl font-bold text-green-600"},D={class:"bg-purple-50 p-4 rounded-lg"},R=t("h3",{class:"text-lg font-semibold text-purple-900"},"Pending Earnings",-1),C={class:"text-2xl font-bold text-purple-600"},P={class:"bg-white rounded-lg shadow p-6 mb-6"},N=t("h3",{class:"text-xl font-semibold mb-4"},"Request Withdrawal",-1),S={key:0,class:"space-y-4"},V=t("label",{class:"block text-sm font-medium text-gray-700"},"PayPal Email",-1),z=t("label",{class:"block text-sm font-medium text-gray-700"},"Amount to Withdraw",-1),T=["max"],U=["disabled"],L={key:1,class:"text-center text-gray-500 py-4"},j={class:"bg-white rounded-lg shadow p-6"},G=t("h3",{class:"text-xl font-semibold mb-4"},"Recent Earnings",-1),H={class:"overflow-x-auto"},I={class:"min-w-full divide-y divide-gray-200"},J=t("thead",null,[t("tr",null,[t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Date"),t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Meeting"),t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Amount"),t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Status")])],-1),K={class:"bg-white divide-y divide-gray-200"},O={class:"px-6 py-4 whitespace-nowrap text-sm"},Q={class:"px-6 py-4 whitespace-nowrap text-sm"},X={class:"px-6 py-4 whitespace-nowrap text-sm"},Y={class:"px-6 py-4 whitespace-nowrap"},Z={key:0,class:"text-center text-gray-500 py-8"};function $(a,l,d,c,e,o){return r(),n("div",f,[v,t("div",E,[t("div",k,[t("div",B,[q,t("p",A,"$"+i(e.availableBalance.toFixed(2)),1)]),t("div",W,[F,t("p",M,"$"+i(e.totalEarned.toFixed(2)),1)]),t("div",D,[R,t("p",C,"$"+i(e.pendingEarnings.toFixed(2)),1)])])]),t("div",P,[N,e.availableBalance>0?(r(),n("div",S,[t("div",null,[V,u(t("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>e.withdrawalEmail=s),type:"email",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",placeholder:"Enter your PayPal email"},null,512),[[g,e.withdrawalEmail]])]),t("div",null,[z,u(t("input",{"onUpdate:modelValue":l[1]||(l[1]=s=>e.withdrawalAmount=s),type:"number",min:"0",max:e.availableBalance,class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",placeholder:"Enter amount"},null,8,T),[[g,e.withdrawalAmount,void 0,{number:!0}]])]),t("button",{onClick:l[2]||(l[2]=(...s)=>o.requestWithdrawal&&o.requestWithdrawal(...s)),class:"w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400",disabled:!o.canRequestWithdrawal}," Request Withdrawal ",8,U)])):(r(),n("div",L," No funds available for withdrawal "))]),t("div",j,[G,t("div",H,[t("table",I,[J,t("tbody",K,[(r(!0),n(p,null,w(e.recentEarnings,s=>(r(),n("tr",{key:s.id},[t("td",O,i(o.formatDate(s.created_at)),1),t("td",Q,"Meeting #"+i(s.meeting_id),1),t("td",X,"$"+i(s.amount.toFixed(2)),1),t("td",Y,[t("span",{class:b(["px-2 py-1 text-xs rounded-full",o.getStatusClass(s.status)])},i(s.status),3)])]))),128))])]),e.recentEarnings.length===0?(r(),n("div",Z," No earnings to display ")):x("",!0)])])])}const at=m(y,[["render",$]]);export{at as default};