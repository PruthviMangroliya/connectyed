import{_ as w,x as u,e as c,f as e,F as b,z as x,t as a,k,v as C,i as v,o as n,n as y,p as F,q as U,s as M}from"./app-Cq5k9qoS.js";const T={data(){return{authorization:this.$store.state.auth.authorization,candidates:[],matchmakers:[],currentTab:"candidates",currentFilter:"all",searchQuery:"",processing:!1,tabs:[{label:"Candidates",value:"candidates"},{label:"Matchmakers",value:"matchmakers"}],candidateFilters:[{label:"All Candidates",value:"all"},{label:"Verified",value:"verified"},{label:"Experienced (3y+)",value:"experienced"}],matchmakerFilters:[{label:"All Matchmakers",value:"all"},{label:"Experienced (5y+)",value:"experienced"},{label:"New (>1y)",value:"new"}]}},computed:{currentUsers(){return this.currentTab==="candidates"?this.candidates:this.matchmakers},currentFilters(){return this.currentTab==="candidates"?this.candidateFilters:this.matchmakerFilters},verifiedCount(){return this.currentUsers.filter(t=>t.email_verified_at).length},averageExperience(){const t=this.currentUsers.reduce((r,i)=>{var p;return r+(((p=i.profile)==null?void 0:p.yearsexperience)||0)},0);return this.currentUsers.length>0?(t/this.currentUsers.length).toFixed(1):"0.0"},uniqueCountries(){return[...new Set(this.currentUsers.map(t=>{var r;return(r=t.profile)==null?void 0:r.country}).filter(Boolean))]},filteredUsers(){let t=[...this.currentUsers];if(this.currentTab==="candidates"?this.currentFilter==="verified"?t=t.filter(r=>r.email_verified_at):this.currentFilter==="experienced"&&(t=t.filter(r=>{var i;return(((i=r.profile)==null?void 0:i.yearsexperience)||0)>=3})):this.currentFilter==="experienced"?t=t.filter(r=>{var i;return(((i=r.profile)==null?void 0:i.yearsexperience)||0)>=5}):this.currentFilter==="new"&&(t=t.filter(r=>{var i;return(((i=r.profile)==null?void 0:i.yearsexperience)||0)<=1})),this.searchQuery){const r=this.searchQuery.toLowerCase();t=t.filter(i=>{var p,l,o,s;return((p=i.name)==null?void 0:p.toLowerCase().includes(r))||((l=i.profile)==null?void 0:l.city)&&i.profile.city.toLowerCase().includes(r)||((o=i.profile)==null?void 0:o.country)&&i.profile.country.toLowerCase().includes(r)||((s=i.profile)==null?void 0:s.bio)&&i.profile.bio.toLowerCase().includes(r)})}return t}},methods:{switchTab(t){this.currentTab=t,this.currentFilter="all",t==="matchmakers"?this.fetchMatchmakers():this.fetchUsers()},async fetchUsers(){this.processing=!0;try{u.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`;const t=await u.get("/api/admin/candidates");this.candidates=t.data.data.filter(r=>r.role==="candidate")}catch(t){console.error("Error fetching candidates:",t),this.$toast.error("Failed to fetch candidates.")}finally{this.processing=!1}},async fetchMatchmakers(){this.processing=!0;try{u.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`;const t=await u.get("/api/admin/matchmakers");this.matchmakers=t.data.data.filter(r=>r.role==="matchmaker")}catch(t){console.error("Error fetching matchmakers:",t),this.$toast.error("Failed to fetch matchmakers.")}finally{this.processing=!1}},async approveCandidate(t){this.processing=!0;try{await u.post("/api/admin/candidates/approve",{user_id:t}),this.$toast.success("Candidate approved and promoted to Matchmaker."),await this.fetchMatchmakers(),await this.fetchUsers()}catch(r){console.error("Error approving candidate:",r),this.$toast.error("Failed to approve candidate.")}finally{this.processing=!1}},async disapproveMatchmaker(t){this.processing=!0;try{await u.post("/api/admin/matchmakers/disapprove",{user_id:t}),this.$toast.success("Matchmaker disapproved and moved to Candidates."),await this.fetchUsers(),await this.fetchMatchmakers()}catch(r){console.error("Error disapproving matchmaker:",r),this.$toast.error("Failed to disapprove matchmaker.")}finally{this.processing=!1}},formatLocation(t){return t?[t.city,t.state,t.country].filter(Boolean).join(", "):"Location not specified"},toggleImage(t){var r;(r=t.profile)!=null&&r.profile_image2&&([t.profile.profile_image1,t.profile.profile_image2]=[t.profile.profile_image2,t.profile.profile_image1])},viewDetails(t){const r=this.currentTab==="candidates"?"CandidateDetails":"MatchmakerDetails";this.$router.push({name:r,params:{id:t.id}})}},mounted(){this.fetchUsers()}},d=t=>(U("data-v-78832435"),t=t(),M(),t),E={class:"p-8 bg-gray-100 min-h-screen"},D={class:"mb-6"},L={class:"border-b border-gray-200"},z={class:"flex space-x-8","aria-label":"Tabs"},A=["onClick"],V={class:"mb-8"},j={class:"text-2xl font-bold text-gray-800 mb-4"},B={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},N={class:"bg-white p-4 rounded-lg shadow-sm"},I={class:"text-sm text-gray-500"},S={class:"text-2xl font-bold text-gray-800"},Q={class:"bg-white p-4 rounded-lg shadow-sm"},q=d(()=>e("p",{class:"text-sm text-gray-500"},"Verified",-1)),P={class:"text-2xl font-bold text-green-600"},G={class:"bg-white p-4 rounded-lg shadow-sm"},H=d(()=>e("p",{class:"text-sm text-gray-500"},"Avg Experience",-1)),J={class:"text-2xl font-bold text-blue-600"},K={class:"bg-white p-4 rounded-lg shadow-sm"},O=d(()=>e("p",{class:"text-sm text-gray-500"},"Countries",-1)),R={class:"text-2xl font-bold text-purple-600"},W={class:"mb-6 space-y-4"},X={class:"flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm"},Y=["onClick"],Z={key:0,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},$={class:"relative h-64"},ee=["src","alt"],te=["onClick"],se=d(()=>e("i",{class:"fas fa-images"},null,-1)),re=[se],ie={class:"p-6"},ae={class:"flex justify-between items-start mb-4"},oe={class:"text-xl font-semibold text-gray-800"},le={class:"text-sm text-gray-500"},ce={class:"space-y-3"},ne={class:"flex items-center text-gray-600"},de=d(()=>e("i",{class:"fas fa-map-marker-alt w-5"},null,-1)),he={class:"text-sm"},pe={class:"flex items-center text-gray-600"},ue=d(()=>e("i",{class:"fas fa-briefcase w-5"},null,-1)),_e={class:"text-sm"},ge={key:0,class:"mt-2"},fe={class:"text-sm text-gray-600 line-clamp-2"},me={class:"flex gap-2 mt-4"},be=["onClick","disabled"],xe=["onClick"],ve={key:1,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},ye={class:"relative"},we={class:"h-64 overflow-hidden"},ke=["src","alt"],Ce={class:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"},Fe={class:"text-xl font-bold text-white mb-1"},Ue={class:"flex items-center text-white/90 text-sm"},Me=d(()=>e("i",{class:"fas fa-map-marker-alt mr-2"},null,-1)),Te={class:"p-6"},Ee={class:"grid grid-cols-2 gap-4 mb-4"},De={class:"bg-gray-50 rounded-lg p-3 text-center"},Le=d(()=>e("span",{class:"text-sm text-gray-600"},"Experience",-1)),ze={class:"text-lg font-semibold text-gray-800"},Ae={class:"bg-gray-50 rounded-lg p-3 text-center"},Ve=d(()=>e("span",{class:"text-sm text-gray-600"},"Age",-1)),je={class:"text-lg font-semibold text-gray-800"},Be={class:"mb-4"},Ne=d(()=>e("h4",{class:"text-sm font-semibold text-gray-700 mb-2"},"About",-1)),Ie={class:"text-sm text-gray-600 line-clamp-3"},Se={class:"flex gap-2 mt-4"},Qe=["onClick","disabled"],qe=["onClick"],Pe={key:2,class:"fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"},Ge=d(()=>e("div",{class:"loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"},null,-1)),He=[Ge];function Je(t,r,i,p,l,o){return n(),c("div",E,[e("div",D,[e("div",L,[e("nav",z,[(n(!0),c(b,null,x(l.tabs,s=>(n(),c("button",{key:s.value,onClick:h=>o.switchTab(s.value),class:y([l.currentTab===s.value?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"])},a(s.label),11,A))),128))])])]),e("div",V,[e("h1",j,a(l.currentTab==="candidates"?"Candidate":"Matchmaker")+" Management ",1),e("div",B,[e("div",N,[e("p",I,"Total "+a(l.currentTab==="candidates"?"Candidates":"Matchmakers"),1),e("p",S,a(o.currentUsers.length),1)]),e("div",Q,[q,e("p",P,a(o.verifiedCount),1)]),e("div",G,[H,e("p",J,a(o.averageExperience)+"y",1)]),e("div",K,[O,e("p",R,a(o.uniqueCountries.length),1)])])]),e("div",W,[e("div",X,[(n(!0),c(b,null,x(o.currentFilters,s=>(n(),c("button",{key:s.value,onClick:h=>l.currentFilter=s.value,class:y(["px-4 py-2 rounded-md text-sm font-medium transition-colors",l.currentFilter===s.value?"bg-blue-500 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"])},a(s.label),11,Y))),128))]),k(e("input",{"onUpdate:modelValue":r[0]||(r[0]=s=>l.searchQuery=s),type:"text",placeholder:"Search by name, location, or bio...",class:"w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"},null,512),[[C,l.searchQuery]])]),l.currentTab==="candidates"?(n(),c("div",Z,[(n(!0),c(b,null,x(o.filteredUsers,s=>{var h,_,g,f;return n(),c("div",{key:s.id,class:"bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"},[e("div",$,[e("img",{src:((h=s.profile)==null?void 0:h.profile_image1)||"/path/to/default-image.jpg",alt:s.name,class:"w-full h-full object-cover"},null,8,ee),(_=s.profile)!=null&&_.profile_image2?(n(),c("button",{key:0,onClick:m=>o.toggleImage(s),class:"absolute bottom-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"},re,8,te)):v("",!0)]),e("div",ie,[e("div",ae,[e("div",null,[e("h2",oe,a(s.name),1),e("p",le,"@"+a(s.username),1)]),e("span",{class:y(["px-3 py-1 rounded-full text-sm font-medium",s.email_verified_at?"bg-green-100 text-green-800":"bg-orange-100 text-orange-800"])},a(s.email_verified_at?"Verified":"Pending"),3)]),e("div",ce,[e("div",ne,[de,e("span",he,a(o.formatLocation(s.profile)),1)]),e("div",pe,[ue,e("span",_e,a(((g=s.profile)==null?void 0:g.yearsexperience)||0)+" years experience",1)]),(f=s.profile)!=null&&f.bio?(n(),c("div",ge,[e("p",fe,a(s.profile.bio),1)])):v("",!0)]),e("div",me,[e("button",{onClick:m=>o.approveCandidate(s.id),disabled:l.processing,class:"flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"}," Approve ",8,be),e("button",{class:"flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors",onClick:m=>o.viewDetails(s)}," View Details ",8,xe)])])])}),128))])):(n(),c("div",ve,[(n(!0),c(b,null,x(o.filteredUsers,s=>{var h,_,g,f;return n(),c("div",{key:s.id,class:"bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"},[e("div",ye,[e("div",we,[e("img",{src:((h=s.profile)==null?void 0:h.profile_image1)||"/path/to/default-image.jpg",alt:s.name,class:"w-full h-full object-cover"},null,8,ke)]),e("div",Ce,[e("h3",Fe,a(s.name),1),e("p",Ue,[Me,F(" "+a(o.formatLocation(s.profile)),1)])])]),e("div",Te,[e("div",Ee,[e("div",De,[Le,e("p",ze,a(((_=s.profile)==null?void 0:_.yearsexperience)||0)+" years ",1)]),e("div",Ae,[Ve,e("p",je,a(((g=s.profile)==null?void 0:g.age)||"N/A"),1)])]),e("div",Be,[Ne,e("p",Ie,a(((f=s.profile)==null?void 0:f.bio)||"No bio available"),1)]),e("div",Se,[e("button",{onClick:m=>o.disapproveMatchmaker(s.id),disabled:l.processing,class:"flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"}," Disapprove ",8,Qe),e("button",{class:"flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors",onClick:m=>o.viewDetails(s)}," View Details ",8,qe)])])])}),128))])),l.processing?(n(),c("div",Pe,He)):v("",!0)])}const Oe=w(T,[["render",Je],["__scopeId","data-v-78832435"]]);export{Oe as default};