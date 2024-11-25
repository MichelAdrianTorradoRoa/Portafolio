
const menumbg = document.querySelector("#menu-mbg img");
menumbg.addEventListener("click",(e)=>{
    const list2 = document.getElementById("ul2");
    
    if(list2.className=="active")
    {
        list2.classList.remove("active");
        list2.classList.add("inactive")
    }else{
        list2.classList.remove("inactive");
        list2.classList.add("active")
    }
    e.stopPropagation();
    e.preventDefault();
})

document.addEventListener("DOMContentLoaded", function () {
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    const languageToggle = document.getElementById("languageToggle");
    let currentLanguage = "es";
  
    languageToggle.addEventListener("click", () => {
      const newLanguage = currentLanguage === "es" ? "en" : "es";
      translatePage(newLanguage);
      currentLanguage = newLanguage;
      languageToggle.textContent = newLanguage.toUpperCase();
    });
  
    function translatePage(language) {
      elementsToTranslate.forEach(element => {
        const text = element.textContent.trim();
        translateText(text, language)
          .then(translatedText => {
            element.textContent = translatedText;
          })
          .catch(error => {
            console.error("Error translating text:", error);
          });
      });
    }
  
    function translateText(text, targetLanguage) {
      return fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          auth_key: "f43b86d7-619f-4b35-9c58-3db7e2e8508f:fx",
          text: text,
          target_lang: targetLanguage.toUpperCase()
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.translations && data.translations[0] && data.translations[0].text) {
            return data.translations[0].text;
          } else {
            throw new Error("Translation error");
          }
        });
    }
  });

const textElement = document.getElementById("text-hero");

const text = "Michel Adrian Torrado Roa "
let index = 1;
speed = 300 / 2;

const writeText = () => {
    textElement.innerText = text.slice(0, index)
    index++

    if (index > text.length) {
        index = 1
    }

    setTimeout(writeText, speed)
}


writeText()