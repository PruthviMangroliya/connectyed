import{_ as b,M as S,x as g,e as n,f as i,n as y,F as f,z as k,t as l,k as w,L as T,i as _,g as v,m as D,o as c,q as x,s as A}from"./app-DHpn0u2P.js";import{M as z,p as h,i as M,f as p}from"./Messaging-Cho4O947.js";const C={name:"Communication",components:{Messaging:z},data(){return{currentTab:"schedule",matchmakers:[],selectedMatchmaker:null,selectedTimeSlot:null,clientMeetings:[],processing:!1,allTimeSlots:[],searchQuery:"",showDropdown:!1,duration:30,selectedClients:[],clients:[]}},computed:{...S({user:e=>e.auth.user,authorization:e=>e.auth.authorization}),isAuthenticated(){return!!this.authorization&&!!this.authorization.token},validTimeSlots(){return this.selectedMatchmaker&&this.selectedMatchmaker.availability.length?this.selectedMatchmaker.availability:[]},filteredClients(){const e=this.searchQuery.toLowerCase();return this.clients.filter(s=>s.name&&s.name.toLowerCase().includes(e)&&!this.selectedClients.find(a=>a.id===s.id))},minDateTime(){return new Date().toISOString().slice(0,16)}},watch:{isAuthenticated(e){e&&(this.fetchMatchmakers(),this.getUpcomingMeetings(),this.getClients())}},created(){const s=new URLSearchParams(window.location.search).get("token");s?(g.defaults.headers.common.Authorization=`Bearer ${s}`,g.get("/api/user/introspect",{headers:{Authorization:`Bearer ${s}`}}).then(a=>{const r={user:a.data.user,authorization:{token:s}};this.$store.dispatch("auth/setAuth",r),window.history.replaceState({},document.title,"/matchmaker/communication")}).catch(a=>{console.error("Error fetching user data:",a),alert("Failed to authenticate. Please log in again."),this.$router.push("/login")})):this.$store.dispatch("auth/initialize")},mounted(){this.isAuthenticated&&(this.fetchMatchmakers(),this.getUpcomingMeetings(),this.getClients()),console.log("User:",this.user),console.log("Authorization:",this.authorization)},methods:{async fetchMatchmakers(){if(this.isAuthenticated){this.processing=!0;try{const e=await g.get("/api/matchmakers",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.matchmakers=e.data.data,console.log("Matchmakers:",this.matchmakers)):(console.error("Failed to fetch matchmakers:",e.data.message),alert("Failed to fetch matchmakers. Please try again later."))}catch(e){console.error("Error fetching matchmakers:",e),alert("An error occurred while fetching matchmakers.")}finally{this.processing=!1}}},selectMatchmaker(e){this.selectedMatchmaker=e,this.selectedTimeSlot=null,this.prepareAllTimeSlots()},prepareAllTimeSlots(){this.allTimeSlots=[],this.validTimeSlots.forEach(e=>{const s=h(e.start_date),a=h(e.end_date);if(!M(s)||!M(a)||s>a){console.warn(`Invalid date range for availability ID ${e.id}. Skipping.`);return}let r=new Date(s);for(;r<=a;){const t=p(r,"yyyy-MM-dd"),d=p(r,"EEEE, MMMM d, yyyy");if(e.is_all_day)this.allTimeSlots.push({id:`${e.id}-${t}-all-day`,display:`${d} - All Day`,day:t,slot:null,duration:1440,start_time:null,end_time:null});else{const u=p(h(`${t}T${e.start_time}`),"hh:mm a"),o=p(h(`${t}T${e.end_time}`),"hh:mm a");this.allTimeSlots.push({id:`${e.id}-${t}-${e.start_time}-${e.end_time}`,display:`${d} - ${u} to ${o}`,day:t,slot:{start:h(`${t}T${e.start_time}`),end:h(`${t}T${e.end_time}`)},duration:this.calculateDuration(e.start_time,e.end_time),start_time:e.start_time,end_time:e.end_time})}r.setDate(r.getDate()+1)}}),this.allTimeSlots.sort((e,s)=>{const a=new Date(e.day),r=new Date(s.day);return a<r?-1:a>r?1:e.slot&&s.slot?e.slot.start-s.slot.start:e.slot?-1:s.slot?1:0})},calculateDuration(e,s){const[a,r]=e.split(":").map(Number),[t,d]=s.split(":").map(Number),u=new Date;u.setHours(a,r,0,0);const o=new Date;return o.setHours(t,d,0,0),(o-u)/6e4},async proceedToPayment(){if(!this.selectedMatchmaker||!this.selectedTimeSlot){alert("Please select a matchmaker and a time slot before proceeding to payment.");return}const e=this.selectedTimeSlot;let s,a;e.slot?(s=e.slot.start.toISOString(),a=e.duration):(s=new Date(`${e.day}T00:00:00`).toISOString(),a=1440),this.processing=!0;try{console.log("Creating checkout session with the following data:"),console.log("Matchmaker ID:",this.selectedMatchmaker.id),console.log("Start Time:",s),console.log("Duration:",a);const r=await g.post("/api/google/create-meeting",{matchmaker_id:this.selectedMatchmaker.id,client_ids:[this.user.id],start_time:s,duration:a},{headers:{Authorization:`Bearer ${this.authorization.token}`}});if(r.data.success){const{payment_link:t}=r.data.data;alert("🔗 Redirecting to payment..."),window.location.href=t}else console.error("Failed to create checkout session:",r.data.message),alert(`Error: ${r.data.message||"Failed to create checkout session."}`)}catch(r){console.error("Error creating checkout session:",r),alert("An error occurred while creating the checkout session.")}finally{this.processing=!1}},formatDate(e){return p(h(e),"EEEE, MMMM d, yyyy h:mm a")},async getUpcomingMeetings(){if(this.isAuthenticated)try{const e=await g.get("/api/google/upcoming-meetings",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.clientMeetings=e.data.data,console.log("Upcoming Meetings:",this.clientMeetings)):(console.error("Failed to fetch upcoming meetings:",e.data.message),alert("Failed to fetch upcoming meetings. Please try again later."))}catch(e){console.error("Error fetching upcoming meetings:",e),alert("An error occurred while fetching upcoming meetings.")}},async getClients(){if(this.isAuthenticated)try{const e=await g.get("/api/clients",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.clients=e.data.data,console.log("Clients:",this.clients)):(console.error("Failed to fetch clients:",e.data.message),alert("Failed to fetch clients. Please try again later."))}catch(e){console.error("Error fetching clients:",e),alert("An error occurred while fetching clients.")}}}},m=e=>(x("data-v-57308ca5"),e=e(),A(),e),E={class:"container mx-auto p-4"},P={key:0},I={class:"tabs mb-6"},F={key:0},U={class:"mb-6"},B=m(()=>i("h3",{class:"text-lg font-semibold mb-2"},"Select a Matchmaker",-1)),$={key:0,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},N={class:"font-bold text-md mb-1"},L={class:"text-sm text-gray-600 mb-2"},O=["onClick","disabled"],V={key:1,class:"text-gray-600"},H={key:0,class:"mb-6"},q={class:"text-lg font-semibold mb-2"},Q={key:0,class:"space-y-4"},R={class:"bg-gray-50 p-4 rounded-lg shadow"},G=m(()=>i("label",{class:"block text-gray-700 font-bold mb-2",for:"timeSlot"},"Select a Time Slot:",-1)),J=m(()=>i("option",{disabled:"",value:""},"Please select a time slot",-1)),j=["value"],K={key:1,class:"text-gray-600"},W={key:1,class:"mb-6"},X=m(()=>i("h3",{class:"text-lg font-semibold mb-2"},"Proceed to Payment",-1)),Y=["disabled"],Z={key:1},ee=m(()=>i("h2",{class:"text-xl font-semibold mb-4"},"Upcoming Meetings",-1)),te={key:0,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"},se={class:"text-lg font-bold mb-2"},oe={class:"text-gray-700"},ie={class:"text-gray-700"},ae={key:0,class:"mt-4"},re=["href"],ne={class:"mt-4"},ce=m(()=>i("h4",{class:"font-semibold mb-1"},"Matchmaker:",-1)),le={key:1,class:"text-gray-600"},de={class:"mt-8"},he={key:1,class:"text-center py-10"},me=m(()=>i("p",null,"Loading...",-1)),ue=[me];function ge(e,s,a,r,t,d){const u=D("Messaging");return c(),n("div",E,[d.isAuthenticated?(c(),n("div",P,[i("div",I,[i("button",{onClick:s[0]||(s[0]=o=>t.currentTab="schedule"),class:y([{active:t.currentTab==="schedule"},"tab-button"])}," Schedule a Meeting ",2),i("button",{onClick:s[1]||(s[1]=o=>t.currentTab="upcoming"),class:y([{active:t.currentTab==="upcoming"},"tab-button"])}," Upcoming Meetings ",2)]),t.currentTab==="schedule"?(c(),n("div",F,[i("div",U,[B,t.matchmakers.length?(c(),n("div",$,[(c(!0),n(f,null,k(t.matchmakers,o=>(c(),n("div",{key:o.id,class:"bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-200"},[i("h4",N,l(o.name),1),i("p",L,l(o.email),1),i("button",{onClick:_e=>d.selectMatchmaker(o),disabled:t.selectedMatchmaker&&t.selectedMatchmaker.id===o.id,class:"w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition duration-200"},l(t.selectedMatchmaker&&t.selectedMatchmaker.id===o.id?"Selected":"Select"),9,O)]))),128))])):(c(),n("div",V,"No matchmakers available at the moment."))]),t.selectedMatchmaker?(c(),n("div",H,[i("h3",q,"Available Time Slots for "+l(t.selectedMatchmaker.name),1),t.allTimeSlots.length?(c(),n("div",Q,[i("div",R,[G,w(i("select",{id:"timeSlot","onUpdate:modelValue":s[2]||(s[2]=o=>t.selectedTimeSlot=o),class:"w-full border border-gray-300 rounded p-2",required:""},[J,(c(!0),n(f,null,k(t.allTimeSlots,o=>(c(),n("option",{key:o.id,value:o},l(o.display),9,j))),128))],512),[[T,t.selectedTimeSlot]])])])):(c(),n("div",K,"No available time slots for this matchmaker."))])):_("",!0),t.selectedTimeSlot?(c(),n("div",W,[X,i("button",{onClick:s[3]||(s[3]=(...o)=>d.proceedToPayment&&d.proceedToPayment(...o)),class:"w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200",disabled:t.processing},l(t.processing?"Processing...":"Pay and Schedule Meeting"),9,Y)])):_("",!0)])):_("",!0),t.currentTab==="upcoming"?(c(),n("div",Z,[ee,t.clientMeetings.length?(c(),n("div",te,[(c(!0),n(f,null,k(t.clientMeetings,o=>(c(),n("div",{key:o.id,class:"bg-white rounded-lg shadow-md p-6"},[i("h3",se,"Meeting ID: "+l(o.google_meet_id),1),i("p",oe,"Start Time: "+l(d.formatDate(o.start_time)),1),i("p",ie,"Duration: "+l(o.duration)+" minutes",1),o.google_meet_link?(c(),n("div",ae,[i("a",{href:o.google_meet_link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-600 hover:text-blue-800 underline"}," Join Google Meet ",8,re)])):_("",!0),i("div",ne,[ce,i("p",null,l(o.matchmaker.name)+" ("+l(o.matchmaker.email)+")",1)])]))),128))])):(c(),n("div",le,"No upcoming meetings found."))])):_("",!0),i("div",de,[v(u,{currentUser:e.user,authorization:e.authorization},null,8,["currentUser","authorization"])])])):(c(),n("div",he,ue))])}const ke=b(C,[["render",ge],["__scopeId","data-v-57308ca5"]]);export{ke as default};