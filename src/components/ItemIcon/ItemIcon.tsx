import { useMemo } from "react"
import { getBaseName } from "../../shared"
import { useImage } from "./useImage"
import styles from "./ItemIcon.module.css"

export default function ItemImage({
  name, style, className = "", ...props
}: { name: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const imageName = useMemo(() => getBaseName(name), [name])
  const { width, height, path } = useImage({
    imageName: imageName,
    fallbackName: "none",
    folderPath: "/factorio-mall-planner/assets/icons/",
    defaultSize: { width: 120, height: 64 }
  })

  return (
    <span
      className={`${styles[`icon${width}x${height}`]} ${className} inline-block`}
      style={{ backgroundImage: `url(${path})`, ...style }}
      title={name}
      {...props}
    />
  )
}