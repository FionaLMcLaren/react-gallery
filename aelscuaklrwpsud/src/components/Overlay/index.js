export default function Overlay({content}) {
    return (
        <div className="fixed top-0 left-0 z-40 h-full w-full scale-125
        flex items-center justify-center
        bg-stone-100">
            {content}
        </div>
    )
}

