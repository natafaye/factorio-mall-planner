import { useMemo, useRef } from "react"
import { useSelectSettings } from "../../redux"
import { getBaseName } from "../../shared"
import { useImage } from "./useImage"
import styles from "./ItemIcon.module.css"
import classNames from "classnames"

export default function ItemImage({
  name, style, className = "", size = "md", ...props
}: { name: string, size?: "sm" | "md" | "lg" } & React.HTMLAttributes<HTMLSpanElement>) {
  const settings = useSelectSettings()

  const previousSettings = useRef(settings)
  const imageName = useMemo(() => {
    const newName = getBaseName(name, settings, previousSettings.current !== settings)
    previousSettings.current = settings
    return newName
  }, [name, settings])

  const { width, height, path } = useImage({
    imageName: imageName,
    fallbackName: "none",
    folderPath: "/factorio-mall-planner/assets/icons/",
    defaultSize: { width: 120, height: 64 }
  })

  return (
    <span
      className={classNames(
        className,
        "inline-block",
        styles[size],
        styles[`icon${width}x${height}-${size}`],
      )}
      style={{ backgroundImage: `url(${path})`, ...style }}
      title={name}
      {...props}
    />
  )
}