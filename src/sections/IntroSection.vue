<template>
  <section class="wrapper">
    <h1 class="title">Vue 3 Snapshot Serializer</h1>

    <h2 class="subtitle">
      for
      <strong>
        Vitest
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.74024 1.05293a.49504.49504 0 0 0-.1569.02512.49338.49338 0 0 0-.25056.1876L7.59513 9.56159a.4895.4895 0 0 0-.08373.22327.48846.48846 0 0 0 .03163.23629.4893.4893 0 0 0 .13985.19319.4927.4927 0 0 0 .2149.10481l3.70685.78609-.22947 4.58007a.48834.48834 0 0 0 .08466.30017.49205.49205 0 0 0 .24931.18854c.10157.03398.21174.03444.3135.00064a.49387.49387 0 0 0 .25056-.18761l5.73735-8.29594a.4884.4884 0 0 0 .08404-.22327c.009-.08015-.0016-.16137-.03163-.23629a.48835.48835 0 0 0-.13985-.19319.49318.49318 0 0 0-.2149-.1048l-3.70686-.7861.22947-4.58008a.48802.48802 0 0 0-.08466-.30017.4913.4913 0 0 0-.24931-.18853.49439.49439 0 0 0-.1566-.02574zM1.15697 9.78795c-.30647.0012-.60009.12378-.81679.34048a1.16107 1.16107 0 0 0-.34017.81648 1.162 1.162 0 0 0 .33366.81957l10.84241 10.8421a1.15762 1.15762 0 0 0 .37677.25211 1.1583 1.1583 0 0 0 .44467.08838c.00084 0 .0016-.00031.0025-.00031.00073 0 .0014.00031.0022.00031a1.15827 1.15827 0 0 0 .44467-.08838 1.15731 1.15731 0 0 0 .37677-.2521l10.84236-10.8421a1.16272 1.16272 0 0 0 .33397-.81958c-.0013-.30647-.12376-.59976-.34048-.81648a1.1616 1.1616 0 0 0-.81679-.34048 1.16114 1.16114 0 0 0-.81926.33366l-5.4012 5.4009c-.0078.0074-.01718.01255-.02482.02015L12 20.14011l-4.59776-4.59745c-.0074-.0074-.01659-.01238-.02419-.01954l-5.4015-5.40151a1.162 1.162 0 0 0-.81958-.33366Z"
          />
        </svg>
      </strong>
      <span>
        &amp;
        <strong>Jest
          <svg
            style="vertical-align: 2px;"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.116 3.116 0 0 0-2.244 2.988c0 1.043.52 1.967 1.313 2.536a8.279 8.279 0 0 1-1.084 1.244 8.14 8.14 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08 3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182-.048.097-.097.195-.146.299-.465.959-.993 2.043-1.195 3.259-.403 2.432.257 4.384 1.849 5.489A5.093 5.093 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807 1.279-.632 2.599-1.292 3.898-1.612.48-.118.98-.187 1.508-.264 1.07-.153 2.175-.312 3.168-.89a4.482 4.482 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007c.056-.042.118-.084.18-.125 0 0 .008 0 .008-.007.028-.014.055-.035.083-.05.007 0 .014-.006.021-.006.028-.014.063-.028.097-.042.035-.014.07-.027.098-.041.007 0 .013-.007.02-.007.028-.007.056-.021.084-.028.007 0 .02-.007.028-.007.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014c.055.007.111.014.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385-2.648 5.35c-.104-.034-.216-.055-.327-.076l-2.494-7.38zm4.968 9.825a3.083 3.083 0 0 0-.938-1.668l1.438-2.904 1.452 2.967c-.43.43-.743.98-.868 1.605H15.01zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007.014 0 .02 0 .035.007.027.007.048.007.076.014.007 0 .014 0 .028.007l.097.02h.007c.028.008.056.015.083.029.007 0 .014.007.028.007.021.007.049.014.07.027.007 0 .014.007.02.007.028.014.056.021.084.035h.007a.374.374 0 0 1 .09.049h.007c.028.014.056.034.084.048.007 0 .007.007.013.007.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.747 1.747 0 0 1 .48 1.209 1.752 1.752 0 0 1-3.502 0 1.742 1.742 0 0 1 1.32-1.695zm-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751-1.752-.785-1.752-1.75.786-1.752 1.751-1.752zm16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17.29 17.29 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717-1.724.854-3.35 1.66-4.857 1.66a3.645 3.645 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12.167-1.015.632-1.966 1.077-2.877.028-.055.049-.104.077-.16.152.056.312.098.479.126-.264 1.473.486 2.994 1.946 3.745l.264.139.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.334 9.334 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.117 3.117 0 0 0 3.008-2.327h1.167a3.109 3.109 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43.18.52.236 1.063.139 1.605z"
            />
          </svg>
        </strong>
      </span>
    </h2>

    <p class="explainer">
      This library provides the <strong>best snapshots possible</strong> for Vue components.<br>
      It is the official successor to <a href="https://github.com/tjw-lint/jest-serializer-vue-tjw">Jest-Serializer-Vue-TJW</a> (Vue 2, Jest, CJS).
    </p>

    <h3 class="punches">Simple API.</h3>
    <h3 class="punches">Powerful features.</h3>
    <h3 class="punches">Nuanced formatting control.</h3>
  </section>
