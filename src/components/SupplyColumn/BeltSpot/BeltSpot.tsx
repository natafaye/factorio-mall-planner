import EmptyBeltSpot from "./EmptyBeltSpot"
import FullBeltSpot from "./FullBeltSpot"

type Props = {
    item?: string
    index: [number, number, number]
}

export default function BeltSpot({ item, index }: Props) {
  return (
    item ? (
        <FullBeltSpot item={item} index={index}/>
    ) : (
        <EmptyBeltSpot index={index}/>
    )
  )
}