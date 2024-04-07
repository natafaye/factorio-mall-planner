import { useEffect, useState } from "react"
import styles from "./ItemIcon.module.css"

export default function ItemImage({ 
  name, style, className = "", ...props 
}: { name: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const [spriteSize, setSpriteSize] = useState("120x64")
  
  let imageName = name
  if(name.startsWith("kr-")) {
    imageName = name.substring(3)
  } else if(name.startsWith("Arci-")) {
    imageName = name.substring(5)
  }

  let url = new URL(`../../assets/icons/${imageName}.png`, import.meta.url)
  if(url.pathname.endsWith("undefined")) url = new URL(`../../assets/icons/none.png`, import.meta.url)

  useEffect(() => {
    const image = new Image()
    image.onload = function() {
      setSpriteSize(`${image.width}x${image.height}`)
    }
    image.src = url.href
  }, [name])
  
  return (
    <span 
      className={`${styles["icon" + spriteSize]} ${className} inline-block`} 
      style={{ backgroundImage: `url(${url.href})`, ...style }}
      title={name}
      {...props}
    />
  )
}