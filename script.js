const images = [
    "ghibli1.png", "ghibli2.png", "ghibli3.png", "ghibli4.png", "ghibli5.png",
    "ghibli6.png", "ghibli7.png", "ghibli8.png", "ghibli9.png", "ghibli10.png"
  ];
  
  const board = document.getElementById("game-board");
  const message = document.getElementById("message");
  let cards = images.concat(images);
  let flipped = [];
  let matched = 0;
  
  cards = cards.sort(() => 0.5 - Math.random());
  
  cards.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back"><img src="${img}" /></div>
      </div>`;
    board.appendChild(card);
  
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flipped.length === 2) return;
  
      card.classList.add("flipped");
      flipped.push({ card, img });
  
      if (flipped.length === 2) {
        const [first, second] = flipped;
        if (first.img === second.img) {
          matched += 1;
          flipped = [];
          if (matched === images.length) {
            message.textContent = "🎉 You matched all Ghibli pairs!";
          }
        } else {
          setTimeout(() => {
            first.card.classList.remove("flipped");
            second.card.classList.remove("flipped");
            flipped = [];
          }, 800);
        }
      }
    });
  });
  
  const scrollWrapper = document.getElementById("scroll-wrapper");
  
  function populateScrollImages() {
    for (let i = 0; i < 50; i++) {
      const img = document.createElement("img");
      img.src = `${images[i % images.length]}`;
      img.className = "scroll-img";
      scrollWrapper.appendChild(img);
    }
  }
  
  populateScrollImages();
  
  gsap.to(scrollWrapper, {
    y: "-=100%",
    duration: 60,
    ease: "none",
    repeat: -1
  });
