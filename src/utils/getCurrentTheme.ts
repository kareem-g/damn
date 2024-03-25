export const getCurrentTheme = () => {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || currentTheme === 'light') {
    theme = currentTheme;
  }

  return theme;
};

export const loadTheme = (theme: string) => {
  const root = document.querySelector(':root');
  root?.setAttribute('color-scheme', theme);
};
