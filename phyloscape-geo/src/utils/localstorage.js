const db = {
    set (key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    get (key, defaultValue = {}) {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue
      } catch (err) {
        return defaultValue
      }
    },
    remove (key) {
      localStorage.removeItem(key)
    },
  }
  
  export default db
  