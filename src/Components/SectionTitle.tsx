type Props={
    title: string
}

export function SectionTitle ({title}:Props){
    return (
        <div className="w-full flex justify-center items-center mt-6">
            <div className=" w-1/6 h-[3px] bg-palm-700 " ></div>
            <h1 className="font-display text-[1.75rem] text-palm-700 mx-3">{title}</h1>
            <div className=" w-1/6 h-[3px] bg-palm-700" ></div>
        </div>
    )
}