import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowBigDown, Sun, Moon} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";

function ThemesToggle() {
  const { themes } = useAppStore();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'default')

  function handleTheme(type, mode) {
    const html = document.documentElement
    let isDark;
    if(html.dataset.theme.startsWith("dark-")){
      isDark = true
    }
    else{
      isDark = false
    }

    if(mode === 'theme'){
      if(!isDark){
        html.dataset.theme = `${type}`
        setTheme(`${type}`)
      }
      else{
        html.dataset.theme = type;
        setTheme(type)
      }
    }
    else if(mode === "dark"){
      if(type.startsWith('dark-')){
        html.dataset.theme = type.replace("dark-", "");
        setTheme(type.replace("dark-", ""))
      }
      else{
        setTheme(`dark-${type}`)
        html.dataset.theme = `dark-${type}`
      }
    }
  }

  useEffect(() =>{
    document.documentElement.dataset.theme = theme;
  }, [])

  useEffect(() =>{
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="flex md:items-start md:mb-8 md:p-0 gap-5 base-container md:flex-col  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="md:hidden">Change theme</span>
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 flex-col flex md:ml-25 ">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el, index) => {
              return (
                <Button key={index} onClick={() =>{
                    handleTheme(el, "theme")
                }} className={"justify-start"} variant="ghost">
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button  size={'icon'} onClick={() =>{
        handleTheme(theme, "dark")
      }}>
        {theme.startsWith("dark-") ? <Sun/> : <Moon/>}
      </Button>
    </div>
  );
}

export default ThemesToggle;
