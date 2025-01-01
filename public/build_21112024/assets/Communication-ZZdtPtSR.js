import{_ as M,M as w,x as m,e as o,f as e,n as b,k as _,v as y,F as g,z as p,i as h,L as C,t as u,g as x,m as D,o as r,p as d,q as T,s as z}from"./app-DHpn0u2P.js";import{M as S,f as I,p as A}from"./Messaging-Cho4O947.js";const U={name:"Communication",components:{Messaging:S},data(){return{currentTab:"schedule",selectedClients:[],clients:[],matchmakerMeetings:[],clientMeetings:[],processing:!1,searchQuery:"",showDropdown:!1,duration:30,startTime:""}},computed:{...w({user:i=>i.auth.user,authorization:i=>i.auth.authorization}),isAuthenticated(){return!!this.authorization&&!!this.authorization.token},filteredClients(){const i=this.searchQuery.toLowerCase();return this.clients.filter(t=>t.name&&t.name.toLowerCase().includes(i)&&!this.selectedClients.find(a=>a.id===t.id))},minDateTime(){return new Date().toISOString().slice(0,16)}},watch:{isAuthenticated(i){i&&(this.getClients(),this.getUpcomingMeetings())}},created(){const t=new URLSearchParams(window.location.search).get("token");t?(m.defaults.headers.common.Authorization=`Bearer ${t}`,m.get("/api/user/introspect",{headers:{Authorization:`Bearer ${t}`}}).then(a=>{const f={user:a.data.user,authorization:{token:t}};this.$store.dispatch("auth/setAuth",f),window.history.replaceState({},document.title,"/matchmaker/communication")}).catch(a=>{console.error("Error fetching user data:",a),alert("Failed to authenticate. Please log in again."),this.$router.push("/login")})):this.$store.dispatch("auth/initialize")},mounted(){this.isAuthenticated&&(this.getClients(),this.getUpcomingMeetings()),console.log("User:",this.user),console.log("Authorization:",this.authorization)},methods:{async getClients(){var i;if(this.isAuthenticated){this.processing=!0;try{const t="/api/clients/all?fetch_all=true",{data:a}=await m.get(t,{headers:{Authorization:`Bearer ${this.authorization.token}`}});a.success?this.clients=a.data:alert(a.message||"Failed to fetch clients. Please try again.")}catch(t){console.error("Error fetching clients:",t.response||t),((i=t.response)==null?void 0:i.status)===403?alert("You are not authorized to view clients."):alert("Failed to fetch clients. Please try again.")}finally{this.processing=!1}}},async getUpcomingMeetings(){if(this.isAuthenticated){this.processing=!0;try{const i=await m.get("/api/google/upcoming-meetings",{headers:{Authorization:`Bearer ${this.authorization.token}`}});i.data.success?(this.matchmakerMeetings=i.data.data.matchmakerMeetings,this.clientMeetings=i.data.data.clientMeetings):console.error("Failed to fetch upcoming meetings:",i.data.message)}catch(i){console.error("Error fetching upcoming meetings:",i)}finally{this.processing=!1}}},selectClient(i){this.selectedClients.length<2?(this.selectedClients.push(i),this.searchQuery="",this.showDropdown=!1,this.$refs.clientInput.blur()):alert("You can select up to 2 clients only.")},removeClient(i){this.selectedClients=this.selectedClients.filter(t=>t.id!==i)},hideDropdown(){setTimeout(()=>{this.showDropdown=!1},100)},async scheduleMeeting(){if(this.selectedClients.length===0){alert("Please select at least one client.");return}if(!this.startTime){alert("Please select a meeting date and time.");return}if(!this.duration){alert("Please select a meeting duration.");return}if(new Date(this.startTime)<new Date){alert("Please select a future date and time for the meeting.");return}if(![15,30,60].includes(parseInt(this.duration))){alert("Invalid duration selected.");return}this.processing=!0;try{const t=await m.post("/api/google/create-meeting",{client_ids:this.selectedClients.map(a=>a.id),start_time:this.startTime,duration:parseInt(this.duration),matchmaker_id:this.user.id},{headers:{Authorization:`Bearer ${this.authorization.token}`}});t.data.success?(alert("Meeting scheduled successfully!"),this.selectedClients=[],this.startTime="",this.duration=30,this.getUpcomingMeetings()):alert(t.data.message||"Failed to schedule meeting.")}catch(t){console.error(t),alert("Failed to schedule meeting. Please try again.")}finally{this.processing=!1}},formatDate(i){return I(A(i),"EEEE, MMMM d, yyyy h:mm a")}}},l=i=>(T("data-v-ac5d30f9"),i=i(),z(),i),P={key:0},B={class:"tabs mb-4"},F={key:0},E={class:"mb-6"},L=l(()=>e("h3",{class:"text-lg font-semibold mb-2"},"Select Clients",-1)),V={class:"relative"},N={key:0,class:"absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto"},Q=["onClick"],Y={key:0,class:"px-3 py-2 text-gray-500"},q={class:"mt-2"},G=["onClick"],J={class:"mb-6"},O=l(()=>e("h3",{class:"text-lg font-semibold mb-2"},"Select Date and Time",-1)),H=["min"],R={class:"mb-6"},j=l(()=>e("h3",{class:"text-lg font-semibold mb-2"},"Select Duration",-1)),K=l(()=>e("option",{disabled:"",value:""},"Please select duration",-1)),W=l(()=>e("option",{value:"15"},"15 Minutes",-1)),X=l(()=>e("option",{value:"30"},"30 Minutes",-1)),Z=l(()=>e("option",{value:"60"},"60 Minutes",-1)),$=[K,W,X,Z],ee=["disabled"],te={class:"mt-8"},se={key:1},ie=l(()=>e("h3",{class:"text-lg font-semibold mb-4"},"Your Upcoming Meetings",-1)),ne={key:0,class:"text-center"},oe={key:1},re={key:0,class:"text-center text-gray-500"},le={key:1},ae={key:0,class:"mb-6"},ce=l(()=>e("h4",{class:"text-md font-semibold mb-2"},"Hosted Meetings",-1)),ue=l(()=>e("strong",null,"Meeting ID:",-1)),de=l(()=>e("strong",null,"Date & Time:",-1)),he=l(()=>e("strong",null,"Status:",-1)),me=["href"],ge={key:1},pe=l(()=>e("h4",{class:"text-md font-semibold mb-2"},"Client Meetings",-1)),_e=l(()=>e("strong",null,"Meeting ID:",-1)),fe=l(()=>e("strong",null,"Date & Time:",-1)),be=l(()=>e("strong",null,"Status:",-1)),ye=["href"],ke={key:1,class:"text-center py-10"},ve=l(()=>e("p",null,"Loading...",-1)),Me=[ve];function we(i,t,a,f,n,c){const k=D("Messaging");return r(),o("div",null,[c.isAuthenticated?(r(),o("div",P,[e("div",B,[e("button",{onClick:t[0]||(t[0]=s=>n.currentTab="schedule"),class:b([{active:n.currentTab==="schedule"},"tab-button"])}," Schedule a Meeting ",2),e("button",{onClick:t[1]||(t[1]=s=>n.currentTab="upcoming"),class:b([{active:n.currentTab==="upcoming"},"tab-button"])}," Upcoming Meetings ",2)]),n.currentTab==="schedule"?(r(),o("div",F,[e("div",E,[L,e("div",V,[_(e("input",{"onUpdate:modelValue":t[2]||(t[2]=s=>n.searchQuery=s),onFocus:t[3]||(t[3]=s=>n.showDropdown=!0),onBlur:t[4]||(t[4]=(...s)=>c.hideDropdown&&c.hideDropdown(...s)),onInput:t[5]||(t[5]=s=>n.showDropdown=!0),type:"text",placeholder:"Search for clients...",class:"w-full px-3 py-2 border rounded",ref:"clientInput"},null,544),[[y,n.searchQuery]]),n.showDropdown?(r(),o("ul",N,[(r(!0),o(g,null,p(c.filteredClients,s=>(r(),o("li",{key:s.id,onClick:v=>c.selectClient(s),class:"px-3 py-2 hover:bg-gray-100 cursor-pointer"},u(s.name),9,Q))),128)),c.filteredClients.length===0?(r(),o("li",Y," No clients found. ")):h("",!0)])):h("",!0)]),e("div",q,[(r(!0),o(g,null,p(n.selectedClients,s=>(r(),o("span",{key:s.id,class:"inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2"},[d(u(s.name)+" ",1),e("button",{onClick:v=>c.removeClient(s.id),class:"ml-1 text-red-500"},"✖️",8,G)]))),128))])]),e("div",J,[O,_(e("input",{"onUpdate:modelValue":t[6]||(t[6]=s=>n.startTime=s),type:"datetime-local",class:"w-full px-3 py-2 border rounded",min:c.minDateTime},null,8,H),[[y,n.startTime]])]),e("div",R,[j,_(e("select",{"onUpdate:modelValue":t[7]||(t[7]=s=>n.duration=s),class:"w-full px-3 py-2 border rounded"},$,512),[[C,n.duration]])]),e("button",{onClick:t[8]||(t[8]=(...s)=>c.scheduleMeeting&&c.scheduleMeeting(...s)),disabled:n.processing||n.selectedClients.length===0||!n.startTime||!n.duration,class:"w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"},u(n.processing?"Scheduling...":"Schedule Meeting"),9,ee),e("div",te,[x(k,{currentUser:i.user,authorization:i.authorization},null,8,["currentUser","authorization"])])])):h("",!0),n.currentTab==="upcoming"?(r(),o("div",se,[ie,n.processing?(r(),o("div",ne,"Loading upcoming meetings...")):(r(),o("div",oe,[n.matchmakerMeetings.length===0&&n.clientMeetings.length===0?(r(),o("div",re," No upcoming meetings. ")):(r(),o("div",le,[n.matchmakerMeetings.length>0?(r(),o("div",ae,[ce,e("ul",null,[(r(!0),o(g,null,p(n.matchmakerMeetings,s=>(r(),o("li",{key:s.id,class:"mb-2 p-4 border rounded"},[e("p",null,[ue,d(" "+u(s.google_meet_id),1)]),e("p",null,[de,d(" "+u(c.formatDate(s.start_time)),1)]),e("p",null,[he,d(" "+u(s.status),1)]),e("a",{href:s.google_meet_link,target:"_blank",class:"text-blue-500 underline"}," Join Google Meet ",8,me)]))),128))])])):h("",!0),n.clientMeetings.length>0?(r(),o("div",ge,[pe,e("ul",null,[(r(!0),o(g,null,p(n.clientMeetings,s=>(r(),o("li",{key:s.id,class:"mb-2 p-4 border rounded"},[e("p",null,[_e,d(" "+u(s.google_meet_id),1)]),e("p",null,[fe,d(" "+u(c.formatDate(s.start_time)),1)]),e("p",null,[be,d(" "+u(s.status),1)]),e("a",{href:s.google_meet_link,target:"_blank",class:"text-blue-500 underline"}," Join Google Meet ",8,ye)]))),128))])])):h("",!0)]))]))])):h("",!0)])):(r(),o("div",ke,Me))])}const De=M(U,[["render",we],["__scopeId","data-v-ac5d30f9"]]);export{De as default};