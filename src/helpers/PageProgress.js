import NProgress from 'nprogress'

class PageProgress {
  constructor () {
    this.loaded = false
  }

  start () {
    if (!this.loaded) {
      NProgress.start()
    }
  }

  done () {
    if (!this.loaded) {
      this.loaded = true
      NProgress.done()
    }

    return true
  }
}

export default PageProgress
