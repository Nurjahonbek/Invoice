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
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'default')
  const { themes } = useAppStore();
  const [dark, setDark] = useState(document.documentElement.dataset.theme.startsWith("dark-"))
  function handleTheme(el) {
    if(dark){
        const value = `dark-${el}`;
        document.documentElement.dataset.theme = value
        setTheme(value)
    }else{
    document.documentElement.dataset.theme = `${el}`
    setTheme(el)
    }
  }
  function handleDark(){
        setDark(!dark)
  }

  useEffect(() =>{
    if(dark){
        const value = `dark-${theme}`
        document.documentElement.dataset.theme = value
        setTheme(value)
    }
    else{
         document.documentElement.dataset.theme = theme
         setTheme(theme)
    }
  }, [dark])

  useEffect(() =>{
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="flex gap-5 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Change theme
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el, index) => {
              return (
                <Button key={index} onClick={() =>{
                    handleTheme(el)
                }} className={"justify-start"} variant="ghost">
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={handleDark}>
        {dark ? <Sun/> : <Moon/>}
      </Button>
    </div>
  );
}

export default ThemesToggle;
