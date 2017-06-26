/**
 * Created by 28431 on 2017/6/21.
 */
export const getTime = (timestr) => {
  if (timestr == null) {
    return ''
  }
  let old = new Date(timestr)
  let newTime = new Date()
  let time = Math.floor((newTime.getTime() - old.getTime()) / 1000)
  let years = Math.floor(time / 365 / 24 / 60 / 60)
  let months = Math.floor(time / 30 / 24 / 60 / 60)
  let days = Math.floor(time / 24 / 60 / 60)
  let hours = Math.floor(time / 60 / 60)
  let minutes = Math.floor(time / 60)
  if (years > 0) {
    return years + '年前'
  } else if (months > 0) {
    return months + '个月前'
  } else if (days > 0) {
    return days + '天前'
  } else if (hours > 0) {
    return hours + '小时前'
  } else if (minutes > 0) {
    return minutes + '分钟前'
  } else {
    return '几秒前'
  }
}

export const sign = (val) => {
  let str = ''
  if (val.top) {
    str = '置顶'
  } else if (val.good) {
    str = '精华'
  } else {
    switch (val.tab) {
      case 'share':
        str = '分享'
        break
      case 'ask':
        str = '问答'
        break
      case 'job':
        str = '招聘'
        break
      case 'good':
        str = '精华'
        break
      default:
        str = '其他'
        break
    }
  }
  return str
}
