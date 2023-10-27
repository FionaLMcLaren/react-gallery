import {Icon} from "@iconify/react";

export default function LoadingText({loadMsg}) {
    return (
            <div className="flex flex-col items-center gap-3 scale-150">
                <Icon icon="teenyicons:paintbrush-outline"
                      className="animate-rotate-y animate-infinite"/>
                <span className="font-display font-bold tracking-wider text-l text-stone-800">{loadMsg}</span>
            </div>
    )
}

