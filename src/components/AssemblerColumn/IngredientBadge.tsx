import ItemIcon from "../ItemIcon"

type Props = {
    ingredient: { name: string, amount: number }
    isSatisfied: boolean
}

export default function IngredientBadge({ ingredient, isSatisfied }: Props) {
    return (
        <div>
            <div className="bg-stone-900 p-1 ps-2 text-white rounded-t-lg flex items-center">
                {ingredient.amount}
                <ItemIcon key={ingredient.name} name={ingredient.name} className="ms-1" />
            </div>
            <div className={`h-2 rounded-b-lg ${isSatisfied ? "bg-green-900" : "bg-red-900"
                }`} />
        </div>
    )
}