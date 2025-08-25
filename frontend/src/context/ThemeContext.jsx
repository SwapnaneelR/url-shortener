import React from 'react'

const ThemeContext = () => {
    const [theme,setTheme] = useState("dark")
    function changeTheme(theme : string){
      if(theme==="dark")
        setTheme("light");
      else setTheme("dark");
      console.log(theme)
    }
  return (
     
  )
}

export default ThemeContext