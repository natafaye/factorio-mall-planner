import { ElementType, MouseEvent, ReactNode, useRef, useState } from "react";
import classNames from "classnames";
import { useSelectInGroup, useSelectGroups } from "../../redux";
import type { BaseEntity } from "../../shared/types";
import { Button } from "../UI";
import ItemIcon from "../ItemIcon";
import SearchPanel from "./SearchPanel";
import EntityButton from "./EntityButton";
import { useClickOutside } from "./useClickOutside";
import styles from "./EntitySelector.module.css"

type BaseProps<T> = {
    entityType: "recipe" | "item"
    selected?: string[]
    as?: T
}

type Props<T> = BaseProps<T> & {
    multi?: false
    onChange: (entityName: string) => void
}

type MultiProps<T> = BaseProps<T> & {
    multi: true
    onChange: (entityNames: string[]) => void
}

export default function EntitySelector<T extends ElementType<{ onClick: () => void, children: ReactNode }>>({
    entityType, onChange, children, multi, selected = [], as, ...props
}: Omit<React.ComponentPropsWithoutRef<T>, keyof (Props<T> | MultiProps<T>)> & (Props<T> | MultiProps<T>)) {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => setShowMenu(!showMenu)

    const groups = useSelectGroups(entityType)
    const [selectedGroup, setSelectedGroup] = useState<string>(groups[0])
    const entitiesInGroup = useSelectInGroup(entityType, selectedGroup)

    const Component = as || Button

    const divRef = useRef(null)
    useClickOutside(divRef, () => {
        setShowMenu(false)
    })

    const lastSelectedEntity = useRef<null | BaseEntity>(null)
    const handleEntityClick = (event: MouseEvent, entity: BaseEntity) => {
        if (multi && event.shiftKey && lastSelectedEntity.current?.group === selectedGroup) {
            // allow shift clicking to select multiple
            const lastIndex = entitiesInGroup.indexOf(lastSelectedEntity.current)
            const newIndex = entitiesInGroup.indexOf(entity)
            const startIndex = Math.min(lastIndex, newIndex)
            const endIndex = Math.max(lastIndex, newIndex)
            onChange(entitiesInGroup.slice(startIndex + 1, endIndex + 1).map(e => e.name))
        } else if (multi) {
            onChange([entity.name])
        } else {
            onChange(entity.name)
        }
        lastSelectedEntity.current = entity
        if (!multi) setShowMenu(false)
    }

    return (
        <div className="relative" ref={divRef}>
            <Component {...props} onClick={toggleMenu}>
                {children}
            </Component>
            {showMenu && (
                <div className="absolute bg-stone-700 shadow-xl -mt-2 
                    rounded-md z-10 w-[360px] max-h-[480px] flex flex-col overflow-auto">
                    <div className="flex flex-wrap">
                        {["search", ...groups].map(groupName => (
                            <button
                                key={groupName}
                                onClick={() => setSelectedGroup(groupName)}
                                className={classNames(
                                    "p-3 pb-2",
                                    selectedGroup === groupName ? "bg-[orange]" : "bg-stone-600"
                                )}
                            >
                                <ItemIcon className={styles.groupIcon} name={groupName} />
                            </button>
                        ))}

                    </div>
                    <div className="ps-4 pe-0 py-3 overflow-auto">
                        {selectedGroup === "search" ?
                            <SearchPanel
                                type={entityType}
                                emptyText={
                                    entityType === "item" ? "Search by item name" :
                                        'Search by recipe name, or use "i:" to search by ingredient'
                                }
                                renderResult={entity => (
                                    <EntityButton
                                        key={entity.name}
                                        entity={entity}
                                        selected={selected.includes(entity.name)}
                                        onClick={(event) => handleEntityClick(event, entity)}
                                    />
                                )}
                            />
                            : entitiesInGroup.map(entity => (
                                <EntityButton
                                    key={entity.name}
                                    entity={entity}
                                    selected={selected.includes(entity.name)}
                                    onClick={((event) => handleEntityClick(event, entity))}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}