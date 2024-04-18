import { useMemo } from "react"
import styles from "./ItemIcon.module.css"
import { getBaseName } from "../../utilities/getBaseName"
import { useImage } from "./useImage"

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