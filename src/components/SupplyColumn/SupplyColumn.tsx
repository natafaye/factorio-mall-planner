import classNames from "classnames"
import { useSelectSupplyLineByIndex } from "../../redux"
import styles from "./SupplyColumn.module.css"
import BeltSpot from "./BeltSpot"
import { useTransition, animated, config } from "@react-spring/web"

export default function SupplyColumn({ index }: { index: number }) {
    const beltsInColumn = useSelectSupplyLineByIndex(index)

    const transitionedBelts = useTransition(beltsInColumn, {
        keys: (item) => item[2],
        from: { transform: 'translateX(-1.5rem) scaleX(0)', opacity: 0, width: '3.5rem' },
        enter: { transform: 'translateX(0) scaleX(1)', opacity: 1, width: '3.5rem' },
        leave: { transform: 'translateX(-1.5rem) scaleX(0.5)', opacity: 0, width: '0rem' },
        config: config.stiff
    })

    return (
        <div className="flex items-stretch">
            {transitionedBelts((style, belt, _, index2) => (
                <animated.div key={belt[2]} style={style} className="flex">
                    <div className={classNames(
                        "bg-[#3B3734] p-1 pt-8 flex flex-col gap-6 flex-grow w-12 ms-2",
                        styles.beltBackground
                    )}>
                        <BeltSpot item={belt[0]} index={[index, index2, 0]} />
                        <BeltSpot item={belt[1]} index={[index, index2, 1]} />
                    </div>
                </animated.div>
            ))}
        </div>
    )
}