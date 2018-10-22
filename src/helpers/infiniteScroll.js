// Code snippet based on:
//   http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html
//
const infiniteScoll = (pagination, onPageEnd) => {
  const moreToScroll = pagination && pagination.next_page;
  if (!moreToScroll) {
    return;
  }

  const windowHeight = window.innerHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight =
    Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ) - 20;
  const windowBottom = windowHeight + window.pageYOffset;

  if (windowBottom >= docHeight) {
    onPageEnd();
  }
};

export default infiniteScoll;
