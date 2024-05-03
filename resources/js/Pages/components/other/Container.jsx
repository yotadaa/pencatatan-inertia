


export default function Container({ children, filter = 'blur(50px)' }) {
    return (
        <div className="relative border border-gray-400 shadow-md rounded-md"
        >
            <div
                className="bg-white w-full h-full absolute rounded-md"
                style={{
                    zIndex: -2,
                    filter: 'opacity(70%) blur(200px)',
                }}
            ></div>
            <div
                className="bg-white w-full h-full absolute rounded-md opacity-30"
                style={{
                    zIndex: -1,
                }}
            ></div>
            <div className="">
                {children}
            </div>
        </div>
    )
}
