import{_,x as d,e as n,i as u,f as s,k as c,v as m,F as p,z as f,L as b,t as h,o,p as y}from"./app-Cq5k9qoS.js";const w={data(){return{authorization:this.$store.state.auth.authorization,clients:[],searchQuery:"",showDropdown:!1,selectedClients:[],processing:!1,duration:30,startTime:""}},computed:{filteredClients(){const i=this.searchQuery.toLowerCase();return this.clients.filter(e=>e.name&&e.name.toLowerCase().includes(i)&&!this.selectedClients.find(a=>a.id===e.id))}},mounted(){this.fetchBlindRequests()},methods:{async fetchBlindRequests(){this.processing=!0,d.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`,await d.get("/api/get-blind-request").then(i=>{console.log(i.data.data),this.clients=i.data.data.flat()}).catch(i=>{console.error(i)}).finally(()=>{this.processing=!1})},selectClient(i){this.selectedClients.length<2?(this.selectedClients.push(i),this.searchQuery="",this.showDropdown=!1,this.$refs.clientInput.blur()):alert("You can select up to 2 clients only.")},removeClient(i){this.selectedClients=this.selectedClients.filter(e=>e.id!==i)},async scheduleMeeting(){if(this.selectedClients.length===0){alert("Please select at least one client.");return}if(!this.startTime){alert("Please select a meeting date and time.");return}if(!this.duration){alert("Please select a meeting duration.");return}if(new Date(this.startTime)<new Date){alert("Please select a future date and time for the meeting.");return}if(![15,30,60].includes(parseInt(this.duration))){alert("Invalid duration selected.");return}this.processing=!0;try{const e=await d.post("/api/google/create-free-blind-meeting",{client_ids:this.selectedClients.map(a=>a.id),start_time:this.startTime,duration:parseInt(this.duration)},{headers:{Authorization:`Bearer ${this.authorization.token}`}});e.status?(alert(e.data.message),this.selectedClients=[],this.startTime="",this.duration=30):alert(e.data.message||"Failed to schedule meeting.")}catch(e){console.error(e),alert("Failed to schedule meeting. Please try again.")}finally{this.processing=!1}}}},C={class:"p-8 bg-gray-100 min-h-screen"},v=s("h1",{class:"text-2xl font-bold mb-6 text-gray-700"},"Request For 1 on 1 Blind Date",-1),x={key:0,class:"text-gray-500"},D={class:"mb-6"},k=s("h3",{class:"text-lg font-semibold mb-2"},"Select Clients",-1),T={class:"relative"},B={key:0,class:"absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto"},M=["onClick"],z={key:0,class:"px-3 py-2 text-gray-500"},S={class:"mt-2"},q=["onClick"],F={class:"mb-6"},I=s("h3",{class:"text-lg font-semibold mb-2"},"Select Date and Time",-1),P={class:"mb-6"},V=s("h3",{class:"text-lg font-semibold mb-2"},"Select Duration",-1),N=s("option",{disabled:"",value:""},"Please select duration",-1),Q=s("option",{value:"15"},"15 Minutes",-1),R=s("option",{value:"30"},"30 Minutes",-1),L=s("option",{value:"60"},"60 Minutes",-1),U=[N,Q,R,L],A=["disabled"];function E(i,e,a,Y,l,r){return o(),n("div",C,[v,l.clients.length===0?(o(),n("div",x," No clients Requested ")):u("",!0),s("div",D,[k,s("div",T,[c(s("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>l.searchQuery=t),onFocus:e[1]||(e[1]=t=>l.showDropdown=!0),onBlur:e[2]||(e[2]=(...t)=>i.hideDropdown&&i.hideDropdown(...t)),onInput:e[3]||(e[3]=t=>l.showDropdown=!0),type:"text",placeholder:"Search for clients...",class:"w-full px-3 py-2 border rounded",ref:"clientInput"},null,544),[[m,l.searchQuery]]),l.showDropdown?(o(),n("ul",B,[(o(!0),n(p,null,f(r.filteredClients,t=>(o(),n("li",{key:t.id,onClick:g=>r.selectClient(t),class:"px-3 py-2 hover:bg-gray-100 cursor-pointer"},h(t.name),9,M))),128)),r.filteredClients.length===0?(o(),n("li",z," No clients found. ")):u("",!0)])):u("",!0)]),s("div",S,[(o(!0),n(p,null,f(l.selectedClients,t=>(o(),n("span",{key:t.id,class:"inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2"},[y(h(t.name)+" ",1),s("button",{onClick:g=>r.removeClient(t.id),class:"ml-1 text-red-500"},"✖️",8,q)]))),128))])]),s("div",F,[I,c(s("input",{"onUpdate:modelValue":e[4]||(e[4]=t=>l.startTime=t),type:"datetime-local",class:"w-full px-3 py-2 border rounded"},null,512),[[m,l.startTime]])]),s("div",P,[V,c(s("select",{"onUpdate:modelValue":e[5]||(e[5]=t=>l.duration=t),class:"w-full px-3 py-2 border rounded"},U,512),[[b,l.duration]])]),s("button",{onClick:e[6]||(e[6]=(...t)=>r.scheduleMeeting&&r.scheduleMeeting(...t)),disabled:l.processing||l.selectedClients.length<2,class:"w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"},h(l.processing?"Scheduling...":"Schedule Meeting"),9,A)])}const G=_(w,[["render",E]]);export{G as default};