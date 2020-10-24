

let svgContainer = document.querySelector('.bodymovinanim');
let animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  path: "https://assets8.lottiefiles.com/packages/lf20_gHKiWa.json"
});

