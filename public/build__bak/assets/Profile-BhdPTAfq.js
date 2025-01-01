import{_ as b,x as a,e as p,f as e,i as f,k as l,v as i,t as g,j as m,o as u}from"./app-Cq5k9qoS.js";const h={data(){return{profile:{name:"",city:"",state:"",country:"",yearsexperience:"",jobtitle:"",bio:"",profile_image1:"",profile_image2:""},processing:!1,authorization:this.$store.state.auth.authorization}},mounted(){this.getProfile()},methods:{async postProfile(){try{this.processing=!0,a.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`,(await a.put("/api/profile/update",{profile:this.profile})).data.success&&alert("Profile updated successfully")}catch(r){console.error("Error updating profile:",r),alert("Failed to update profile. Please try again.")}finally{this.processing=!1}},async uploadImage(r,o){const d=r.target.files[0];if(d)try{this.processing=!0;const n=new FormData;n.append("file",d),n.append("image_number",o),a.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`;const t=await a.post("/api/profile/uploadimage",n,{headers:{"Content-Type":"multipart/form-data"}});t.data.success&&(this.profile[`profile_image${o}`]=t.data.data)}catch(n){console.error("Error uploading image:",n),alert("Failed to upload image. Please try again.")}finally{this.processing=!1}},async getProfile(){try{this.processing=!0,a.defaults.headers.common.Authorization=`Bearer ${this.authorization.token}`;const r=await a.get("/api/profile/getprofile");r.data.success&&(this.profile={...r.data.data,name:r.data.data.name||r.data.data.user.name})}catch(r){console.error("Error fetching profile:",r),alert("Failed to load profile. Please refresh the page.")}finally{this.processing=!1}}}},x={class:"max-w-4xl mx-auto p-6 bg-white rounded-sm shadow-sm"},y=e("h2",{class:"text-2xl font-semibold mb-4"},"Matchmaker Profile",-1),_={class:"mb-6 flex gap-4"},w={class:"w-1/3"},k=e("h3",{class:"text-sm font-medium mb-2"},"Profile Image 1",-1),v={key:0,class:"mb-2"},P=["src"],j={class:"cursor-pointer block"},I=e("span",{class:"text-connectyed-button-dark bg-connectyed-button-light hover:bg-connectyed-button-hover hover:text-connectyed-button-hover-dark focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 block text-center"}," Upload Image 1 ",-1),U={class:"w-1/3"},V=e("h3",{class:"text-sm font-medium mb-2"},"Profile Image 2",-1),z={key:0,class:"mb-2"},B=["src"],C={class:"cursor-pointer block"},E=e("span",{class:"text-connectyed-button-dark bg-connectyed-button-light hover:bg-connectyed-button-hover hover:text-connectyed-button-hover-dark focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 block text-center"}," Upload Image 2 ",-1),F={class:"flex flex-wrap -mx-3 mb-4"},S={class:"w-full px-3"},D=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"name"}," Full Name ",-1),A={class:"flex flex-wrap -mx-3 mb-4"},M={class:"w-full md:w-1/2 px-3 mb-4 md:mb-0"},T=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"yearsexperience"}," Years of Experience ",-1),N={class:"w-full md:w-1/2 px-3"},J=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"jobtitle"}," Job Title ",-1),Y={class:"flex flex-wrap -mx-3 mb-4"},q={class:"w-full md:w-1/3 px-3 mb-4 md:mb-0"},G=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"city"}," City ",-1),H={class:"w-full md:w-1/3 px-3 mb-4 md:mb-0"},K=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"state"}," State ",-1),L={class:"w-full md:w-1/3 px-3 mb-4 md:mb-0"},O=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"country"}," Country ",-1),Q={class:"flex flex-wrap -mx-3 mb-6"},R={class:"w-full px-3"},W=e("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",for:"bio"}," Bio ",-1),X={class:"flex items-center justify-end"},Z=["disabled"];function $(r,o,d,n,t,c){return u(),p("div",x,[y,e("div",_,[e("div",w,[k,t.profile.profile_image1?(u(),p("div",v,[e("img",{src:t.profile.profile_image1,alt:"Profile Image 1",class:"rounded-lg object-cover w-48 h-48"},null,8,P)])):f("",!0),e("label",j,[I,e("input",{type:"file",class:"hidden",onChange:o[0]||(o[0]=s=>c.uploadImage(s,1)),accept:"image/*"},null,32)])]),e("div",U,[V,t.profile.profile_image2?(u(),p("div",z,[e("img",{src:t.profile.profile_image2,alt:"Profile Image 2",class:"rounded-lg object-cover w-48 h-48"},null,8,B)])):f("",!0),e("label",C,[E,e("input",{type:"file",class:"hidden",onChange:o[1]||(o[1]=s=>c.uploadImage(s,2)),accept:"image/*"},null,32)])])]),e("form",{class:"w-full",onSubmit:o[9]||(o[9]=m((...s)=>c.postProfile&&c.postProfile(...s),["prevent"]))},[e("div",F,[e("div",S,[D,l(e("input",{class:"appearance-none block w-full border border-gray-500 rounded p-2 leading-tight focus:outline-none focus:bg-white",type:"text","onUpdate:modelValue":o[2]||(o[2]=s=>t.profile.name=s),id:"name"},null,512),[[i,t.profile.name]])])]),e("div",A,[e("div",M,[T,l(e("input",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[3]||(o[3]=s=>t.profile.yearsexperience=s),id:"yearsexperience",type:"number"},null,512),[[i,t.profile.yearsexperience]])]),e("div",N,[J,l(e("input",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[4]||(o[4]=s=>t.profile.jobtitle=s),id:"jobtitle",type:"text"},null,512),[[i,t.profile.jobtitle]])])]),e("div",Y,[e("div",q,[G,l(e("input",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[5]||(o[5]=s=>t.profile.city=s),id:"city",type:"text"},null,512),[[i,t.profile.city]])]),e("div",H,[K,l(e("input",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[6]||(o[6]=s=>t.profile.state=s),id:"state",type:"text"},null,512),[[i,t.profile.state]])]),e("div",L,[O,l(e("input",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[7]||(o[7]=s=>t.profile.country=s),id:"country",type:"text"},null,512),[[i,t.profile.country]])])]),e("div",Q,[e("div",R,[W,l(e("textarea",{class:"appearance-none block w-full border border-gray-200 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500","onUpdate:modelValue":o[8]||(o[8]=s=>t.profile.bio=s),id:"bio",rows:"4"},null,512),[[i,t.profile.bio]])])]),e("div",X,[e("button",{class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover hover:text-connectyed-button-hover-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"submit",disabled:t.processing},g(t.processing?"Saving...":"Save Profile"),9,Z)])],32)])}const oe=b(h,[["render",$]]);export{oe as default};