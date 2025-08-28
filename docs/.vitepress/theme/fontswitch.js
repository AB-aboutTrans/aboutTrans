export const switchFontWeight = (weight) => {
  document.body.style.fontWeight = weight;
  localStorage.setItem('fontWeight', weight);
};

export const addFontWeightSwitchListener = () => {
  const bindItems = () => {
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      const linkText = link.textContent.trim();
      
      if (linkText === '正文加粗' || linkText === '恢复默认') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (linkText === '正文加粗') {
            switchFontWeight(600);
          } else if (linkText === '恢复默认') {
            switchFontWeight(400);
          }
        });
      }
    });
  };

  bindItems();

  const observer = new MutationObserver(bindItems);
  observer.observe(document.body, { childList: true, subtree: true });

  const savedWeight = localStorage.getItem('fontWeight');
  if (savedWeight) {
    document.body.style.fontWeight = savedWeight;
  } else {
    document.body.style.fontWeight = 400;
  }
};
