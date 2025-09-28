import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function LoadingClassCard() {
    return (
        <Skeleton customHighlightBackground="linear-gradient(90deg, var(--base-color) 10%, var(--highlight-color) 50%, var(--base-color) 10%)" className="w-full h-16 rounded mt-4 mb-4">

        </Skeleton>
    )
}
