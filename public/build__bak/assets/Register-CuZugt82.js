import{_ as q,o as n,e as m,f as t,j as C,i as u,y as T,t as p,F as V,z as _,k as g,A as k,n as v,g as i,v as S,p as y,w as P,m as b,q as I,s as M}from"./app-Cq5k9qoS.js";import{I as E,S as F}from"./SelectOption-CCt1aaRz.js";import{c as w}from"./countries-Cj1GR0vB.js";const O={props:["isOpen","pdfUrl"],methods:{closeModal(){this.$emit("close")}}},N=["src"],j={class:"flex justify-center"};function A(s,r,h,f,e,a){return h.isOpen?(n(),m("div",{key:0,class:"modal-overlay",onClick:r[2]||(r[2]=(...l)=>a.closeModal&&a.closeModal(...l))},[t("div",{class:"modal-content",onClick:r[1]||(r[1]=C(()=>{},["stop"]))},[t("iframe",{src:h.pdfUrl,width:"300px",height:"500px"},null,8,N),t("div",j,[t("button",{class:"bg-connectyed-button-light text-connectyed-button-dark py-4 px-1 w-24 justify-self-center",onClick:r[0]||(r[0]=(...l)=>a.closeModal&&a.closeModal(...l))},"Close")])])])):u("",!0)}const B=q(O,[["render",A]]),H={name:"Register",components:{InputText:E,SelectOption:F,PdfModal:B},data(){return{currentStep:1,steps:[1,2,3,4,5,6,7],form:{name:"",username:"",email:"",password:"",password_confirmation:"",city:"",state:"",country:"",currentLocation:"",age:"",gender:"",hairColor:"",bodyType:"",heightFeet:"",heightInches:"",maritalStatus:"",children:"",religion:"",smoker:!1,drinker:"",education:"",jobTitle:"",sports:"",hobbies:"",englishLevel:"",languages:"",privacypolicy:!1,termsofuse:!1,ismatchmaker:!1,yearsexperience:"",bio:"",seeking:""},errors:{},countries:w,filteredCountries:w,genders:["Male","Female","Other"],bodyTypes:["Slender","Average","Athletic","Curvy","Big and Beautiful"],maritalStatuses:["Single","Separated","Divorced","Married"],childrenOptions:["0","1","2","3","4","5","6","7","8","9","10"],religions:["Buddhism","Catholic","Christian","Confucianism","Hinduism","Islam","Jainism","Judaism","Shinto","Sikhism","Taoism","Zoroastrianism","Other"],yesNoOptions:["Yes","No"],drinkerOptions:["None","Occasionally","Often"],englishLevels:["Beginner","Intermediate","Proficient"],successMessage:"",validationErrors:{},isModalOpen:!1,pdfUrl:"",modalMode:{header:""},processing:!1,files:{profile_image1:null,profile_image2:null}}},computed:{validationErrorsList(){return Object.keys(this.errors).filter(s=>this.errors[s]&&s!=="general").map(s=>this.errors[s])}},methods:{...T({registerUser:"auth/register"}),nextStep(){this.clearErrors();let s=!1;switch(this.currentStep){case 1:this.form.name||(this.errors.name="Name is required",s=!0),this.form.username||(this.errors.username="Username is required",s=!0),this.form.email?this.validateEmail(this.form.email)||(this.errors.email="Please enter a valid email",s=!0):(this.errors.email="Email is required",s=!0),this.form.password?this.form.password.length<6&&(this.errors.password="Password must be at least 6 characters",s=!0):(this.errors.password="Password is required",s=!0),this.form.password_confirmation?this.form.password!==this.form.password_confirmation&&(this.errors.password_confirmation="Passwords do not match",s=!0):(this.errors.password_confirmation="Password confirmation is required",s=!0);break;case 2:this.form.ismatchmaker?(this.files.profile_image1||(this.errors.profile_image1="Profile Image 1 is required",s=!0),this.form.age?(isNaN(this.form.age)||this.form.age<18||this.form.age>100)&&(this.errors.age="Please enter a valid age between 18 and 100",s=!0):(this.errors.age="Age is required",s=!0),this.form.yearsexperience===""||this.form.yearsexperience===null?(this.errors.yearsexperience="Years of Experience is required",s=!0):(isNaN(this.form.yearsexperience)||this.form.yearsexperience<0)&&(this.errors.yearsexperience="Please enter a valid number of years",s=!0),this.form.bio||(this.errors.bio="Bio is required",s=!0)):(this.form.city||(this.errors.city="City is required",s=!0),this.form.state||(this.errors.state="State is required",s=!0),this.form.country||(this.errors.country="Country is required",s=!0),this.form.currentLocation||(this.errors.currentLocation="Current Location is required",s=!0));break;case 3:this.form.ismatchmaker?(this.form.city||(this.errors.city="City is required",s=!0),this.form.state||(this.errors.state="State is required",s=!0),this.form.country||(this.errors.country="Country is required",s=!0),this.form.currentLocation||(this.errors.currentLocation="Current Location is required",s=!0)):(this.form.age?(isNaN(this.form.age)||this.form.age<=0||this.form.age>120)&&(this.errors.age="Please enter a valid age",s=!0):(this.errors.age="Age is required",s=!0),this.form.gender||(this.errors.gender="Gender is required",s=!0),this.form.hairColor||(this.errors.hairColor="Hair Color is required",s=!0),this.form.bodyType||(this.errors.bodyType="Body Type is required",s=!0),this.form.heightFeet?(isNaN(this.form.heightFeet)||this.form.heightFeet<=0||this.form.heightFeet>8)&&(this.errors.heightFeet="Please enter a valid height in feet",s=!0):(this.errors.heightFeet="Height in Feet is required",s=!0),this.form.heightInches===""||this.form.heightInches===null?(this.errors.heightInches="Inches is required",s=!0):(isNaN(this.form.heightInches)||this.form.heightInches<0||this.form.heightInches>=12)&&(this.errors.heightInches="Please enter a valid number of inches",s=!0));break;case 4:this.form.ismatchmaker?(this.form.privacypolicy||(this.errors.general="You must agree to the Privacy Policy",s=!0),this.form.termsofuse||(this.errors.general="You must agree to the Terms of Use",s=!0)):(this.form.maritalStatus||(this.errors.maritalStatus="Marital Status is required",s=!0),(this.form.children===""||this.form.children===null)&&(this.errors.children="Children is required",s=!0),this.form.religion||(this.errors.religion="Religion is required",s=!0),this.form.smoker===!1&&this.form.smoker===""&&(this.errors.smoker="Smoker status is required",s=!0),this.form.drinker||(this.errors.drinker="Drinker status is required",s=!0));break;case 5:this.form.ismatchmaker||(this.form.education||(this.errors.education="Education is required",s=!0),this.form.jobTitle||(this.errors.jobTitle="Job Title is required",s=!0),this.form.sports||(this.errors.sports="Sports is required",s=!0),this.form.hobbies||(this.errors.hobbies="Hobbies is required",s=!0),this.form.englishLevel||(this.errors.englishLevel="English Level is required",s=!0),this.form.languages||(this.errors.languages="Languages is required",s=!0));break;case 6:this.form.ismatchmaker||this.form.seeking||(this.errors.seeking="Please specify what you are finding in your match",s=!0);break;case 7:this.form.ismatchmaker||(this.form.privacypolicy||(this.errors.general="You must agree to the Privacy Policy",s=!0),this.form.termsofuse||(this.errors.general="You must agree to the Terms of Use",s=!0));break}if(!s){const r=this.steps.indexOf(this.currentStep);r<this.steps.length-1&&(this.currentStep=this.steps[r+1])}},prevStep(){const s=this.steps.indexOf(this.currentStep);s>0&&(this.currentStep=this.steps[s-1])},switchMatchmaker(){this.form.ismatchmaker=!this.form.ismatchmaker,this.form.ismatchmaker?this.steps=[1,2,3,4]:this.steps=[1,2,3,4,5,6],this.steps.includes(this.currentStep)||(this.currentStep=1),this.clearErrors()},goToStep(s){this.steps.includes(s)&&(this.currentStep=s)},showPrivacy(){this.modalMode.header="Privacy Policy",this.pdfUrl="/upload/pdf/privacypolicy.pdf",this.isModalOpen=!0},showTerm(){this.modalMode.header="Terms of Use Agreement",this.pdfUrl="/upload/pdf/termsofuse.pdf",this.isModalOpen=!0},closeModal(){this.isModalOpen=!1,this.pdfUrl=""},onFileChange(s,r){const h=s.target.files[0];this.files[r]=h},async register(){var r,h;if(this.processing=!0,this.clearErrors(),this.successMessage="",!this.validateAllFields()){this.processing=!1;return}const s=new FormData;s.append("name",this.form.name),s.append("username",this.form.username),s.append("email",this.form.email),s.append("password",this.form.password),s.append("password_confirmation",this.form.password_confirmation),s.append("ismatchmaker",this.form.ismatchmaker===!0?"1":"0"),s.append("privacypolicy",this.form.privacypolicy===!0?"1":"0"),s.append("termsofuse",this.form.termsofuse===!0?"1":"0"),s.append("city",this.form.city),s.append("state",this.form.state),s.append("country",this.form.country),s.append("currentLocation",this.form.currentLocation),s.append("age",this.form.age),this.form.ismatchmaker||(s.append("gender",this.form.gender),s.append("hairColor",this.form.hairColor),s.append("bodyType",this.form.bodyType),s.append("heightFeet",this.form.heightFeet),s.append("heightInches",this.form.heightInches),s.append("maritalStatus",this.form.maritalStatus),s.append("children",this.form.children),s.append("religion",this.form.religion),s.append("smoker",this.form.smoker===!0?"1":"0"),s.append("drinker",this.form.drinker),s.append("education",this.form.education),s.append("jobTitle",this.form.jobTitle),s.append("sports",this.form.sports),s.append("hobbies",this.form.hobbies),s.append("englishLevel",this.form.englishLevel),s.append("languages",this.form.languages),s.append("seeking",this.form.seeking)),this.form.ismatchmaker&&(s.append("yearsexperience",this.form.yearsexperience),s.append("bio",this.form.bio),this.files.profile_image1&&s.append("profile_image1",this.files.profile_image1),this.files.profile_image2&&s.append("profile_image2",this.files.profile_image2));try{const f=await this.registerUser(s);f.success===!0&&(this.successMessage=f.message,this.validationErrors={},setTimeout(()=>{this.$router.push({name:"login"})},1500))}catch(f){f.response&&f.response.status===422?(this.validationErrors=f.response.data.errors||f.response.data.message,this.mapValidationErrors()):f.response&&f.response.status===500?this.errors.general="Server error. Please try again later.":this.errors.general=((h=(r=f.response)==null?void 0:r.data)==null?void 0:h.message)||"An unexpected error occurred."}finally{this.processing=!1}},validateAllFields(){if(!this.form.ismatchmaker){const r={gender:"Gender",hairColor:"Hair Color",bodyType:"Body Type",heightFeet:"Height (Feet)",heightInches:"Height (Inches)",maritalStatus:"Marital Status",children:"Children",religion:"Religion",smoker:"Smoker",drinker:"Drinker",education:"Education",jobTitle:"Job Title",sports:"Sports",hobbies:"Hobbies",englishLevel:"English Level",languages:"Languages",seeking:"Seeking"};for(const[h,f]of Object.entries(r))if(!this.form[h])return this.errors[h]=`${f} is required`,!1}const s={name:"Name",username:"Username",email:"Email",password:"Password",city:"City",state:"State",country:"Country",currentLocation:"Current Location",age:"Age"};for(const[r,h]of Object.entries(s))if(!this.form[r])return this.errors[r]=`${h} is required`,!1;return!0},mapValidationErrors(){for(const[s,r]of Object.entries(this.validationErrors))this.errors.hasOwnProperty(s)?this.errors[s]=r[0]:this.errors.general=r[0]},clearErrors(){this.errors={},this.successMessage=""},validateEmail(s){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i.test(String(s).toLowerCase())},handleCountrySearch(s){if(!s)this.filteredCountries=this.countries;else{const r=s.toLowerCase();this.filteredCountries=this.countries.filter(h=>h.toLowerCase().includes(r))}}}},d=s=>(I("data-v-e8618fe8"),s=s(),M(),s),D={class:"max-w-lg mx-auto p-4 bg-white relative"},R={class:"text-xl font-semibold mb-4"},Y={key:0,class:"bg-green-200 text-green-800 p-4 mt-4 rounded"},J={key:1,class:"bg-red-200 text-red-800 p-4 mt-4 rounded"},z={key:2,class:"bg-red-200 text-red-800 p-4 mt-4 rounded"},G={class:"font-bold text-xl mb-2"},Q={class:"relative"},Z={class:"flex items-center cursor-pointer mb-4 bg-orange-50 py-2 px-1 rounded-xl"},K={class:"relative"},W={class:"ml-3 text-gray-700 text-base uppercase"},X={key:0,class:"float-right"},$=d(()=>t("img",{class:"h-5 ml-3",src:"assets/images/icons/process.gif",alt:"Processing..."},null,-1)),ee=[$],re={class:"flex items-center mb-6"},se=["onClick"],oe={key:0},te=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Account Information",-1)),ie={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},le={key:1},ne=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Profile Images & Basic Info",-1)),me={class:"mb-4"},ae=d(()=>t("label",{class:"block text-gray-700"},[y(" Upload Profile Image 1 "),t("span",{class:"text-red-500"},"*")],-1)),ue={key:0,class:"text-red-500 text-xs italic"},de={class:"mb-4"},he=d(()=>t("label",{class:"block text-gray-700"},"Upload Profile Image 2",-1)),fe={key:0,class:"text-red-500 text-xs italic"},pe={class:"mb-4"},ce=d(()=>t("label",{class:"block text-gray-700"},[y(" Bio "),t("span",{class:"text-red-500"},"*")],-1)),ge={key:0,class:"text-red-500 text-xs italic"},ye={key:2},be=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Location Details",-1)),xe={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},ke={key:3},ve=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Location Details",-1)),Ve={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},_e={key:4},Se=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Personal Information",-1)),we={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},qe={class:"flex gap-4"},Ce={key:5},Ue=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Lifestyle Information",-1)),Le={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},Te={key:6},Pe=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Professional and Hobbies",-1)),Ie={class:"grid grid-cols-1 md:grid-cols-1 gap-1"},Me={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"},Ee={key:7},Fe=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Seeking",-1)),Oe={class:"mb-4"},Ne=d(()=>t("label",{class:"block text-gray-700"},[y(" Summarize what you are seeking in a match "),t("span",{class:"text-red-500"},"*")],-1)),je={key:0,class:"text-red-500 text-xs italic"},Ae={key:8},Be=d(()=>t("h3",{class:"font-semibold text-lg mb-4"},"Terms and Conditions",-1)),He={class:"space-y-4 flex items-start"},De={class:"text-gray-500 text-sm mb-2 flex items-center"},Re=d(()=>t("span",{class:"text-lg"},"I have read and agree to the",-1)),Ye={class:"space-y-4 flex items-start mt-2"},Je={class:"text-gray-500 text-sm mb-2 flex items-center"},ze=d(()=>t("span",{class:"text-lg"},"I have read and agree to the",-1)),Ge={class:"mt-6 flex justify-between"},Qe=d(()=>t("div",{class:"flex-1"},null,-1)),Ze=["disabled"],Ke={class:"my-4 w-full block text-center"};function We(s,r,h,f,e,a){const l=b("input-text"),c=b("select-option"),U=b("router-link"),L=b("pdf-modal");return n(),m("div",D,[t("h2",R,p(e.form.ismatchmaker?"Matchmaker Registration":"Client Registration"),1),e.successMessage?(n(),m("div",Y,p(e.successMessage),1)):u("",!0),e.errors.general?(n(),m("div",J,p(e.errors.general),1)):u("",!0),a.validationErrorsList.length?(n(),m("div",z,[t("ul",null,[(n(!0),m(V,null,_(a.validationErrorsList,(o,x)=>(n(),m("li",{key:x},p(o),1))),128))])])):u("",!0),t("div",G,[t("div",Q,[t("label",Z,[t("div",K,[g(t("input",{type:"checkbox","onUpdate:modelValue":r[0]||(r[0]=o=>e.form.ismatchmaker=o),class:"sr-only",onClick:r[1]||(r[1]=(...o)=>a.switchMatchmaker&&a.switchMatchmaker(...o))},null,512),[[k,e.form.ismatchmaker]]),t("div",{class:v([{"bg-connectyed-button-light":!e.form.ismatchmaker,"bg-connectyed-button-dark":e.form.ismatchmaker},"block w-14 h-8 rounded-full transition-colors duration-300"])},null,2),t("div",{class:v(["dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300",{"translate-x-6":e.form.ismatchmaker}])},null,2)]),t("span",W,p(e.form.ismatchmaker?"Switch to Register as a Client":"Switch to Register as a Matchmaker"),1)])]),e.processing?(n(),m("span",X,ee)):u("",!0)]),t("div",re,[(n(!0),m(V,null,_(e.steps,(o,x)=>(n(),m("div",{key:x},[t("div",{onClick:Xe=>a.goToStep(o),class:v(["text-center py-2 px-3 mx-1 rounded-full cursor-pointer",{"bg-connectyed-button-light text-connectyed-button-dark":e.currentStep===o,"bg-gray-200 text-gray-600":e.currentStep!==o}])},p(o),11,se)]))),128))]),t("form",{onSubmit:r[44]||(r[44]=C((...o)=>a.register&&a.register(...o),["prevent"])),enctype:"multipart/form-data"},[e.currentStep===1?(n(),m("div",oe,[te,t("div",ie,[i(l,{label:"Name",modelValue:e.form.name,"onUpdate:modelValue":r[2]||(r[2]=o=>e.form.name=o),required:!0,error:e.errors.name,maxlength:"255"},null,8,["modelValue","error"]),i(l,{label:"Username",modelValue:e.form.username,"onUpdate:modelValue":r[3]||(r[3]=o=>e.form.username=o),required:!0,error:e.errors.username,maxlength:"50"},null,8,["modelValue","error"]),i(l,{label:"Email",modelValue:e.form.email,"onUpdate:modelValue":r[4]||(r[4]=o=>e.form.email=o),required:!0,error:e.errors.email,maxlength:"255",type:"email"},null,8,["modelValue","error"]),i(l,{label:"Password",type:"password",modelValue:e.form.password,"onUpdate:modelValue":r[5]||(r[5]=o=>e.form.password=o),required:!0,error:e.errors.password,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"Confirm Password",type:"password",modelValue:e.form.password_confirmation,"onUpdate:modelValue":r[6]||(r[6]=o=>e.form.password_confirmation=o),required:!0,error:e.errors.password_confirmation,maxlength:"100"},null,8,["modelValue","error"])])])):u("",!0),e.currentStep===2&&e.form.ismatchmaker?(n(),m("div",le,[ne,t("div",me,[ae,t("input",{type:"file",onChange:r[7]||(r[7]=o=>a.onFileChange(o,"profile_image1")),accept:"image/*",required:""},null,32),e.errors.profile_image1?(n(),m("p",ue,p(e.errors.profile_image1),1)):u("",!0)]),t("div",de,[he,t("input",{type:"file",onChange:r[8]||(r[8]=o=>a.onFileChange(o,"profile_image2")),accept:"image/*"},null,32),e.errors.profile_image2?(n(),m("p",fe,p(e.errors.profile_image2),1)):u("",!0)]),i(l,{label:"Age",modelValue:e.form.age,"onUpdate:modelValue":r[9]||(r[9]=o=>e.form.age=o),type:"number",required:!0,error:e.errors.age,maxlength:"3",min:"18",max:"100"},null,8,["modelValue","error"]),i(l,{label:"Years of Experience",modelValue:e.form.yearsexperience,"onUpdate:modelValue":r[10]||(r[10]=o=>e.form.yearsexperience=o),type:"number",required:!0,error:e.errors.yearsexperience,min:"0"},null,8,["modelValue","error"]),t("div",pe,[ce,g(t("textarea",{"onUpdate:modelValue":r[11]||(r[11]=o=>e.form.bio=o),placeholder:"Tell us about yourself",class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",required:""},null,512),[[S,e.form.bio]]),e.errors.bio?(n(),m("p",ge,p(e.errors.bio),1)):u("",!0)])])):u("",!0),e.currentStep===2&&!e.form.ismatchmaker?(n(),m("div",ye,[be,t("div",xe,[i(l,{label:"City",modelValue:e.form.city,"onUpdate:modelValue":r[12]||(r[12]=o=>e.form.city=o),required:!0,error:e.errors.city,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"State",modelValue:e.form.state,"onUpdate:modelValue":r[13]||(r[13]=o=>e.form.state=o),required:!0,error:e.errors.state,maxlength:"100"},null,8,["modelValue","error"]),i(c,{label:"Country",options:e.filteredCountries,modelValue:e.form.country,"onUpdate:modelValue":r[14]||(r[14]=o=>e.form.country=o),required:!0,error:e.errors.country,onSearch:a.handleCountrySearch},null,8,["options","modelValue","error","onSearch"]),i(l,{label:"Current Location (City)",modelValue:e.form.currentLocation,"onUpdate:modelValue":r[15]||(r[15]=o=>e.form.currentLocation=o),required:!0,error:e.errors.currentLocation,maxlength:"100"},null,8,["modelValue","error"])])])):u("",!0),e.currentStep===3&&e.form.ismatchmaker?(n(),m("div",ke,[ve,t("div",Ve,[i(l,{label:"City",modelValue:e.form.city,"onUpdate:modelValue":r[16]||(r[16]=o=>e.form.city=o),required:!0,error:e.errors.city,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"State",modelValue:e.form.state,"onUpdate:modelValue":r[17]||(r[17]=o=>e.form.state=o),required:!0,error:e.errors.state,maxlength:"100"},null,8,["modelValue","error"]),i(c,{label:"Country",options:e.filteredCountries,modelValue:e.form.country,"onUpdate:modelValue":r[18]||(r[18]=o=>e.form.country=o),required:!0,error:e.errors.country,onSearch:a.handleCountrySearch},null,8,["options","modelValue","error","onSearch"]),i(l,{label:"Current Location (City)",modelValue:e.form.currentLocation,"onUpdate:modelValue":r[19]||(r[19]=o=>e.form.currentLocation=o),required:!0,error:e.errors.currentLocation,maxlength:"100"},null,8,["modelValue","error"])])])):u("",!0),e.currentStep===3&&!e.form.ismatchmaker?(n(),m("div",_e,[Se,t("div",we,[i(l,{label:"Age",modelValue:e.form.age,"onUpdate:modelValue":r[20]||(r[20]=o=>e.form.age=o),type:"number",required:!0,error:e.errors.age,maxlength:"3",min:"1",max:"120"},null,8,["modelValue","error"]),i(c,{label:"Gender",options:e.genders,modelValue:e.form.gender,"onUpdate:modelValue":r[21]||(r[21]=o=>e.form.gender=o),required:!0,error:e.errors.gender},null,8,["options","modelValue","error"]),i(l,{label:"Hair Color",modelValue:e.form.hairColor,"onUpdate:modelValue":r[22]||(r[22]=o=>e.form.hairColor=o),required:!0,error:e.errors.hairColor,maxlength:"50"},null,8,["modelValue","error"]),i(c,{label:"Body Type",options:e.bodyTypes,modelValue:e.form.bodyType,"onUpdate:modelValue":r[23]||(r[23]=o=>e.form.bodyType=o),required:!0,error:e.errors.bodyType},null,8,["options","modelValue","error"]),t("div",qe,[i(l,{label:"Height (Feet)",modelValue:e.form.heightFeet,"onUpdate:modelValue":r[24]||(r[24]=o=>e.form.heightFeet=o),type:"number",required:!0,error:e.errors.heightFeet,maxlength:"2",min:"1",max:"8"},null,8,["modelValue","error"]),i(l,{label:"Inches",modelValue:e.form.heightInches,"onUpdate:modelValue":r[25]||(r[25]=o=>e.form.heightInches=o),type:"number",required:!0,error:e.errors.heightInches,maxlength:"2",min:"0",max:"11"},null,8,["modelValue","error"])])])])):u("",!0),e.currentStep===4&&!e.form.ismatchmaker?(n(),m("div",Ce,[Ue,t("div",Le,[i(c,{label:"Marital Status",options:e.maritalStatuses,modelValue:e.form.maritalStatus,"onUpdate:modelValue":r[26]||(r[26]=o=>e.form.maritalStatus=o),required:!0,error:e.errors.maritalStatus},null,8,["options","modelValue","error"]),i(c,{label:"Children",options:e.childrenOptions,modelValue:e.form.children,"onUpdate:modelValue":r[27]||(r[27]=o=>e.form.children=o),required:!0,error:e.errors.children},null,8,["options","modelValue","error"]),i(c,{label:"Religion",options:e.religions,modelValue:e.form.religion,"onUpdate:modelValue":r[28]||(r[28]=o=>e.form.religion=o),required:!0,error:e.errors.religion},null,8,["options","modelValue","error"]),i(c,{label:"Smoker",options:e.yesNoOptions,modelValue:e.form.smoker,"onUpdate:modelValue":r[29]||(r[29]=o=>e.form.smoker=o),required:!0,error:e.errors.smoker},null,8,["options","modelValue","error"]),i(c,{label:"Drinker",options:e.drinkerOptions,modelValue:e.form.drinker,"onUpdate:modelValue":r[30]||(r[30]=o=>e.form.drinker=o),required:!0,error:e.errors.drinker},null,8,["options","modelValue","error"])])])):u("",!0),e.currentStep===5&&!e.form.ismatchmaker?(n(),m("div",Te,[Pe,t("div",Ie,[i(l,{label:"Education",modelValue:e.form.education,"onUpdate:modelValue":r[31]||(r[31]=o=>e.form.education=o),required:!0,error:e.errors.education,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"Job Title",modelValue:e.form.jobTitle,"onUpdate:modelValue":r[32]||(r[32]=o=>e.form.jobTitle=o),required:!0,error:e.errors.jobTitle,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"Sports",modelValue:e.form.sports,"onUpdate:modelValue":r[33]||(r[33]=o=>e.form.sports=o),required:!0,error:e.errors.sports,maxlength:"100"},null,8,["modelValue","error"]),i(l,{label:"Hobbies",modelValue:e.form.hobbies,"onUpdate:modelValue":r[34]||(r[34]=o=>e.form.hobbies=o),required:!0,error:e.errors.hobbies,maxlength:"100"},null,8,["modelValue","error"])]),t("div",Me,[i(c,{label:"English Level",options:e.englishLevels,modelValue:e.form.englishLevel,"onUpdate:modelValue":r[35]||(r[35]=o=>e.form.englishLevel=o),required:!0,error:e.errors.englishLevel},null,8,["options","modelValue","error"]),i(l,{label:"Languages",modelValue:e.form.languages,"onUpdate:modelValue":r[36]||(r[36]=o=>e.form.languages=o),required:!0,error:e.errors.languages,maxlength:"100"},null,8,["modelValue","error"])])])):u("",!0),e.currentStep===6&&!e.form.ismatchmaker?(n(),m("div",Ee,[Fe,t("div",Oe,[Ne,g(t("textarea",{"onUpdate:modelValue":r[37]||(r[37]=o=>e.form.seeking=o),placeholder:"Please explain",class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",required:""},null,512),[[S,e.form.seeking]]),e.errors.seeking?(n(),m("p",je,p(e.errors.seeking),1)):u("",!0)])])):u("",!0),e.currentStep===4&&e.form.ismatchmaker||e.currentStep===7&&!e.form.ismatchmaker?(n(),m("div",Ae,[Be,t("div",He,[t("label",De,[g(t("input",{type:"checkbox","onUpdate:modelValue":r[38]||(r[38]=o=>e.form.privacypolicy=o),id:"privacypolicy",name:"privacypolicy",required:!0,class:"mr-2 form-checkbox"},null,512),[[k,e.form.privacypolicy]]),Re]),t("a",{onClick:r[39]||(r[39]=o=>a.showPrivacy()),class:"text-connectyed-link-dark cursor-pointer underline"}," Privacy Policy ")]),t("div",Ye,[t("label",Je,[g(t("input",{type:"checkbox","onUpdate:modelValue":r[40]||(r[40]=o=>e.form.termsofuse=o),id:"termsofuse",name:"termsofuse",required:!0,class:"mr-2 form-checkbox"},null,512),[[k,e.form.termsofuse]]),ze]),t("a",{onClick:r[41]||(r[41]=o=>a.showTerm()),class:"text-connectyed-link-dark cursor-pointer underline"}," Terms of Use ")])])):u("",!0),t("div",Ge,[e.currentStep>1?(n(),m("button",{key:0,type:"button",class:"bg-connectyed-button-pagination-light text-connectyed-button-dark py-2 px-4 rounded min-w-32 cursor-pointer",onClick:r[42]||(r[42]=(...o)=>a.prevStep&&a.prevStep(...o))}," Previous ")):u("",!0),Qe,e.currentStep<e.steps.length?(n(),m("button",{key:1,type:"button",class:"bg-connectyed-button-pagination-light text-connectyed-button-dark py-2 px-4 rounded min-w-32 cursor-pointer",onClick:r[43]||(r[43]=(...o)=>a.nextStep&&a.nextStep(...o))}," Next ")):(n(),m("button",{key:2,class:"bg-connectyed-button-light hover:bg-connectyed-button-hover-light text-connectyed-button-hover-dark py-2 px-4 rounded cursor-pointer",type:"submit",disabled:e.processing},p(e.processing?"Please wait":"Register"),9,Ze))])],32),t("label",Ke,[y(" Already have an account? "),i(U,{class:"text-connectyed-link-dark underline",to:{name:"login"}},{default:P(()=>[y("Login Now!")]),_:1})]),i(L,{isOpen:e.isModalOpen,pdfUrl:e.pdfUrl,onClose:a.closeModal},null,8,["isOpen","pdfUrl","onClose"])])}const sr=q(H,[["render",We],["__scopeId","data-v-e8618fe8"]]);export{sr as default};