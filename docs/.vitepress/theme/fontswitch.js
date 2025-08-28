export const switchFontWeight = (weight) => {
  document.body.style.fontWeight = weight;
  localStorage.setItem('fontWeight', weight);
};

export const addFontWeightSwitchListener = () => {
  const items = document.querySelectorAll('.items a');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const text = e.target.innerText.trim();

      if (text === '正文加粗') {
        switchFontWeight(600);
      } else if (text === '恢复默认') {
        switchFontWeight(400);
      }
    });
  });

  const savedWeight = localStorage.getItem('fontWeight');
  if (savedWeight) {
    document.body.style.fontWeight = savedWeight;
  } else {
    document.body.style.fontWeight = 400;
  }
};
