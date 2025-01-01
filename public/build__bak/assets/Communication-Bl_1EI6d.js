import{_ as T,M as v,x as _,e as a,f as o,n as b,F as k,z as y,t as c,k as M,L as C,i as u,v as x,g as D,K as z,m as w,o as r,q as A,s as E}from"./app-Cq5k9qoS.js";import{M as P,S as U,p as m}from"./Support-DfPRtQU9.js";import{i as S,f}from"./index-_1v56OQN.js";const I={name:"Communication",components:{Messaging:P,Support:U},data(){return{showSupport:!1,currentTab:"schedule",matchmakers:[],selectedMatchmaker:null,selectedTimeSlot:null,clientMeetings:[],processing:!1,allTimeSlots:[],searchQuery:"",showDropdown:!1,duration:30,selectedClients:[],clients:[],discountCode:"",googleTagLoaded:!1}},computed:{...v({user:e=>e.auth.user,authorization:e=>e.auth.authorization}),isAuthenticated(){return!!this.authorization&&!!this.authorization.token},validTimeSlots(){return this.selectedMatchmaker&&this.selectedMatchmaker.availability.length?this.selectedMatchmaker.availability:[]},filteredClients(){const e=this.searchQuery.toLowerCase();return this.clients.filter(t=>t.name&&t.name.toLowerCase().includes(e)&&!this.selectedClients.find(n=>n.id===t.id))},minDateTime(){return new Date().toISOString().slice(0,16)}},watch:{isAuthenticated(e){e&&(this.fetchMatchmakers(),this.getUpcomingMeetings(),this.getClients())}},created(){const t=new URLSearchParams(window.location.search).get("token");t?(_.defaults.headers.common.Authorization=`Bearer ${t}`,_.get("/api/user/introspect",{headers:{Authorization:`Bearer ${t}`}}).then(n=>{const l={user:n.data.user,authorization:{token:t}};this.$store.dispatch("auth/setAuth",l),window.history.replaceState({},document.title,"/matchmaker/communication")}).catch(n=>{console.error("Error fetching user data:",n),alert("Failed to authenticate. Please log in again."),this.$router.push("/login")})):this.$store.dispatch("auth/initialize")},mounted(){this.isAuthenticated&&(this.fetchMatchmakers(),this.getUpcomingMeetings(),this.getClients()),console.log("User:",this.user),console.log("Authorization:",this.authorization),this.loadGoogleTag()},methods:{async fetchMatchmakers(){if(this.isAuthenticated){this.processing=!0;try{const e=await _.get("/api/matchmakers",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.matchmakers=e.data.data,console.log("Matchmakers:",this.matchmakers)):(console.error("Failed to fetch matchmakers:",e.data.message),alert("Failed to fetch matchmakers. Please try again later."))}catch(e){console.error("Error fetching matchmakers:",e),alert("An error occurred while fetching matchmakers.")}finally{this.processing=!1}}},selectMatchmaker(e){this.selectedMatchmaker=e,this.selectedTimeSlot=null,this.prepareAllTimeSlots()},prepareAllTimeSlots(){this.allTimeSlots=[],this.validTimeSlots.forEach(e=>{const t=m(e.start_date),n=m(e.end_date);if(!S(t)||!S(n)||t>n){console.warn(`Invalid date range for availability ID ${e.id}. Skipping.`);return}let l=new Date(t);for(;l<=n;){const s=f(l,"yyyy-MM-dd"),d=f(l,"EEEE, MMMM d, yyyy");if(e.is_all_day)this.allTimeSlots.push({id:`${e.id}-${s}-all-day`,display:`${d} - All Day`,day:s,slot:null,duration:1440,start_time:null,end_time:null});else{const g=f(m(`${s}T${e.start_time}`),"hh:mm a"),p=f(m(`${s}T${e.end_time}`),"hh:mm a");this.allTimeSlots.push({id:`${e.id}-${s}-${e.start_time}-${e.end_time}`,display:`${d} - ${g} to ${p}`,day:s,slot:{start:m(`${s}T${e.start_time}`),end:m(`${s}T${e.end_time}`)},duration:this.calculateDuration(e.start_time,e.end_time),start_time:e.start_time,end_time:e.end_time})}l.setDate(l.getDate()+1)}}),this.allTimeSlots.sort((e,t)=>{const n=new Date(e.day),l=new Date(t.day);return n<l?-1:n>l?1:e.slot&&t.slot?e.slot.start-t.slot.start:e.slot?-1:t.slot?1:0})},calculateDuration(e,t){const[n,l]=e.split(":").map(Number),[s,d]=t.split(":").map(Number),g=new Date;g.setHours(n,l,0,0);const p=new Date;return p.setHours(s,d,0,0),(p-g)/6e4},async proceedToPayment(){if(!this.selectedMatchmaker||!this.selectedTimeSlot){alert("Please select a matchmaker and a time slot before proceeding to payment.");return}const e=this.selectedTimeSlot;let t,n;e.slot?(t=e.slot.start.toISOString(),n=e.duration):(t=new Date(`${e.day}T00:00:00`).toISOString(),n=1440),this.processing=!0;try{console.log("Creating checkout session with the following data:"),console.log("Matchmaker ID:",this.selectedMatchmaker.id),console.log("Start Time:",t),console.log("Duration:",n),console.log("Discount Code:",this.discountCode.trim()||"None");const l=await _.post("/api/google/create-meeting",{matchmaker_id:this.selectedMatchmaker.id,client_ids:[this.user.id],start_time:t,duration:n,discount_code:this.discountCode.trim()||null},{headers:{Authorization:`Bearer ${this.authorization.token}`}});if(l.data.success){const{payment_link:s}=l.data.data;alert("Meeting Created Successfully...Check your inbox after making payment! 🛒 Redirecting to payment..."),window.location.href=s}else console.error("Failed to create checkout session:",l.data.message),alert(`Error: ${l.data.message||"Failed to create checkout session."}`)}catch(l){console.error("Error creating checkout session:",l),alert("An error occurred while creating the checkout session.")}finally{this.processing=!1}},formatDate(e){return f(m(e),"EEEE, MMMM d, yyyy h:mm a")},async getUpcomingMeetings(){if(this.isAuthenticated)try{const e=await _.get("/api/google/upcoming-meetings",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.clientMeetings=e.data.data,console.log("Upcoming Meetings:",this.clientMeetings)):(console.error("Failed to fetch upcoming meetings:",e.data.message),alert("Failed to fetch upcoming meetings. Please try again later."))}catch(e){console.error("Error fetching upcoming meetings:",e),alert("An error occurred while fetching upcoming meetings.")}},async getClients(){if(this.isAuthenticated)try{const e=await _.get("/api/clients",{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.data.success?(this.clients=e.data.data,console.log("Clients:",this.clients)):(console.error("Failed to fetch clients:",e.data.message),alert("Failed to fetch clients. Please try again later."))}catch(e){console.error("Error fetching clients:",e),alert("An error occurred while fetching clients.")}},loadGoogleTag(){if(this.googleTagLoaded)return;const e=document.createElement("script");e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=AW-16739328770",document.head.appendChild(e);const t=document.createElement("script");t.innerHTML=`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16739328770');
      `,document.head.appendChild(t),this.googleTagLoaded=!0}}},h=e=>(A("data-v-99e7bd7e"),e=e(),E(),e),L={class:"container mx-auto p-4"},B={key:0},F={class:"tabs mb-6"},N={key:0},H={class:"mb-6"},V=h(()=>o("h3",{class:"text-lg font-semibold mb-2"},"Select a Matchmaker",-1)),O={key:0,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},$={class:"font-bold text-md mb-1"},q={class:"text-sm text-gray-600 mb-2"},G=["onClick","disabled"],j={key:1,class:"text-gray-600"},Q={key:0,class:"mb-6"},R={class:"text-lg font-semibold mb-2"},W={key:0,class:"space-y-4"},J={class:"bg-gray-50 p-4 rounded-lg shadow"},K=h(()=>o("label",{class:"block text-gray-700 font-bold mb-2",for:"timeSlot"},"Select a Time Slot:",-1)),X=h(()=>o("option",{disabled:"",value:""},"Please select a time slot",-1)),Y=["value"],Z={key:1,class:"text-gray-600"},ee={key:1,class:"mb-4"},te={class:"bg-gray-50 p-4 rounded-lg shadow"},se=h(()=>o("label",{class:"block text-gray-700 font-bold mb-2",for:"discountCode"}," Have a discount code? ",-1)),oe={key:2,class:"mb-6"},ie=h(()=>o("h3",{class:"text-lg font-semibold mb-2"},"Proceed to Payment",-1)),re=["disabled"],ae={key:1},ne=h(()=>o("h2",{class:"text-xl font-semibold mb-4"},"Upcoming Meetings",-1)),le={key:0,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"},ce={class:"text-lg font-bold mb-2"},de={class:"text-gray-700"},he={class:"text-gray-700"},ue={key:0,class:"mt-4"},me=["href"],ge={class:"mt-4"},pe=h(()=>o("h4",{class:"font-semibold mb-1"},"Matchmaker:",-1)),_e={key:1,class:"text-gray-600"},fe={class:"mt-8"},ke={key:1,class:"text-center py-10"},ye=h(()=>o("p",null,"Loading...",-1)),be=[ye],Me={class:"fixed bottom-4 right-4 z-50"},we=h(()=>o("span",{class:"material-icons"},null,-1)),Se=h(()=>o("span",null,"Support",-1)),Te=[we,Se];function ve(e,t,n,l,s,d){const g=w("Messaging"),p=w("Support");return r(),a("div",L,[d.isAuthenticated?(r(),a("div",B,[o("div",F,[o("button",{onClick:t[0]||(t[0]=i=>s.currentTab="schedule"),class:b([{active:s.currentTab==="schedule"},"tab-button"])}," Schedule a Meeting ",2),o("button",{onClick:t[1]||(t[1]=i=>s.currentTab="upcoming"),class:b([{active:s.currentTab==="upcoming"},"tab-button"])}," Upcoming Meetings ",2)]),s.currentTab==="schedule"?(r(),a("div",N,[o("div",H,[V,s.matchmakers.length?(r(),a("div",O,[(r(!0),a(k,null,y(s.matchmakers,i=>(r(),a("div",{key:i.id,class:"bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-200"},[o("h4",$,c(i.name),1),o("p",q,c(i.email),1),o("button",{onClick:Ce=>d.selectMatchmaker(i),disabled:s.selectedMatchmaker&&s.selectedMatchmaker.id===i.id,class:"w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition duration-200"},c(s.selectedMatchmaker&&s.selectedMatchmaker.id===i.id?"Selected":"Select"),9,G)]))),128))])):(r(),a("div",j,"No matchmakers available at the moment."))]),s.selectedMatchmaker?(r(),a("div",Q,[o("h3",R,"Available Time Slots for "+c(s.selectedMatchmaker.name),1),s.allTimeSlots.length?(r(),a("div",W,[o("div",J,[K,M(o("select",{id:"timeSlot","onUpdate:modelValue":t[2]||(t[2]=i=>s.selectedTimeSlot=i),class:"w-full border border-gray-300 rounded p-2",required:""},[X,(r(!0),a(k,null,y(s.allTimeSlots,i=>(r(),a("option",{key:i.id,value:i},c(i.display),9,Y))),128))],512),[[C,s.selectedTimeSlot]])])])):(r(),a("div",Z,"No available time slots for this matchmaker."))])):u("",!0),s.selectedTimeSlot?(r(),a("div",ee,[o("div",te,[se,M(o("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>s.discountCode=i),type:"text",id:"discountCode",placeholder:"Enter your discount code",class:"w-full border border-gray-300 rounded p-2"},null,512),[[x,s.discountCode]])])])):u("",!0),s.selectedTimeSlot?(r(),a("div",oe,[ie,o("button",{onClick:t[4]||(t[4]=(...i)=>d.proceedToPayment&&d.proceedToPayment(...i)),class:"w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200",disabled:s.processing},c(s.processing?"Processing...":"Pay and Schedule Meeting"),9,re)])):u("",!0)])):u("",!0),s.currentTab==="upcoming"?(r(),a("div",ae,[ne,s.clientMeetings.length?(r(),a("div",le,[(r(!0),a(k,null,y(s.clientMeetings,i=>(r(),a("div",{key:i.id,class:"bg-white rounded-lg shadow-md p-6"},[o("h3",ce,"Meeting ID: "+c(i.google_meet_id),1),o("p",de,"Start Time: "+c(d.formatDate(i.start_time)),1),o("p",he,"Duration: "+c(i.duration)+" minutes",1),i.google_meet_link?(r(),a("div",ue,[o("a",{href:i.google_meet_link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-600 hover:text-blue-800 underline"}," Join Google Meet ",8,me)])):u("",!0),o("div",ge,[pe,o("p",null,c(i.matchmaker.name)+" ("+c(i.matchmaker.email)+")",1)])]))),128))])):(r(),a("div",_e,"No upcoming meetings found."))])):u("",!0),o("div",fe,[D(g,{currentUser:e.user,authorization:e.authorization},null,8,["currentUser","authorization"])])])):(r(),a("div",ke,be)),o("div",Me,[o("button",{onClick:t[5]||(t[5]=i=>s.showSupport=!0),class:"px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg transition duration-200 flex items-center space-x-2"},Te)]),s.showSupport?(r(),z(p,{key:2,currentUser:e.user,authorization:e.authorization,onClose:t[6]||(t[6]=i=>s.showSupport=!1)},null,8,["currentUser","authorization"])):u("",!0)])}const Ae=T(I,[["render",ve],["__scopeId","data-v-99e7bd7e"]]);export{Ae as default};