</template>

<script>
export default {
  name: 'IntroSection'
};
</script>

<style>
.title {
  margin-top: 6rem;
  margin-bottom: 2rem;
  font-family: Lora, Superclarendon, 'Bookman Old Style', 'Georgia Pro', Georgia, serif;
  font-size: 4.76rem;
  font-style: italic;
  font-weight: 625;
  text-align: center;
  transition: 5s ease all;
}
.title:hover {
  color: #CECCDA;
  transition: 1s ease all;
  transform: scale(1.02) skew(-6deg);
}
.subtitle {
  line-height: 2.5;
}
.subtitle,
.punches {
  margin-top: 0rem;
  font-family: Superclarendon, 'Bookman Old Style', 'Georgia Pro', Georgia, serif;
  font-size: 2rem;
  font-style: italic;
  font-weight: normal;
  text-align: center;
}
.punches {
  font-size: 1.75rem;
}
@keyframes floating-logos {
  0%,
  100% {
    top: 4px;
    opacity: 0.1;
  }
  50% {
    top: -1px;
    opacity: 0.25;
  }
}
.subtitle span {
  display: inline-block;
  margin-left: 0.625rem;
}
.subtitle svg {
  position: absolute;
  top: 4px;
  left: calc(50% - 1px);
  width: 20px;
  fill: currentColor;
  animation: floating-logos 2s ease-in-out infinite;
}
.subtitle strong:hover svg,
.subtitle svg:hover {
  top: 4px;
  opacity: 1.0;
  animation: none;
}
.subtitle strong {
  position: relative;
  display: inline-block;
}
@keyframes rainbow-text {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.subtitle strong:hover {
  background: linear-gradient(to right, #66F, #09F, #0F0, #F39, #66F, #09F);
  background-clip: text;
  background-size: 400% 100%;
  color: transparent;
  animation: rainbow-text 4s ease-in-out infinite;
}

@keyframes rainbow-icon {
  0%,
  100% { fill: #09F; }
  25%  { fill: #0F0; }
  50%  { fill: #F39; }
  75%  { fill: #66F; }
}
.subtitle strong:hover svg {
  animation: rainbow-icon 4s ease-in-out infinite;
}

.explainer {
  margin: 7rem 0rem;
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
}
.explainer strong {
  font-weight: 900;
}

@media (width < 360px) {
  .title {
    font-size: 3rem;
  }
}
@media (width < 294px) {
  .title {
    margin-top: 8rem;
  }
}
@media (width < 254px) {
  .title {
    margin-top: 10.5rem;
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1.5rem;
  }
}
@media (width < 200px) {
  .subtitle span {
    display: block;
    margin-left: 0rem;
  }
}
@media (width < 159px) {
  .title {
    margin-top: 14rem;
    font-size: 1.8rem;
  }
}
@media (width < 144px) {
  .title {
    margin-top: 16rem;
  }
}
@media (width < 136px) {
  .title {
    margin-top: 18rem;
  }
}
@media (width < 119px) {
  .title {
    margin-top: 21rem;
    font-size: 1.5rem;
  }
}
@media (width < 101px) {
  .title {
    font-size: 1.3rem;
  }
}
</style>
