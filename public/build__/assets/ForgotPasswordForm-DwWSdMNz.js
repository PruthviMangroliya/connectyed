import{d as r,e,p as u,n as m,v as p,k as h,t as n,h as c,o as i,B as g,C as _}from"./app-Cf285zSj.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={data(){return{email:"",successMessage:"",errorMessage:"",processing:!1}},methods:{async submitEmail(){this.processing=!0;try{const t=await axios.post("/api/password/email",{email:this.email});this.successMessage="Reset link has been sent to your email.",this.processing=!1,setTimeout(()=>{this.$router.push({name:"login"})},500)}catch{this.errorMessage="Failed to send reset link. Please check your email.",this.processing=!1}}}},l=t=>(g("data-v-8d60e2c5"),t=t(),_(),t),x={class:"mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-center justify-center"},y={class:"w-full max-w-sm mt-20"},w={class:"forgot-password"},v=l(()=>e("div",{class:"font-bold text-xl mb-2"},"Forgot Password",-1)),k={class:"form-group"},M=l(()=>e("label",{for:"email"},"Email",-1)),S={type:"submit",class:"bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light w-full h-12 transition-colors duration-150 focus:shadow-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-100"},E={key:0,class:"float-right"},B=l(()=>e("img",{class:"h-5 ml-3 mt-1",src:"assets/images/icons/process.gif"},null,-1)),F=[B],I={key:0,class:"text-green-500"},P={key:1,class:"text-red-500"};function V(t,o,N,T,s,d){return i(),r("div",x,[e("div",y,[e("div",w,[v,e("form",{onSubmit:o[1]||(o[1]=u((...a)=>d.submitEmail&&d.submitEmail(...a),["prevent"])),class:"bg-connectyed-card-light shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-gray-200"},[e("div",k,[M,m(e("input",{"onUpdate:modelValue":o[0]||(o[0]=a=>s.email=a),type:"email",id:"email",required:"",class:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"},null,512),[[p,s.email]])]),e("button",S,[h(n(s.processing?"Please wait":"Send Reset Link")+" ",1),s.processing?(i(),r("span",E,F)):c("",!0)])],32),s.successMessage?(i(),r("p",I,n(s.successMessage),1)):c("",!0),s.errorMessage?(i(),r("p",P,n(s.errorMessage),1)):c("",!0)])])])}const R=f(b,[["render",V],["__scopeId","data-v-8d60e2c5"]]);export{R as default};
